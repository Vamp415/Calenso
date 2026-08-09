const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');
const { authenticate } = require('../../middleware/auth');
const logger = require('../lib/logger');

// Get dashboard updates (upcoming meetings)
router.get('/updates', authenticate, async (req, res) => {
  try {
    logger.debug('Get dashboard updates attempt', { userId: req.user.id });
    const now = new Date();

    const meetings = await db.booking.findMany({
      where: {
        userId: req.user.id,
        startTime: { gte: now },
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { startTime: 'asc' },
      take: 5,
    });

    logger.debug('Dashboard updates retrieved successfully', { userId: req.user.id, count: meetings.length });
    res.json(meetings);
  } catch (error) {
    logger.error('Error getting dashboard updates', { error: error.message, userId: req.user?.id });
    res.status(500).json({ error: error.message });
  }
});

// Get meetings (upcoming or past)
router.get('/meetings', authenticate, async (req, res) => {
  try {
    const { type } = req.query;
    logger.debug('Get meetings attempt', { userId: req.user.id, type });
    const now = new Date();

    const meetings = await db.booking.findMany({
      where: {
        userId: req.user.id,
        startTime: type === 'upcoming' ? { gte: now } : { lt: now },
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            duration: true,
          },
        },
      },
      orderBy: { startTime: type === 'upcoming' ? 'asc' : 'desc' },
    });

    logger.debug('Meetings retrieved successfully', { userId: req.user.id, type, count: meetings.length });
    res.json(meetings);
  } catch (error) {
    logger.error('Error getting meetings', { error: error.message, userId: req.user?.id, type: req.query?.type });
    res.status(500).json({ error: error.message });
  }
});

// Get analytics
router.get('/analytics', authenticate, async (req, res) => {
  try {
    logger.debug('Get analytics attempt', { userId: req.user.id });
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalEvents, totalBookings, upcomingMeetings, recentBookings] = await Promise.all([
      db.event.count({ where: { userId: req.user.id } }),
      db.booking.count({ where: { userId: req.user.id } }),
      db.booking.count({ 
        where: { 
          userId: req.user.id, 
          startTime: { gte: now } 
        } 
      }),
      db.booking.count({ 
        where: { 
          userId: req.user.id, 
          createdAt: { gte: thirtyDaysAgo } 
        } 
      }),
    ]);

    logger.debug('Analytics retrieved successfully', { userId: req.user.id, totalEvents, totalBookings, upcomingMeetings, recentBookings });
    res.json({
      totalEvents,
      totalBookings,
      upcomingMeetings,
      recentBookings,
    });
  } catch (error) {
    logger.error('Error getting analytics', { error: error.message, userId: req.user?.id });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
