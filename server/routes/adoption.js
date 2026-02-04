const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');

// POST /api/adoption/adopt - Adopt a pet
router.post('/adopt', adoptionController.adoptPet);

// GET /api/adoption/user/:userId - Get user's adopted pets
router.get('/user/:userId', adoptionController.getUserAdoptions);

// GET /api/adoption/all - Get all adoptions
router.get('/all', adoptionController.getAllAdoptions);

// POST /api/adoption/unadopt - Unadopt a pet
router.post('/unadopt', adoptionController.unadoptPet);

module.exports = router;