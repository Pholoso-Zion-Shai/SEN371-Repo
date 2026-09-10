const Resource = require('../models/Resource');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllResources = catchAsync(async (req, res) => {
  const resources = await Resource.find();
  res.status(200).json({ status: 'success', results: resources.length, data: { resources } });
});

exports.getResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) {
    return next(new AppError('No resource found with that ID', 404));
  }
  res.status(200).json({ status: 'success', data: { resource } });
});

exports.createResource = catchAsync(async (req, res) => {
  const resource = await Resource.create(req.body);
  res.status(201).json({ status: 'success', data: { resource } });
});

exports.updateResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!resource) {
    return next(new AppError('No resource found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: { resource } });
});

exports.deleteResource = catchAsync(async (req, res, next) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);
  if (!resource) {
    return next(new AppError('No resource found with that ID', 404));
  }
  res.status(204).json({ status: 'success', data: null });
});
