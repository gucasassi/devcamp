import dotenv from 'dotenv';
import morgan from 'morgan';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import errorHandler from './middleware/error.js';
import express from 'express';
// Local imports.
import connectDB from './config/db.js';
import health from './routes/health.js';
import bootcamps from './routes/bootcamps.js';
import courses from './routes/courses.js';

// Load environment variables from .env file.
dotenv.config();

// Connect to the database.
connectDB();

// Create an Express application.
const app = express();

// Use extended query parser to support complex query strings.
app.set('query parser', 'extended');

// Body parser middleware to handle JSON requests.
app.use(express.json());

// Use morgan for logging HTTP requests in development mode.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount all routes.
app.use('/health', health);
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

// Error handling middleware
// NOTE: Should be the last piece of middleware added.
app.use(errorHandler);

// Define the port to listen on (from environment or default to 3000).
const PORT = process.env.APP_PORT || 3000;

// Start the server and listen on the specified port.
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.green.bold);
});

// Handle unhandled promise rejections.
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close server & exit process.
  server.close(() => process.exit(1));
});
