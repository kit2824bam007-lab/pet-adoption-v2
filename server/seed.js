const mongoose = require('mongoose');
const Pet = require('./models/Pet');
const User = require('./models/User');
const Adoption = require('./models/Adoption');
require('dotenv').config();

const seedPets = [
  {
    name: 'Buddy',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    homeType: 'House',
    careLevel: 'High',
    activityLevel: 'High',
    kidFriendly: true,
    description: 'Energetic and friendly golden retriever',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Tabby',
    age: 1,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    homeType: 'Apartment',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Calm and independent cat',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Max',
    type: 'Dog',
    breed: 'Labrador',
    age: 3,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    homeType: 'House',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Playful and loyal companion',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: 2,
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
    homeType: 'Apartment',
    careLevel: 'Low',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Sweet and gentle cat',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Charlie',
    type: 'Dog',
    breed: 'Poodle',
    age: 1,
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    homeType: 'Apartment',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Small breed perfect for apartments',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Mittens',
    type: 'Cat',
    breed: 'Maine Coon',
    age: 3,
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    homeType: 'Apartment',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Quiet and affectionate',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Rocky',
    type: 'Dog',
    breed: 'German Shepherd',
    age: 4,
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    homeType: 'House',
    careLevel: 'High',
    activityLevel: 'High',
    kidFriendly: false,
    description: 'Active and protective guard dog',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Shadow',
    type: 'Cat',
    breed: 'Black Cat',
    age: 2,
    location: 'Portland, OR',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    homeType: 'Apartment',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Curious and playful black cat',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Sky',
    type: 'Bird',
    breed: 'Parrot',
    age: 1,
    location: 'Phoenix, AZ',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Beautiful and talkative parrot',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Sunny',
    type: 'Bird',
    breed: 'Canary',
    age: 2,
    location: 'San Diego, CA',
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800',
    homeType: 'Any',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Cheerful canary with a lovely song',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  },
  {
    name: 'Thumper',
    type: 'Rabbit',
    breed: 'Mixed',
    age: 1,
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Friendly and soft grey rabbit',
    contactEmail: 'admin@petmatch.com',
    contactPhone: '123-456-7890'
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petmatch')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Pet.deleteMany({});
    await User.deleteMany({});
    await Adoption.deleteMany({});
    console.log('Cleared existing data');
    
    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@petmatch.com',
      password: 'password123',
      phone: '123-456-7890',
      address: '123 Admin St, Pet City'
    });
    
    await adminUser.save();
    console.log('✅ Admin user created');
    
    // Assign owner to all pets
    const petsWithOwner = seedPets.map(pet => ({
      ...pet,
      owner: adminUser._id
    }));
    
    // Insert new pets
    const insertedPets = await Pet.insertMany(petsWithOwner);
    console.log(`✅ Seeded ${seedPets.length} pets successfully`);

    // Mark Shadow, Sky, and Sunny as adopted
    const adoptedPetNames = ['Shadow', 'Sky', 'Sunny'];
    const petsToAdopt = insertedPets.filter(pet => adoptedPetNames.includes(pet.name));

    for (const pet of petsToAdopt) {
      pet.status = 'adopted';
      pet.isAdopted = true;
      pet.adoptedBy = adminUser._id;
      await pet.save();

      const adoption = new Adoption({
        user: adminUser._id,
        pet: pet._id,
        status: 'completed'
      });
      await adoption.save();
    }
    console.log('✅ Marked Shadow, Sky, and Sunny as adopted');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });