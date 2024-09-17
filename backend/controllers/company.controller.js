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
            success: false,
        });
    } catch (error) {
        console.log('GetCompany', error);
    }
};
