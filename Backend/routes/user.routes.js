import express from 'express';
import { login, logout, register, updatePhoto, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/signup').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/update').post(isAuthenticated,singleUpload,updateProfile);
router.route('/updatePhoto').post(isAuthenticated,singleUpload,updatePhoto);

export default router;


