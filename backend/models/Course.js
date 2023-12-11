// Imports
const mongoose = require("mongoose");

// Schema
const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a coure title"],
  },
  description: {
    type: String,
    trim: true,
    required: [(true, "Please add a description")],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
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
});

// Export model
module.exports = mongoose.model("Course", CourseSchema);
