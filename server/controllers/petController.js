const Pet = require('../models/Pet');
const User = require('../models/User');

// Get all available pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({ isAdopted: false });
    res.status(200).json({ pets });
  } catch (error) {
    console.error('Get pets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pet by ID
exports.getPetById = async (req, res) => {
  try {
    let pet = await Pet.findById(req.params.id).populate('owner', 'username email phone');
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Handle legacy data: If owner is missing, try to find a user with the contact email
    if (!pet.owner) {
      const fallbackOwner = await User.findOne({ email: pet.contactEmail });
      if (fallbackOwner) {
        // Temporarily assign for this request
        pet.owner = {
          _id: fallbackOwner._id,
          username: fallbackOwner.username,
          email: fallbackOwner.email,
          phone: fallbackOwner.phone
        };
        
        // Update the database to fix it permanently
        await Pet.findByIdAndUpdate(pet._id, { owner: fallbackOwner._id });
        console.log(`✅ Fixed missing owner for pet ${pet.name} using email ${pet.contactEmail}`);
      } else {
        console.warn(`⚠️ Pet ${pet._id} (${pet.name}) has no valid owner and no matching user found for ${pet.contactEmail}`);
      }
    }

    res.status(200).json({ pet });
  } catch (error) {
    console.error('Get pet error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Create new pet
exports.createPet = async (req, res) => {
  try {
    const { 
      name, type, breed, location, age, image, 
      homeType, careLevel, activityLevel, kidFriendly, 
      description, contactEmail, contactPhone, owner 
    } = req.body;

    const pet = new Pet({
      name,
      type,
      breed,
      location,
      age,
      image,
      homeType,
      careLevel,
      activityLevel,
      kidFriendly,
      description,
      contactEmail,
      contactPhone,
      owner
    });

    await pet.save();

    res.status(201).json({
      message: 'Pet created successfully',
      pet
    });
  } catch (error) {
    console.error('Create pet error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error during pet registration: ' + error.message, stack: error.stack });
  }
};

// Filter pets by type
exports.filterPetsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const pets = await Pet.find({ type, isAdopted: false });
    res.status(200).json({ pets });
  } catch (error) {
    console.error('Filter pets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search pets by name
exports.searchPetsByName = async (req, res) => {
  try {
    const { name } = req.params;
    const pets = await Pet.find({
      name: { $regex: name, $options: 'i' },
      isAdopted: false
    });
    res.status(200).json({ pets });
  } catch (error) {
    console.error('Search pets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recommended pets based on user profile and preferences
exports.getRecommendedPets = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { profile = {}, preferences = {} } = user;

    // Build query
    let query = { isAdopted: false };

    // Filter by preferred pet types
    if (preferences && preferences.petType && preferences.petType.length > 0) {
      query.type = { $in: preferences.petType };
    }

    // Filter by kid friendly if user has kids
    if (profile && profile.hasKids) {
      query.kidFriendly = true;
    }

    // Home type matching
    if (profile && profile.homeType === 'Apartment') {
      query.homeType = { $in: ['Apartment', 'Any'] };
    } else if (profile && profile.homeType === 'House') {
      query.homeType = { $in: ['Apartment', 'House', 'Any'] };
    } else if (profile && profile.homeType === 'Farm') {
      query.homeType = { $in: ['Apartment', 'House', 'Farm', 'Any'] };
    }

    // Activity level matching based on user's free time
    if (profile && profile.freeTime === 'Low') {
      query.activityLevel = 'Low';
    } else if (profile && profile.freeTime === 'Medium') {
      query.activityLevel = { $in: ['Low', 'Medium'] };
    } else if (profile && profile.freeTime === 'High') {
      query.activityLevel = { $in: ['Low', 'Medium', 'High'] };
    }

    // Preferred Age matching
    if (preferences && preferences.preferredAge && preferences.preferredAge !== 'Any') {
      if (preferences.preferredAge === 'Puppy/Kitten') {
        query.age = { $lte: 1 };
      } else if (preferences.preferredAge === 'Adult') {
        query.age = { $gt: 1, $lte: 7 };
      } else if (preferences.preferredAge === 'Senior') {
        query.age = { $gt: 7 };
      }
    }

    const pets = await Pet.find(query);

    res.status(200).json({ pets });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
