const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Resource name is required'],
      trim: true,
      minlength: [2, 'Resource name must be at least 2 characters']
    },

    type: {
      type: String,
      required: [true, 'Resource type is required'],
      trim: true
    },

    capacity: {
      type: Number,
      required: [true, 'Resource capacity is required'],
      min: [1, 'Resource capacity must be at least 1']
    },

    location: {
      type: String,
      required: [true, 'Resource location is required'],
      trim: true
    },

    description: {
      type: String,
      required: [true, 'Resource description is required'],
      trim: true
    },

    amenities: [
      {
        type: String,
        trim: true
      }
    ],

    price: {
      type: Number,
      required: [true, 'Resource price is required'],
      min: [0, 'Resource price cannot be negative']
    },

    available: {
      type: Boolean,
      default: true
    },

    color: {
      type: String,
      default: 'sage',
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

module.exports = mongoose.model('Resource', resourceSchema);