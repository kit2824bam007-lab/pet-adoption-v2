const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST /api/messages - Send a message
router.post('/', messageController.sendMessage);

// GET /api/messages/:userId - Get messages for a user
router.get('/:userId', messageController.getMessagesForUser);

module.exports = router;
