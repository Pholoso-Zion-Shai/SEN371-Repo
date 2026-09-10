const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const parseTimeRange = time => {
  const match = /^([01]\d|2[0-3]):([0-5]\d)\s*[–-]\s*([01]\d|2[0-3]):([0-5]\d)$/.exec(time || '');
  if (!match) return null;
  return [Number(match[1]) * 60 + Number(match[2]), Number(match[3]) * 60 + Number(match[4])];
};

exports.getMyBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', results: bookings.length, data: { bookings } });
});

exports.createBooking = catchAsync(async (req, res) => {
  const { resourceId, date, time, color } = req.body;
  const requestedRange = parseTimeRange(time);

  if (!date || !requestedRange || requestedRange[0] >= requestedRange[1]) {
    return res.status(400).json({ status: 'fail', message: 'Provide a valid booking date and time range.' });
  }

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

  const existingBookings = await Booking.find({
    resourceId: resource._id,
    date,
    status: { $ne: 'Cancelled' }
  }).select('time');

  const overlaps = existingBookings.some(existing => {
    const existingRange = parseTimeRange(existing.time);
    return existingRange && requestedRange[0] < existingRange[1] && requestedRange[1] > existingRange[0];
  });

  if (overlaps) {
    return res.status(409).json({ status: 'fail', message: 'This resource is already booked for that time.' });
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
  const allowedStatuses = ['Confirmed', 'Pending', 'Cancelled'];
  if (!allowedStatuses.includes(req.body.status)) {
    return next(new AppError('Only a valid booking status can be updated.', 400));
  }

  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { $set: { status: req.body.status } },
    { new: true, runValidators: true }
  );

  if (!booking) {
    return next(new AppError('No booking found for this user', 404));
  }

  res.status(200).json({ status: 'success', data: { booking } });
});
