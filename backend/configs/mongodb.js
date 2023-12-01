// Imports
const mongoose = require("mongoose");

// Connect to MongoDB
const connectMongoDB = async () => {
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error(`Error: MONGODB_URI is not set in environment variables`.red);
    process.exit(1); // Exit the process with an error code
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan);
};

// Exports
module.exports = connectMongoDB;
