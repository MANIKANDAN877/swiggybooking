const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cuisine: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  deliveryTime: {
    type: String,
    required: true
  },
  costForTwo: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  menu: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    isVegetarian: {
      type: Boolean,
      default: false
    },
    inStock: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
