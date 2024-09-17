import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs'; // Used for hashing passwords
import jwt from 'jsonwebtoken'; // Used for generating JWT tokens

// Registration function to create a new user
export const register = async (req, res) => {
    try {
        // Destructure required fields from request body
        const { firstName, lastName, email, phoneNumber, password, role } =
            req.body;

        // Check if required fields are present
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                message: 'Register: all fields required', // Inform the client if any required field is missing
                success: false,
            });
        }

        // Check if a user with the provided email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'Register: User already exists with this email', // Prevent duplicate registrations
                success: false,
            });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10 for hashing
        await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword, // Store the hashed password
            role,
        });

        // Respond with success message if the account is created successfully
        return res.status(201).json({
            message: 'Account created',
            success: true,
        });
    } catch (error) {
        console.log('UserRegister', error); // Log error for debugging purposes
    }
};

// Login function to authenticate user and issue a JWT token
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body; // Destructure login fields

        // Validate if all required fields are provided
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Login: all fields required',
                success: false,
            });
        }

        // Check if a user with the provided email exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'Login: no user found', // If no user exists, return 404 error
                success: false,
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({
                message: 'Login: incorrect email or password', // Inform if password does not match
                success: false,
            });
        }

        // Ensure the role matches the one stored for the user
        if (role !== user.role) {
            return res.status(404).json({
                message: 'Login: role not matched', // Role mismatch scenario
                success: false,
            });
        }

        // Generate a JWT token with userId payload
        const tokenData = {
            userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.JWT_KEY, {
            expiresIn: '1d', // Token expiration set to 1 day
        });

        // Prepare the user object for response (excluding sensitive info like password)
        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        // Set the JWT token as an HTTP-only cookie
        return res
            .status(200)
            .cookie('token', token, {
                // Ensure token is set correctly in the cookie
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
                httpOnly: true, // Securely set the token as HTTP-only
                sameSite: 'strict', // SameSite policy for added security
            })
            .json({
                message: `Welcome back ${user.firstName}`, // Friendly welcome message
                user,
                success: true,
            });
    } catch (error) {
        console.log('UserLogin:', error); // Log error for debugging
    }
};

// Logout function to clear the JWT token cookie
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie('token', '', { maxAge: 0 }) // Clear the cookie by setting maxAge to 0
            .json({
                message: 'Logout Successful', // Inform the client about successful logout
                success: true,
            });
    } catch (error) {
        console.log('UserLogout', error); // Log any error for debugging
    }
};

// Update profile function to modify user information
export const updateProfile = async (req, res) => {
    try {
        // Destructure fields from the request body
        const { firstName, lastName, phoneNumber, profile, email } = req.body;

        // File upload (handled by a service like Cloudinary)
        const file = req.file;

        // Check if required fields are provided
        if (
            !firstName ||
            !lastName ||
            !email ||
            !profile.bio ||
            !profile.skills
        ) {
            return res.status(400).json({
                message: 'UserUpdate: some fields are missing',
                success: false,
            });
        }
        console.log(profile.skills.join(''));
        // Split skills string into an array

        const userId = req.id; // Retrieve user ID from authentication middleware

        // Find user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: 'UserUpdate: user not found', // Inform if user is not found
                success: false,
            });
        }

        // Update user data
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (email) user.email = email;
        if (profile.bio) user.profile.bio = profile.bio;
        if (profile.skills) user.profile.skills = profile.skills;

        // Save the updated user data
        await user.save();

        // Prepare the updated user object for response
        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        // Respond with success message
        return res.status(200).json({
            message: 'UserUpdate: profile updated',
            success: true,
            user,
        });
    } catch (error) {
        console.log('UserUpdate', error); // Log error for debugging
    }
};
