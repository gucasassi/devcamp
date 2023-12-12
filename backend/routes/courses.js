// Imports
const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middlewares/advancedResults");

// Auth middleware
const { protect, authorize } = require("../middlewares/auth");

// Create a router
const router = express.Router({ mergeParams: true });

// Root routes
// GET for fetching all courses
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("admin", "publisher"), createCourse);

// Individual routes
// GET for fetching, PUT for updating a course by ID
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("admin", "publisher"), updateCourse)
  .delete(protect, authorize("admin", "publisher"), deleteCourse);

// Export router
module.exports = router;
