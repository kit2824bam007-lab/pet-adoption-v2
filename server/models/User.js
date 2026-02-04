const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    homeType: { type: String, enum: ['Apartment', 'House', 'Farm'], default: 'Apartment' },
    hasKids: { type: Boolean, default: false },
    freeTime: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    petExperience: { type: String, enum: ['None', 'Beginner', 'Experienced'], default: 'None' }
  },
  preferences: {
    petType: { type: [String], default: [] },
    preferredAge: { type: String, enum: ['Puppy/Kitten', 'Adult', 'Senior', 'Any'], default: 'Any' },
    activityLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
  },
  adoptedPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  notifications: [{
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
