import express from 'express';
import {
    getCompany,
    registerCompany,
    getCompanyById,
    updateCompany,
} from '../controllers/company.controller.js';

import isAuthenticated from '../middlewares/isAuthenticated.middle.js'; // Import middleware for authentication

const router = express.Router();

router.route('/register').post(isAuthenticated, registerCompany);
router.route('/update/:id').put(isAuthenticated, updateCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);

export default router;
