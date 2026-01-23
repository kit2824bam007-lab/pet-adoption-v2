const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const User = require('../models/User');

// Adopt a pet
exports.adoptPet = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    // Check if pet exists and is not already adopted
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.isAdopted || pet.status === 'adopted') {
      return res.status(400).json({ message: 'Pet is already adopted' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create adoption record
    const adoption = new Adoption({
      user: userId,
      pet: petId
    });

    await adoption.save();

    // Update pet status
    pet.isAdopted = true;
    pet.status = 'adopted';
    pet.adoptedBy = userId;
    await pet.save();

    // Update user's adopted pets
    if (!user.adoptedPets) {
      user.adoptedPets = [];
    }
    user.adoptedPets.push(petId);
    await user.save();

    res.status(200).json({
      message: 'Pet adopted successfully',
      adoption,
      pet
    });
  } catch (error) {
    console.error('Adoption error:', error);
    res.status(500).json({ message: 'Server error during adoption' });
  }
};

// Get user's adopted pets
exports.getUserAdoptions = async (req, res) => {
  try {
    const { userId } = req.params;

    const adoptions = await Adoption.find({ user: userId })
      .populate('pet')
      .populate('user', '-password');

    res.status(200).json(adoptions);
  } catch (error) {
    console.error('Get adoptions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all adoptions
exports.getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate('pet')
      .populate('user', '-password')
      .sort({ adoptionDate: -1 });

    res.status(200).json(adoptions);
  } catch (error) {
    console.error('Get all adoptions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
