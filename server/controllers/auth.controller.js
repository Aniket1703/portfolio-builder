import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validationResult } from 'express-validator';

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m'
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

  await saveRefreshToken(user._id, refreshToken, req);

  res.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 15 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });

  res.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/api/auth'
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

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found'
      });
    }

    // Find token in DB regardless of revocation status
    // (we need to check reuse even on revoked tokens)
    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // If token is already revoked, someone is reusing an old token — possible theft
    if (storedToken.isRevoked) {
      // Revoke ALL tokens for this user to force re-login
      await RefreshToken.updateMany(
        { userId: storedToken.userId },
        { isRevoked: true, revokedAt: new Date() }
      );

      res.cookie('accessToken', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
      res.cookie('refreshToken', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });

      return res.status(401).json({
        success: false,
        message: 'Token reuse detected. Please login again.',
        code: 'TOKEN_REUSE'
      });
    }

    if (new Date() > storedToken.expiresAt) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired'
      });
    }

    const user = await User.findById(storedToken.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate brand new refresh token
    const newRefreshToken = generateRefreshToken();

    // Revoke the OLD refresh token, record what replaced it
    await RefreshToken.updateOne(
      { token: refreshToken },
      {
        isRevoked: true,
        revokedAt: new Date(),
        replacedByToken: newRefreshToken  // uses the field already in your schema
      }
    );

    // Save the new refresh token
    await saveRefreshToken(user._id, newRefreshToken, req);

    // Issue new access token
    const accessToken = generateAccessToken(user._id);

    // Set both new cookies
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });

    res.cookie('refreshToken', newRefreshToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/api/auth'
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

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await RefreshToken.updateOne(
        { token: refreshToken },
        { isRevoked: true, revokedAt: new Date() }
      );
    }

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

export const updateProfile = async (req, res) => {
  try {
    const { name, profilePhoto } = req.body;

    if (profilePhoto) {
      try {
        const url = new URL(profilePhoto);
        if (!['http:', 'https:'].includes(url.protocol)) {
          return res.status(400).json({
            success: false,
            message: 'Profile photo must be a valid http or https URL'
          });
        }
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Invalid profile photo URL'
        });
      }
    }

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