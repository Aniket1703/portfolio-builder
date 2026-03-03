import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getMe, 
  updateProfile,
  refreshAccessToken 
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshAccessToken);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;