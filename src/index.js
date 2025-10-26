import dotenv from 'dotenv';
import express from 'express';
// Import routes.
import health from './routes/health.js';
import bootcamps from './routes/bootcamps.js';

// Load environment variables from .env file.
dotenv.config();

// Create an Express application.
const app = express();

// Mount all routes.
app.use('/health', health);
app.use('/api/v1/bootcamps', bootcamps);

// Define the port to listen on (from environment or default to 3000).
const PORT = process.env.APP_PORT || 3000;

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
