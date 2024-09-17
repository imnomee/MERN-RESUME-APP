import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, role } =
            req.body;
        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: 'Register: all fields required',
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'Register: User already exist with this email',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });
        return res.status(201).json({
            message: 'Account created',
            success: true,
        });
    } catch (error) {
        console.log('UserRegister', error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Login: all fields required',
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'Login: no user found',
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({
                message: 'Login: incorrect email or password',
                success: false,
            });
        }
        //check role
        if (role !== user.role) {
            return res.status(404).json({
                message: 'Login: role not matched',
                success: false,
            });
        }

        const tokenData = {
            userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.JWT_KEY, {
            expiresIn: '1d',
        });

        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        return res
            .status(200)
            .cookie('token', {
                maxAge: 1 * 24 * 60 * 60,
                httpOnly: true,
                sameSite: 'strict',
            })
            .json({
                message: `Welcome back ${user.firstName} `,
                user,
                success: true,
            });
    } catch (error) {
        console.log('UserLogin:', error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({
            message: 'Logout Successful',
            success: true,
        });
    } catch (error) {
        console.log('UserLogout', error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, bio, skills } = req.body;

        //cloudinary will be used for file
        const file = req.file;

        if (
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !email ||
            !bio ||
            !skills
        ) {
            return res.status(400).json({
                message: 'UserUpdate: some fields are missing',
                success: false,
            });
        }

        const skillsArray = skills.split(',');
        const userId = req.id; //will come from middlware auth
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: 'UserUpdate: user not found',
                success: false,
            });
        }

        //data to be updated
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.email = email;
        user.bio = bio;
        user.skill = skillsArray;

        //resume is not added yet
        await user.save();

        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
        return res.status(200).json({
            message: 'UserUpdate: profile updated',
            success: true,
            user,
        });
    } catch (error) {
        console.log('UserUpdate', error);
    }
};
