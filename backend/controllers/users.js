// Imports
const asyncHandler = require("../middlewares/async");

// Models
const User = require("../models/User");

// @desc    Get current logged user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({ success: true, data: user });
});
