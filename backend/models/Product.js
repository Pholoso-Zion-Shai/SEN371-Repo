const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters']
    },

    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true
    },

    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Product price cannot be negative']
    },

    oldPrice: {
      type: Number,
      min: [0, 'Old price cannot be negative']
    },

    rating: {
      type: Number,
      default: 4.5,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot be above 5']
    },

    tag: {
      type: String,
      trim: true
    },

    color: {
      type: String,
      default: 'blue',
      trim: true
    },

    image: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);