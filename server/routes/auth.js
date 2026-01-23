const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// GET /api/auth/user/:id - Get user by ID
router.get('/user/:id', authController.getUserById);

// PUT /api/auth/profile/:id - Update user profile
router.put('/profile/:id', authController.updateProfile);

module.exports = router;