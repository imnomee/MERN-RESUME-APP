import { Company } from '../models/company.model.js';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: 'CompanyRegister: name is required',
                success: false,
            });
        }
        let company = await Company.findOne({ companyName });
        if (company) {
            return res.status(400).json({
                message: 'CompanyRegister: company already registered',
                success: false,
            });
        }
        company = await Company.create({
            companyName,
            userId: req.id,
        });
        return res.status(201).json({
            message: 'Company registered successfully',
            success: true,
            company,
        });
    } catch (error) {
        console.log('CompanyRegister', error);
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({
                message: 'GetCompany: not found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Companies found',
            companies,
            success: true,
        });
    } catch (error) {
        console.log('GetCompany', error);
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: 'GetCompanyById: not found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Company found',
            company,
            success: true,
        });
    } catch (error) {
        console.log('GetCompanyById', error);
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { companyName, companyDescription, companyLocation } = req.body;

        const file = req.file; //using cloudinary

        const updateData = {
            companyName,
            companyDescription,
            companyLocation,
        };
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!company) {
            return res.status(404).json({
                message: 'UpdateCompany: not found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Compnay Info Updated',
            company,
            success: true,
        });
    } catch (error) {
        console.log('UpdateCompany', error);
    }
};
