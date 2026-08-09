const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');
const { z } = require('zod');
const { authenticate } = require('../../middleware/auth');
const logger = require('../lib/logger');

// Event validation schema
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  duration: z.number().int().min(15).max(480),
  isPrivate: z.boolean().default(true),
});

// Create event
router.post('/', authenticate, async (req, res) => {
  try {
    const validatedData = eventSchema.parse(req.body);
    logger.info('Create event attempt', { userId: req.user.id, title: validatedData.title });

    const event = await db.event.create({
      data: {
        ...validatedData,
        userId: req.user.id,
      },
    });

    logger.info('Event created successfully', { eventId: event.id, userId: req.user.id, title: event.title });
    res.status(201).json(event);
  } catch (error) {
    logger.error('Error creating event', { error: error.message, userId: req.user?.id });
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get user's events
router.get('/', authenticate, async (req, res) => {
  try {
    logger.debug('Get user events attempt', { userId: req.user.id });
    const events = await db.event.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    logger.debug('User events retrieved successfully', { userId: req.user.id, count: events.length });
    res.json({ events, username: req.user.username });
  } catch (error) {
    logger.error('Error getting events', { error: error.message, userId: req.user?.id });
    res.status(500).json({ error: error.message });
  }
});

// Get event details
router.get('/:username/:eventId', async (req, res) => {
  try {
    const { username, eventId } = req.params;
    logger.debug('Get event details attempt', { username, eventId });
    
    const event = await db.event.findFirst({
      where: {
        id: eventId,
        user: { username },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!event) {
      logger.warn('Event not found', { username, eventId });
      return res.status(404).json({ error: 'Event not found' });
    }

    logger.debug('Event details retrieved successfully', { eventId, username });
    res.json(event);
  } catch (error) {
    logger.error('Error getting event details', { error: error.message, eventId: req.params?.eventId });
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete('/:eventId', authenticate, async (req, res) => {
  try {
    const { eventId } = req.params;
    logger.info('Delete event attempt', { eventId, userId: req.user.id });

    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.userId !== req.user.id) {
      logger.warn('Unauthorized event deletion attempt', { eventId, userId: req.user.id, eventOwnerId: event.userId });
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await db.event.delete({
      where: { id: eventId },
    });

    logger.info('Event deleted successfully', { eventId, userId: req.user.id });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error deleting event', { error: error.message, eventId: req.params?.eventId, userId: req.user?.id });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
