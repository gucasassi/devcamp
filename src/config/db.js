import mongoose from 'mongoose';

/**
 * Connect to MongoDB database.
 */
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connected: ${conn.connection.host}`.green.bold);
};

// Export the database connection function.
export default connectDB;
