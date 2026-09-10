const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getMyBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
});

exports.createBooking = catchAsync(async (req, res) => {
  const { resourceId, date, time, color } = req.body;
  const resource = await Resource.findById(resourceId);

  if (!resource) {
    return res.status(404).json({
      status: 'fail',
      message: 'No resource found with that ID'
    });
  }

  if (!resource.available) {
    return res.status(409).json({
      status: 'fail',
      message: 'This resource is currently unavailable'
    });
  }

  const booking = await Booking.create({
    user: req.user.id,
    resourceId: resource._id,
    resource: resource.name,
    date,
    time,
    price: resource.price * 2,
    color: color || resource.color,
    status: 'Pending'
  });

  res.status(201).json({ status: 'success', data: { booking } });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!booking) {
    return next(new AppError('No booking found for this user', 404));
  }

  res.status(200).json({ status: 'success', data: { booking } });
});
