// Imports
const asyncHandler = require("../middlewares/async");

// Models
const User = require("../models/User");

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
