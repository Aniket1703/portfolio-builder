import express from 'express';
import {
  createPortfolio,
  getMyPortfolio,
  getPortfolioBySlug,
  updatePortfolio,
  deletePortfolio,
  checkSlugAvailability,
  publishPortfolio,
  updateSection,
  incrementViews
} from '../controllers/portfolio.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import {
  validatePortfolioCreate,
  validatePortfolioUpdate,
  validateSlug
} from '../validators/portfolio.validator.js';

const router = express.Router();

// Public routes
router.get('/slug/:slug', getPortfolioBySlug);
router.post('/slug/:slug/view', incrementViews);
router.get('/check-slug/:slug', checkSlugAvailability);

// Protected routes
router.post('/', protect, validatePortfolioCreate, createPortfolio);
router.get('/my-portfolio', protect, getMyPortfolio);
router.put('/', protect, validatePortfolioUpdate, updatePortfolio);
router.delete('/', protect, deletePortfolio);
router.patch('/publish', protect, publishPortfolio);
router.patch('/section/:sectionName', protect, updateSection);

export default router;