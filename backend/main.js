// Importing required modules
const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require("express");
const connectMongoDB = require("./configs/mongo-db");

// Load environment variables
dotenv.config(".env");

// Connect to MongoDB
connectMongoDB();

// Initialize Express app
const app = express();

// Morgan logger
app.use(morgan("dev"));

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
