import ErrorResponse from '../utils/error-response.js';

/**
 * Express middleware for centralized error handling.
 *
 * Sends a JSON response with the error message and appropriate HTTP status code.
 *
 * @function
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Mongoose ObjectId.
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key.
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error.
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message[0], 400);
  }

  // Send error response.
  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};

// Exports.
export default errorHandler;
