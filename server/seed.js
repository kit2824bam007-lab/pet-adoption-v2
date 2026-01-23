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
    activityLevel: 'High',
    kidFriendly: true,
    description: 'Energetic and friendly golden retriever'
  },
  {
    name: 'Whiskers',
    type: 'Cat',
    age: 1,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    homeType: 'Apartment',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Calm and independent cat'
  },
  {
    name: 'Max',
    type: 'Dog',
    age: 3,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    homeType: 'House',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Playful and loyal companion'
  },
  {
    name: 'Luna',
    type: 'Cat',
    age: 2,
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
    homeType: 'Apartment',
    careLevel: 'Low',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Sweet and gentle cat'
  },
  {
    name: 'Charlie',
    type: 'Dog',
    age: 1,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
    homeType: 'Apartment',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Small breed perfect for apartments'
  },
  {
    name: 'Mittens',
    type: 'Cat',
    age: 3,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    homeType: 'Apartment',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Quiet and affectionate'
  },
  {
    name: 'Rocky',
    type: 'Dog',
    age: 4,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    homeType: 'House',
    careLevel: 'High',
    activityLevel: 'High',
    kidFriendly: false,
    description: 'Active and protective guard dog'
  },
  {
    name: 'Shadow',
    type: 'Cat',
    age: 2,
    image: 'https://images.unsplash.com/photo-1573865526739-10c1dd7ca8e0?w=400',
    homeType: 'Apartment',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Curious and playful black cat'
  },
  {
    name: 'Sky',
    type: 'Bird',
    age: 1,
    image: 'https://images.unsplash.com/photo-1522926126624-3971143f8237?w=400',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Beautiful and talkative parrot'
  },
  {
    name: 'Sunny',
    type: 'Bird',
    age: 2,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30eba3?w=400',
    homeType: 'Any',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Cheerful canary with a lovely song'
  },
  {
    name: 'Cloud',
    type: 'Bird',
    age: 1,
    image: 'https://images.unsplash.com/photo-1517114480845-896881c61556?w=400',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Vibrant blue budgie'
  },
  {
    name: 'Thumper',
    type: 'Rabbit',
    age: 1,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
    homeType: 'Any',
    careLevel: 'Medium',
    activityLevel: 'Medium',
    kidFriendly: true,
    description: 'Friendly and soft grey rabbit'
  },
  {
    name: 'Snowball',
    type: 'Rabbit',
    age: 2,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400',
    homeType: 'Any',
    careLevel: 'Low',
    activityLevel: 'Low',
    kidFriendly: true,
    description: 'Quiet white rabbit that loves carrots'
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
    console.log(`✅ Seeded ${seedPets.length} pets successfully`);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });