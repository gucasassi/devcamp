// Imports
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  let decoded;

  if (
    req?.headers?.authorization &&
    req?.headers?.authorization?.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    // Validate token
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(err);
    next(new ErrorResponse("Internal server error", 500));
  }

  // Validate user exist
  const user = await User.findById(decoded.id);

  if (!user) {
    console.error(`User ${decoded.id} does not exist`);
    return next(new ErrorResponse("Not authorize to access this route", 401));
  } else {
    req.user = user;
  }

  next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorized to commit this action`,
          403
        )
      );
    }
    next();
  };
};
