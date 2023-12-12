// Importing required modules
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const express = require("express");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const errorHandler = require("./middlewares/error");
const connectMongoDB = require("./configs/mongodb");

// Load environment variables
dotenv.config(".env");

// Connect to MongoDB
connectMongoDB();

// Initialize Express app
const app = express();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Morgan logger
app.use(morgan("dev"));

// File uploading
app.use(fileupload());

// Set public as static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
const auth = require("./routes/auth");
const health = require("./routes/health");
const courses = require("./routes/courses");
const bootcamps = require("./routes/bootcamps");

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/health", health);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

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
