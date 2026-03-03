import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validationResult } from 'express-validator';

// Generate Access Token (short-lived)
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m' // 15 minutes
  });
};

// Generate Refresh Token (long-lived)
const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

// Save refresh token to database
const saveRefreshToken = async (userId, token, req) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await RefreshToken.create({
    token,
    userId,
    expiresAt,
    createdByIp: req.ip,
    userAgent: req.headers['user-agent']
  });
};

// Send tokens
const sendTokenResponse = async (user, statusCode, res, message, req) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken();

  // Save refresh token to DB
  await saveRefreshToken(user._id, refreshToken, req);

  // Access token in HTTP-only cookie (short expiration)
  res.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });

  // Refresh token in HTTP-only cookie (long expiration)
  res.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/api/auth' // Only sent to auth endpoints
  });

  res.status(statusCode).json({
    success: true,
    message,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
    }
  });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found'
      });
    }

    // Find refresh token in database
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      isRevoked: false
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Check if expired
    if (new Date() > storedToken.expiresAt) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired'
      });
    }

    // Generate new access token
    const user = await User.findById(storedToken.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const accessToken = generateAccessToken(user._id);

    // Send new access token
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Logout and revoke refresh token
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // Revoke refresh token
    if (refreshToken) {
      await RefreshToken.updateOne(
        { token: refreshToken },
        { isRevoked: true, revokedAt: new Date() }
      );
    }

    // Clear cookies
    res.cookie('accessToken', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.cookie('refreshToken', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update login and register to use new token system
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    await sendTokenResponse(user, 200, res, 'Login successful', req);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    const user = await User.create({ name, email, password });
    await sendTokenResponse(user, 201, res, 'User registered successfully', req);
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto
      }
    });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, profilePhoto } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto
      }
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};