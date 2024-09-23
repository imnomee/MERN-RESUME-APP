import { Job } from '../models/job.model.js';

export const postJob = async (req, res) => {
    try {
        const {
            jobTitle,
            jobDescription,
            jobReq,
            jobSalary,
            jobLocation,
            jobType,
            jobExp,
            jobPosition,
            companyId,
        } = req.body;

        const userId = req.id;
        if (
            !jobTitle ||
            !jobDescription ||
            !jobReq ||
            !jobSalary ||
            !jobLocation ||
            !jobType ||
            !jobExp ||
            !jobPosition ||
            !companyId
        ) {
            return res.status(400).json({
                message: 'PostJob: All fields required',
                success: false,
            });
        }
        const job = await Job.create({
            jobTitle,
            jobDescription,
            jobReq,
            jobSalary: Number(jobSalary),
            jobLocation,
            jobType,
            jobExp,
            jobPosition,
            companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: 'PostJob: new Job created.',
            success: true,
            job,
        });
    } catch (error) {
        console.log('PostJob', error);
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { jobTitle: { $regex: keyword, $options: 'i' } },
                {
                    jobDescription: { $regex: keyword, $options: 'i' },
                },
            ],
        };
        const jobs = await Job.find(query);
        if (!jobs) {
            return res.status(404).json({
                message: 'GetAllJobs: jobs not found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'GetAllJobs',
            success: true,
            jobs,
        });
    } catch (error) {
        console.log('GetAllJobs', error);
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: 'GetJobById: job not found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'GetJobById',
            success: false,
            job,
        });
    } catch (error) {
        console.log('GetJobById', error);
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const userId = req.id;
        const jobs = await Job.find({ created_by: userId });
    } catch (error) {
        console.log('GetAdminJobs', error);
    }
};
