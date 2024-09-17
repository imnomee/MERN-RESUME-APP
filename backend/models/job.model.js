import mongoose from 'mongoose'; // Import Mongoose for MongoDB interaction

// Define the Job schema
const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, // Title of the job, required field
        },
        description: {
            type: String,
            required: true, // Description of the job, required field
        },
        requirement: {
            type: [{ type: String }], // List of job requirements as an array of strings
            required: true, // Required field
        },
        salary: {
            type: Number,
            required: true, // Salary offered for the job, required field
        },
        location: {
            type: String,
            required: true, // Job location, required field
        },
        jobType: {
            type: String,
            required: true, // Type of job (e.g., full-time, part-time), required field
        },
        position: {
            type: Number,
            required: true, // Number of positions available for this job, required field
        },
        company: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Company model
            ref: 'Company', // Specifies the 'Company' model for the ObjectId reference
            required: true, // The job must be associated with a company, required field
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model (the creator of the job posting)
            ref: 'User', // Specifies the 'User' model for the ObjectId reference
            required: true, // Required field, ensures the job has a creator
        },
        applications: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Application model
            ref: 'Application', // Specifies the 'Application' model for the ObjectId reference
            // Optional field: this stores applications linked to the job (can be added dynamically)
        },
    },
    { timestamps: true } // Automatically manage `createdAt` and `updatedAt` fields
);

// Export the Job model based on the jobSchema
export const Job = mongoose.model('Job', jobSchema);
