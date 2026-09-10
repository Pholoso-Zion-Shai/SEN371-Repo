const Booking = require('../models/Booking');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getMyBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
});

exports.createBooking = catchAsync(async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    user: req.user.id
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
