const Product = require('../models/Product');
const Order = require('../models/Order');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const requestedItems = Array.isArray(req.body.items) ? req.body.items : [];
  if (!requestedItems.length) return next(new AppError('At least one product is required.', 400));

  const productIds = requestedItems.map(item => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  const productsById = new Map(products.map(product => [String(product._id), product]));

  const items = requestedItems.map(item => {
    const product = productsById.get(String(item.productId));
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1) return null;
    return { product: product._id, name: product.name, price: product.price, quantity };
  });

  if (items.some(item => !item)) return next(new AppError('One or more products are invalid.', 400));

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({ user: req.user.id, items, total });
  res.status(201).json({ status: 'success', data: { order } });
});

exports.getMyOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});
