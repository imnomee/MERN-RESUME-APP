import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            required: true,
            type: String,
        },
        lastName: {
            required: true,
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['seeker', 'recruiter'],
            required: true,
        },
        profile: {
            bio: { type: String },
            skills: [{ type: String }],
            resume: { type: String },
            resumeOriginalName: { type: String },
            company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
            profilePhoto: {
                type: String,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);
