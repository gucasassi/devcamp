// Imports
const asyncHandler = require("../middlewares/async");

// Models
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // Validate user
  if (!user) {
    next(new ErrorResponse(`User ${req.params.id} does not exist`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get current logged user
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({ success: true, data: user });
});

// @desc    Update user details
// @route   PUT /api/v1/users/me
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  // Define updateable details
  const userDetails = { name: req.body.name };

  // Update user details
  const user = await User.findByIdAndUpdate(req.user, userDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});
