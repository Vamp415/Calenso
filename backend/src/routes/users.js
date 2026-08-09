const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');
const logger = require('../lib/logger');

// Update username
router.put('/username', async (req, res) => {
  try {
    const { userId, username } = req.body;
    logger.info('Update username attempt', { userId, username });
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if username is already taken
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.email !== userId) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Update username in database
    await db.user.update({
      where: { email: userId },
      data: { username },
    });

    logger.info('Username updated successfully', { userId, username });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error updating username', { error: error.message, userId: req.body?.userId });
    res.status(500).json({ error: error.message });
  }
});

// Get user by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    logger.debug('Get user by username attempt', { username });
    
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        events: {
          where: { isPrivate: false },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            isPrivate: true,
            _count: {
              select: { bookings: true },
            },
          },
        },
      },
    });

    if (!user) {
      logger.warn('User not found', { username });
      return res.status(404).json({ error: 'User not found' });
    }

    logger.debug('User retrieved successfully', { username, userId: user.id });
    res.json(user);
  } catch (error) {
    logger.error('Error getting user', { error: error.message, username: req.params?.username });
    res.status(500).json({ error: error.message });
  }
});

// Check or create user
router.post('/sync', async (req, res) => {
  try {
    const { email, name, imageUrl, username } = req.body;
    logger.info('User sync attempt', { email, username });
    
    if (!email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email,
          name,
          imageUrl,
          username,
        },
      });
      logger.info('New user created via sync', { userId: user.id, email, username });
    } else {
      logger.debug('Existing user found via sync', { userId: user.id, email });
    }

    res.json(user);
  } catch (error) {
    logger.error('Error syncing user', { error: error.message, email: req.body?.email });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
