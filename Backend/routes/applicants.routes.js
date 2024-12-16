import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { applyJob, getApplicants, getAppliedJobs, getNotAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply-job/:id').get(isAuthenticated,applyJob);
router.route('/getAppliedJobs').get(isAuthenticated,getAppliedJobs);
router.route('/getNotAppliedJobs').get(isAuthenticated,getNotAppliedJobs);
router.route('/:id/get-applicants').get(isAuthenticated,getApplicants);
router.route('/update-status/:id/update').post(isAuthenticated,updateStatus);

export default router;