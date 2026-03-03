import Portfolio from '../models/Portfolio.js';
import { validationResult } from 'express-validator';
import slugify from 'slugify';

// @desc    Create portfolio
// @route   POST /api/portfolio
// @access  Private
export const createPortfolio = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Check if user already has a portfolio
    const existingPortfolio = await Portfolio.findOne({ userId: req.user._id });
    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: 'You already have a portfolio. Please update it instead.'
      });
    }

    const { slug, personalInfo } = req.body;

    // Generate slug if not provided
    let portfolioSlug = slug;
    if (!portfolioSlug) {
      portfolioSlug = slugify(req.user.name, { lower: true, strict: true });
    } else {
      portfolioSlug = slugify(portfolioSlug, { lower: true, strict: true });
    }

    // Check if slug is already taken
    const slugExists = await Portfolio.findOne({ slug: portfolioSlug });
    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: 'This slug is already taken. Please choose another one.'
      });
    }

    // Create portfolio
    const portfolio = await Portfolio.create({
      userId: req.user._id,
      slug: portfolioSlug,
      personalInfo: personalInfo || {
        name: req.user.name,
        title: '',
        bio: '',
        profilePhoto: req.user.profilePhoto || ''
      }
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio created successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Create Portfolio Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my portfolio
// @route   GET /api/portfolio/my-portfolio
// @access  Private
export const getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found. Please create one first.'
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Get My Portfolio Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get portfolio by slug (Public View)
// @route   GET /api/portfolio/slug/:slug
// @access  Public
export const getPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOne({ slug }).populate('userId', 'name email');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Only show published portfolios to public
    if (!portfolio.isPublished) {
      return res.status(403).json({
        success: false,
        message: 'This portfolio is not published yet'
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Get Portfolio By Slug Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update entire portfolio
// @route   PUT /api/portfolio
// @access  Private
export const updatePortfolio = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const portfolio = await Portfolio.findOne({ userId: req.user._id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Update allowed fields
    const allowedUpdates = [
      'personalInfo',
      'contact',
      'skills',
      'experience',
      'education',
      'projects',
      'theme'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        portfolio[field] = req.body[field];
      }
    });

    await portfolio.save();

    res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Update Portfolio Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update specific section
// @route   PATCH /api/portfolio/section/:sectionName
// @access  Private
export const updateSection = async (req, res) => {
  try {
    const { sectionName } = req.params;
    const sectionData = req.body;

    const portfolio = await Portfolio.findOne({ userId: req.user._id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Valid sections that can be updated
    const validSections = ['personalInfo', 'contact', 'skills', 'experience', 'education', 'projects', 'theme'];

    if (!validSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid section name'
      });
    }

    portfolio[sectionName] = sectionData;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: `${sectionName} section updated successfully`,
      data: portfolio[sectionName]
    });
  } catch (error) {
    console.error('Update Section Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolio
// @access  Private
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ userId: req.user._id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    console.error('Delete Portfolio Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Check slug availability
// @route   GET /api/portfolio/check-slug/:slug
// @access  Public
export const checkSlugAvailability = async (req, res) => {
  try {
    const { slug } = req.params;

    const slugExists = await Portfolio.findOne({ 
      slug: slugify(slug, { lower: true, strict: true }) 
    });

    res.status(200).json({
      success: true,
      available: !slugExists,
      message: slugExists ? 'Slug is already taken' : 'Slug is available'
    });
  } catch (error) {
    console.error('Check Slug Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Publish/Unpublish portfolio
// @route   PATCH /api/portfolio/publish
// @access  Private
export const publishPortfolio = async (req, res) => {
  try {
    const { isPublished } = req.body;

    const portfolio = await Portfolio.findOne({ userId: req.user._id });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    portfolio.isPublished = isPublished;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: `Portfolio ${isPublished ? 'published' : 'unpublished'} successfully`,
      data: {
        isPublished: portfolio.isPublished,
        portfolioUrl: `${process.env.CLIENT_URL}/portfolio/${portfolio.slug}`
      }
    });
  } catch (error) {
    console.error('Publish Portfolio Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Increment portfolio views
// @route   POST /api/portfolio/slug/:slug/view
// @access  Public
export const incrementViews = async (req, res) => {
  try {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOneAndUpdate(
      { slug, isPublished: true },
      {
        $inc: { 'analytics.views': 1 },
        $set: { 'analytics.lastViewed': new Date() }
      },
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        views: portfolio.analytics.views
      }
    });
  } catch (error) {
    console.error('Increment Views Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};