import mongoose from 'mongoose'; // Import Mongoose for MongoDB interaction

// Define the Company schema
const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String, // Company name
            required: true, // Name is a required field
            unique: true,
        },
        companyDescription: {
            type: String, // Brief description of the company
            // Optional field, so no `required` flag
        },
        companyLocation: {
            type: String, // Company location
            // Optional field, can be added or left blank
        },
        companyLogo: {
            type: String, // URL or path for the company logo
            default: '', // Default value set to an empty string if no logo is provided
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model
            ref: 'User', // Specifies the 'User' model for the ObjectId reference
            required: true, // Required field, ensures that the company is associated with a user
        },
    },
    { timestamps: true } // Automatically manages `createdAt` and `updatedAt` fields
);

// Export the Company model based on the companySchema
export const Company = mongoose.model('Company', companySchema);
