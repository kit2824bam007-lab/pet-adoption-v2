const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const User = require('../models/User');

// Adopt a pet
exports.adoptPet = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    if (!userId || !petId) {
      return res.status(400).json({ message: 'User ID and Pet ID are required' });
    }

    // Check if pet exists and is not already adopted
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.isAdopted || pet.status === 'adopted') {
      return res.status(400).json({ message: 'Pet is already adopted' });
    }

    if (pet.owner && userId && pet.owner.toString() === userId.toString()) {
      return res.status(400).json({ message: 'You cannot adopt your own pet' });
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

    // Notify pet owner
    if (pet.owner) {
      const owner = await User.findById(pet.owner);
      if (owner) {
        if (!owner.notifications) {
          owner.notifications = [];
        }
        owner.notifications.push({
          message: `Great news! ${user.username} has adopted your pet, ${pet.name}!`,
          createdAt: new Date()
        });
        await owner.save();
      }
    }

    res.status(200).json({
      message: 'Pet adopted successfully',
      adoption,
      pet
    });
  } catch (error) {
    console.error('Adoption error:', error);
    res.status(500).json({ message: 'Server error during adoption: ' + error.message });
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

// Unadopt a pet
exports.unadoptPet = async (req, res) => {
  try {
    const { userId, petId } = req.body;
    console.log('Unadoption request received:', { userId, petId });

    if (!userId || !petId) {
      return res.status(400).json({ message: 'User ID and Pet ID are required' });
    }

    // Find and delete the adoption record
    // Use a more flexible query to ensure we find the record
    const adoption = await Adoption.findOneAndDelete({ 
      user: userId, 
      pet: petId 
    });

    if (!adoption) {
      console.log('No adoption record found for query:', { user: userId, pet: petId });
      return res.status(404).json({ message: 'Adoption record not found. You may not be the one who adopted this pet.' });
    }

    console.log('Deleted adoption record:', adoption._id);

    // Update pet status
    const pet = await Pet.findById(petId);
    if (pet) {
      pet.isAdopted = false;
      pet.status = 'available';
      pet.adoptedBy = null;
      await pet.save();
      console.log('Updated pet status to available:', pet._id);
    }

    // Remove pet from user's adoptedPets array
    const user = await User.findById(userId);
    if (user && user.adoptedPets) {
      user.adoptedPets = user.adoptedPets.filter(id => id && id.toString() !== petId.toString());
      await user.save();
      console.log('Removed pet from user adoptedPets list');
    }

    res.status(200).json({ message: 'Unadoption successful' });
  } catch (error) {
    console.error('Unadoption error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
