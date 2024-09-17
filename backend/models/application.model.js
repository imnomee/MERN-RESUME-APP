import mongoose from 'mongoose'; // Import Mongoose for MongoDB interaction

// Define the Application schema
const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Job model
            ref: 'Job', // Specifies the 'Job' model for the ObjectId reference
            required: true, // The application must be linked to a specific job
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model
            ref: 'User', // Specifies the 'User' model for the ObjectId reference
            required: true, // The application must be linked to a specific user (applicant)
        },
        status: {
            type: String, // Status of the application (e.g., pending, accepted, rejected)
            enum: ['pending', 'accepted', 'rejected'], // Restrict values to these three states
            default: 'pending', // Default status is 'pending' when the application is created
        },
    },
    { timestamps: true } // Automatically manage `createdAt` and `updatedAt` fields
);

// Export the Application model based on the applicationSchema
export const Application = mongoose.model('Application', applicationSchema);
