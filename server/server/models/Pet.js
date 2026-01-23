const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Dog', 'Cat']
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  homeType: {
    type: String,
    required: true,
    enum: ['Flat', 'House']
  },
  careLevel: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  description: {
    type: String,
    default: 'A lovely pet looking for a home'
  },
  isAdopted: {
    type: Boolean,
    default: false
  },
  adoptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pet', petSchema);
