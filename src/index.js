// Import required packages.
import dotenv from 'dotenv';
import express from 'express';

// Load environment variables from .env file.
dotenv.config();

// Create an Express application.
const app = express();

// Define the port to listen on (from environment or default to 3000).
const PORT = process.env.APP_PORT || 3000;

// Define a route handler for GET requests to the root URL.
app.get('/', (req, res) => {
  // Send a simple response
  res.send('Hi there!');
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
