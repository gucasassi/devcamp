// Imports
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// Models
const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/v1/auth
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
