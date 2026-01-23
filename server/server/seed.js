const mongoose = require('mongoose');
const Pet = require('./models/Pet');
require('dotenv').config();

const seedPets = [
  {
    name: 'Buddy',
    type: 'Dog',
    age: 2,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    homeType: 'House',
    careLevel: 'High',
    description: 'Energetic and friendly golden retriever'
  },
  {
    name: 'Whiskers',
    type: 'Cat',
    age: 1,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    homeType: 'Flat',
    careLevel: 'Low',
    description: 'Calm and independent cat'
  },
  {
    name: 'Max',
    type: 'Dog',
    age: 3,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    homeType: 'House',
    careLevel: 'Medium',
    description: 'Playful and loyal companion'
  },
  {
    name: 'Luna',
    type: 'Cat',
    age: 2,
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
    homeType: 'Flat',
    careLevel: 'Low',
    description: 'Sweet and gentle cat'
  },
  {
    name: 'Charlie',
    type: 'Dog',
    age: 1,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    homeType: 'Flat',
    careLevel: 'Medium',
    description: 'Small breed perfect for apartments'
  },
  {
    name: 'Mittens',
    type: 'Cat',
    age: 3,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    homeType: 'Flat',
    careLevel: 'Low',
    description: 'Quiet and affectionate'
  },
  {
    name: 'Rocky',
    type: 'Dog',
    age: 4,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    homeType: 'House',
    careLevel: 'High',
    description: 'Active and protective guard dog'
  },
  {
    name: 'Shadow',
    type: 'Cat',
    age: 2,
    image: 'https://images.unsplash.com/photo-1573865526739-10c1dd7ca8e0?w=400',
    homeType: 'Flat',
    careLevel: 'Medium',
    description: 'Curious and playful black cat'
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petmatch')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing pets
    await Pet.deleteMany({});
    console.log('Cleared existing pets');
    
    // Insert new pets
    await Pet.insertMany(seedPets);
    console.log('✅ Seeded 8 pets successfully');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });