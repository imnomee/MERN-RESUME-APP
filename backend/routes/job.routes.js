import express from 'express';
import { postJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.middle.js';

const router = express.Router();

router.route('/create').post(isAuthenticated, postJob);

export default router;
