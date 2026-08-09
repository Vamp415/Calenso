const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');
const { authenticate } = require('../../middleware/auth');
const logger = require('../lib/logger');

// Get user availability
router.get('/', authenticate, async (req, res) => {
  try {
    logger.debug('Get user availability attempt', { userId: req.user.id });
    const user = await db.user.findUnique({
      where: { id: req.user.id },
      include: {
        availability: {
          include: { days: true },
        },
      },
    });

    logger.debug('User availability retrieved successfully', { userId: req.user.id });
    res.json(user?.availability || null);
  } catch (error) {
    logger.error('Error getting availability', { error: error.message, userId: req.user?.id });
    res.status(500).json({ error: error.message });
  }
});

// Update availability
router.put('/', authenticate, async (req, res) => {
  try {
    const { timeGap, days } = req.body;
    logger.info('Update availability attempt', { userId: req.user.id, timeGap, daysCount: days?.length });

    const user = await db.user.findUnique({
      where: { id: req.user.id },
      include: { availability: true },
    });

    // Delete existing availability
    if (user?.availability) {
      await db.dayAvailability.deleteMany({
        where: { availabilityId: user.availability.id },
      });
      await db.availability.delete({
        where: { id: user.availability.id },
      });
    }

    // Create new availability
    const availability = await db.availability.create({
      data: {
        userId: req.user.id,
        timeGap,
        days: {
          create: days.map(day => ({
            day: day.day,
            startTime: new Date(day.startTime),
            endTime: new Date(day.endTime),
          })),
        },
      },
      include: { days: true },
    });

    logger.info('Availability updated successfully', { userId: req.user.id, availabilityId: availability.id });
    res.json(availability);
  } catch (error) {
    logger.error('Error updating availability', { error: error.message, userId: req.user?.id });
    res.status(500).json({ error: error.message });
  }
});

// Get available time slots for a specific date
router.get('/slots', async (req, res) => {
  try {
    const { username, eventId, date } = req.query;
    logger.debug('Get available slots attempt', { username, eventId, date });

    const event = await db.event.findFirst({
      where: {
        id: eventId,
        user: { username },
      },
      include: {
        user: {
          include: {
            availability: {
              include: { days: true },
            },
            bookings: true,
          },
        },
      },
    });

    if (!event) {
      logger.warn('Event not found for slots', { username, eventId });
      return res.status(404).json({ error: 'Event not found' });
    }

    // Calculate available slots based on availability and existing bookings
    const requestedDate = new Date(date);
    const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][requestedDate.getDay()];
    
    const dayAvailability = event.user.availability?.days.find(d => d.day === dayOfWeek);
    
    if (!dayAvailability) {
      return res.json({ slots: [] });
    }

    // Generate time slots
    const slots = [];
    const startHour = new Date(dayAvailability.startTime).getHours();
    const endHour = new Date(dayAvailability.endTime).getHours();
    const duration = event.duration;
    const timeGap = event.user.availability?.timeGap || 0;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration + timeGap) {
        const slotStart = new Date(requestedDate);
        slotStart.setHours(hour, minute, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + duration);

        if (slotEnd.getHours() <= endHour) {
          // Check if slot conflicts with existing bookings
          const hasConflict = event.user.bookings.some(booking => {
            const bookingStart = new Date(booking.startTime);
            const bookingEnd = new Date(booking.endTime);
            return (slotStart < bookingEnd && slotEnd > bookingStart);
          });

          if (!hasConflict) {
            slots.push({
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
            });
          }
        }
      }
    }

    logger.debug('Available slots retrieved successfully', { eventId, date, slotsCount: slots.length });
    res.json({ slots });
  } catch (error) {
    logger.error('Error getting available slots', { error: error.message, eventId: req.query?.eventId, date: req.query?.date });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
