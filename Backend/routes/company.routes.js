import express from 'express';
import { deleteCompany, getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(isAuthenticated,registerCompany);
router.route('/update/:id').put(isAuthenticated,singleUpload,updateCompany);
router.route('/getCompany').get(isAuthenticated,getCompany);
router.route('/get/:id').get(isAuthenticated,getCompanyById);
router.route('/delete/:id').post(isAuthenticated,deleteCompany);

export default router;