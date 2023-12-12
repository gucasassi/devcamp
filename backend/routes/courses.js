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
  .post(createCourse);

// Individual routes
// GET for fetching, PUT for updating a course by ID
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

// Export router
module.exports = router;
