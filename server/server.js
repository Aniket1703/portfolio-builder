import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';
import morgan from 'morgan';

// Routes
import authRoutes from './routes/auth.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import uploadRoutes from './routes/upload.routes.js';

// Middleware
import { 
  loginLimiter, 
  generalLimiter, 
  apiLimiter,
  securityHeaders, 
  sanitizeData, 
  preventParamPollution 
} from './middlewares/security.middleware.js';
import { csrfProtection, csrfErrorHandler } from './middlewares/csrf.middleware.js';

// Utils
import logger from './utils/logger.js';
import { validateEnv } from './config/validateEnv.js';

// Load environment variables
dotenv.config();

// Validate environment variables
validateEnv();

const app = express();

// ===========================================
// SECURITY MIDDLEWARE (Apply First)
// ===========================================

// 1. Security Headers (MUST be first)
app.use(securityHeaders);

// 2. HTTP Request Logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// 3. CORS Configuration (Before body parsing)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));

// 4. Cookie Parser (MUST be before CSRF)
app.use(cookieParser());

// 5. Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 6. Data Sanitization (After body parsing)
app.use(sanitizeData); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(preventParamPollution); // Prevent HTTP parameter pollution

// ===========================================
// RATE LIMITING
// ===========================================

// Global API rate limiter
app.use('/api', apiLimiter);

// ===========================================
// CSRF PROTECTION ENDPOINT
// ===========================================

// Endpoint to get CSRF token (BEFORE routes that need it)
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ 
    success: true,
    csrfToken: req.csrfToken() 
  });
});

// ===========================================
// DATABASE CONNECTION
// ===========================================

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('MongoDB Connected');
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    logger.error('MongoDB Connection Error:', err);
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// ===========================================
// ROUTES WITH SPECIFIC PROTECTIONS
// ===========================================

// Auth Routes (with rate limiting and CSRF)
app.use('/api/auth/login', loginLimiter, csrfProtection);
app.use('/api/auth/register', loginLimiter, csrfProtection);
app.use('/api/auth/logout', csrfProtection);
app.use('/api/auth', authRoutes);

// Portfolio Routes (with CSRF protection for mutations)
app.use('/api/portfolio', (req, res, next) => {
  // Only apply CSRF to POST, PUT, PATCH, DELETE
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    return csrfProtection(req, res, next);
  }
  next();
}, portfolioRoutes);

// Upload Routes (with CSRF protection)
app.use('/api/upload', csrfProtection, uploadRoutes);

// ===========================================
// HEALTH CHECK
// ===========================================

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ===========================================
// ERROR HANDLERS
// ===========================================

// CSRF Error Handler (MUST be before general error handler)
app.use(csrfErrorHandler);

// 404 Handler - Route not found
app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(isDevelopment && { 
      stack: err.stack,
      error: err 
    })
  });
});

// ===========================================
// SERVER START
// ===========================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(` Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(` Server running on port ${PORT}`);
  console.log(` CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION!  Shutting down...', err);
  console.error('UNHANDLED REJECTION! ', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  console.error('UNCAUGHT EXCEPTION! ', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info(' SIGTERM RECEIVED. Shutting down gracefully');
  console.log(' SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info(' Process terminated!');
    console.log(' Process terminated!');
  });
});

export default app;