// Importing required modules
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const express = require("express");
const errorHandler = require("./middlewares/error");
const connectMongoDB = require("./configs/mongo-db");

// Load environment variables
dotenv.config(".env");

// Connect to MongoDB
connectMongoDB();

// Initialize Express app
const app = express();

// Body Parser
app.use(express.json());

// Morgan logger
app.use(morgan("dev"));

// Routes
const health = require("./routes/health");
const bootcamps = require("./routes/bootcamps");

// Add Routers
app.use("/api/v1/health", health);
app.use("/api/v1/bootcamps", bootcamps);

// Error handler
app.use(errorHandler);

// Define the port to run the server on
const PORT = process.env.APP_PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
