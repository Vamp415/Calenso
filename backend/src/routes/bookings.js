const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');
const logger = require('../lib/logger');

// Create booking
router.post('/', async (req, res) => {
  try {
    const { eventId, name, email, startTime, endTime, additionalInfo, clerkUserId } = req.body;
    logger.info('Create booking attempt', { eventId, name, email, startTime });

    const event = await db.event.findUnique({
      where: { id: eventId },
      include: { user: true },
    });

    if (!event) {
      logger.warn('Event not found for booking', { eventId });
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create Google Calendar event (simplified - needs OAuth setup)
    const meetLink = `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
    const googleEventId = `cal_${Date.now()}`;

    const booking = await db.booking.create({
      data: {
        eventId,
        userId: event.userId,
        name,
        email,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    logger.info('Booking created successfully', { bookingId: booking.id, eventId, name, email, meetLink });
    res.status(201).json(booking);
  } catch (error) {
    logger.error('Error creating booking', { error: error.message, eventId: req.body?.eventId, email: req.body?.email });
    res.status(500).json({ error: error.message });
  }
});

// Get bookings for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    logger.debug('Get bookings for event attempt', { eventId });

    const bookings = await db.booking.findMany({
      where: { eventId },
      orderBy: { startTime: 'asc' },
    });

    logger.debug('Bookings retrieved successfully', { eventId, count: bookings.length });
    res.json(bookings);
  } catch (error) {
    logger.error('Error getting bookings', { error: error.message, eventId: req.params?.eventId });
    res.status(500).json({ error: error.message });
  }
});

// Cancel booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    logger.info('Cancel booking attempt', { bookingId });

    await db.booking.delete({
      where: { id: bookingId },
    });

    logger.info('Booking cancelled successfully', { bookingId });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error canceling booking', { error: error.message, bookingId: req.params?.bookingId });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
