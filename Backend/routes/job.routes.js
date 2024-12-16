import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createJob, deletePostedJob, getAllJob, getJobById, getRecruiterJobPost } from '../controllers/job.controller.js';

const router = express.Router();

router.route('/create-job').post(isAuthenticated,createJob);
router.route('/get-job').get(isAuthenticated,getAllJob);
router.route('/get-recruiter-job').get(isAuthenticated,getRecruiterJobPost);
router.route('/get/:id').get(isAuthenticated,getJobById);
router.route('/delete/:id').delete(isAuthenticated,deletePostedJob);

export default router;