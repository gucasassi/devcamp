// Importing required modules
const dotenv = require("dotenv");
const express = require("express");

// Load environment variables
dotenv.config(".env");

// Initialize Express app
const app = express();

// Routes
const bootcamps = require("./routes/bootcamps");

// Mount Routes
app.use("/api/v1/bootcamps", bootcamps);

// Define the port to run the server on
const PORT = process.env.APP_PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
