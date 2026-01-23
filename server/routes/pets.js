const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// GET /api/pets - Get all pets
router.get('/', petController.getAllPets);

// GET /api/pets/:id - Get pet by ID
router.get('/:id', petController.getPetById);

// POST /api/pets - Create new pet (Admin only - for testing)
router.post('/', petController.createPet);

// GET /api/pets/filter/:type - Filter pets by type
router.get('/filter/:type', petController.filterPetsByType);

// GET /api/pets/search/:name - Search pets by name
router.get('/search/:name', petController.searchPetsByName);

// GET /api/pets/recommendations/:userId - Get recommended pets for a user
router.get('/recommendations/:userId', petController.getRecommendedPets);

module.exports = router;