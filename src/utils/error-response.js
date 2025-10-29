/**
 * Custom error class for handling API error responses.
 * Extends the built-in Error object to include an HTTP status code.
 *
 * @class ErrorResponse
 * @extends {Error}
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Exports.
export default ErrorResponse;
