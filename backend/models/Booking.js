const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
      required: [true, 'Resource is required']
    },

    resource: {
      type: String,
      required: [true, 'Resource name is required'],
      trim: true
    },

    date: {
      type: String,
      required: [true, 'Booking date is required'],
      trim: true
    },

    time: {
      type: String,
      required: [true, 'Booking time is required'],
      trim: true
    },

    status: {
      type: String,
      enum: {
        values: ['Confirmed', 'Pending', 'Cancelled'],
        message: 'Invalid booking status'
      },
      default: 'Pending'
    },

    price: {
      type: Number,
      required: [true, 'Booking price is required'],
      min: [0, 'Booking price cannot be negative']
    },

    color: {
      type: String,
      default: 'sage',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);