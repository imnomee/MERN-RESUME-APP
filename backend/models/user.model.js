import mongoose from 'mongoose';

// Define a schema for the 'User' collection
const userSchema = new mongoose.Schema(
    {
        // The first name of the user
        firstName: {
            required: true, // Mark as required field
            type: String, // Data type is string
        },
        // The last name of the user
        lastName: {
            required: true, // Mark as required field
            type: String, // Data type is string
        },
        // The email address of the user
        email: {
            type: String, // Data type is string
            required: true, // Mark as required field
            unique: true, // Ensure email is unique in the database
        },
        // Phone number of the user (optional)
        phoneNumber: {
            type: Number, // Data type is number
            required: false, // This field is not required
            default: null,
        },
        // The user's hashed password
        password: {
            type: String, // Store password as a string (hashed, not plain text)
            required: true, // Mark as required field
        },
        // The role of the user, which can either be 'seeker' or 'recruiter'
        role: {
            type: String, // Data type is string
            enum: ['seeker', 'recruiter'], // Limit possible values to 'seeker' or 'recruiter'
            required: true, // Mark as required field
        },
        // Nested object for additional user profile data
        profile: {
            // User's bio
            bio: { type: String }, // Bio is a string (optional)
            // List of user's skills
            skills: [{ type: String }], // Array of strings representing skills
            // Path or URL to the user's resume file
            resume: { type: String }, // Resume is a string (optional)
            // Original user name of the uploaded resume
            resumeOriginalName: { type: String }, // Optional field for storing user's original name
            // Reference to a company (for recruiters)
            company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to 'Company' collection
            // URL or path to the profile photo
            profilePhoto: {
                type: String, // Profile photo is a string (path or URL)
                default: null,
            },
        },
    },
    {
        // Add createdAt and updatedAt timestamps automatically
        timestamps: true,
    }
);

// Export the User model
export const User = mongoose.model('User', userSchema);
