/**
 * Middleware to handle asynchronous route handlers and forward errors to Express error handler.
 *
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} Express middleware function that executes the handler and catches errors.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Exports.
export default asyncHandler;
