// Imports
const express = require("express");
const { getCourses } = require("../controllers/courses");

// Create a router
const router = express.Router({ mergeParams: true });

// Define routes
router.route("/").get(getCourses);

// Export router
module.exports = router;
