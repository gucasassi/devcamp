// Imports
const mongoose = require("mongoose");

// Create Schema
const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 100,
    required: [true, "Please add a title for the review"],
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Export Model
module.exports = mongoose.model("Review", ReviewSchema);
