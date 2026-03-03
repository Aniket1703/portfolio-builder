import { body } from 'express-validator';

export const validatePortfolioCreate = [
  body('slug')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Slug must be between 3 and 50 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
];

export const validatePortfolioUpdate = [
  body('personalInfo.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('personalInfo.title')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Title must not exceed 150 characters'),
  
  body('contact.email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
];

export const validateSlug = [
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Slug must be between 3 and 50 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
];