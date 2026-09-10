const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signToken = (user) => jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    studentId: user.studentId,
    department: user.department
  },
  process.env.JWT_SECRET || 'campushub-dev-secret',
  { expiresIn: '8h' }
);

exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, studentId, department } = req.body;

  if (!firstName || !lastName || !email || !password || !studentId || !department) {
    return next(new AppError('Please provide all required fields.', 400));
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return next(new AppError('An account with that email already exists.', 400));
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
    studentId,
    department,
    role: 'student'
  });

  const token = signToken(user);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        studentId: user.studentId,
        department: user.department,
        role: user.role
      }
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  if (!user) {
    return next(new AppError('Invalid email or password.', 401));
  }

  const correctPassword = await bcrypt.compare(password, user.passwordHash);
  if (!correctPassword) {
    return next(new AppError('Invalid email or password.', 401));
  }

  const token = signToken(user);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        studentId: user.studentId,
        department: user.department,
        role: user.role
      }
    }
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        studentId: user.studentId,
        department: user.department,
        role: user.role
      }
    }
  });
});
