require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const logger = require('./lib/logger');

// Import routes
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');
const availabilityRoutes = require('./routes/availability');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Compression for faster responses
app.use(compression());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Body parser with limit for performance
app.use(express.json({ limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// HTTP request logging with Morgan
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.http(message.trim())
  }
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Calenso API is running' });
});

// Routes
logger.info('Registering API routes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, '../../frontend/dist');
  logger.info('Serving static files from', { path: frontendDistPath });
  
  app.use(express.static(frontendDistPath));
  
  // SPA fallback - return index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack, url: req.url, method: req.method });
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn('Route not found', { url: req.url, method: req.method });
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  logger.info(`🚀 Calenso API server running on port ${PORT}`);
  logger.info(`📍 Health check: http://localhost:${PORT}/api/health`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
