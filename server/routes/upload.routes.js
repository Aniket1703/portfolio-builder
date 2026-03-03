import express from 'express';
import { uploadImage, deleteImage } from '../controllers/upload.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Protected routes
router.post('/image', protect, upload.single('image'), uploadImage);
router.delete('/image', protect, deleteImage);

export default router;