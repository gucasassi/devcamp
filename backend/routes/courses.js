// Imports
const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
} = require("../controllers/courses");

// Create a router
const router = express.Router({ mergeParams: true });

// Root routes
// GET for fetching all courses
router.route("/").get(getCourses).post(createCourse);

// Individual routes
// GET for fetching, PUT for updating a course by ID
router.route("/:id").get(getCourse).put(updateCourse);

// Export router
module.exports = router;
