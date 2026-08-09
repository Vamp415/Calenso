const jwt = require('jsonwebtoken');
const { db } = require('../src/lib/prisma');
const logger = require('../src/lib/logger');

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    // Get token from httpOnly cookie
    const token = req.cookies.token;

    if (!token) {
      logger.warn('Authentication failed: No token provided', { url: req.url, method: req.method });
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.debug('Token verified successfully', { userId: decoded.userId });

    // Get user from database
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        imageUrl: true,
        isVerified: true,
      },
    });

    if (!user) {
      logger.warn('Authentication failed: User not found', { userId: decoded.userId });
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }

    // Attach user to request
    req.user = user;
    logger.debug('User authenticated successfully', { userId: user.id, email: user.email, url: req.url });
    next();
  } catch (error) {
    logger.error('Authentication error', { error: error.message, name: error.name, url: req.url, method: req.method });
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token expired' });
    }
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      logger.debug('Optional auth: No token provided, proceeding without user', { url: req.url });
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        imageUrl: true,
        isVerified: true,
      },
    });

    req.user = user || null;
    logger.debug('Optional auth: User authenticated', { userId: user?.id, url: req.url });
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    logger.debug('Optional auth: Invalid token, proceeding without user', { error: error.message, url: req.url });
    req.user = null;
    next();
  }
};

module.exports = { authenticate, optionalAuth };
