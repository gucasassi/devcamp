// Importing Express and Bootcamp controllers
const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsWithinRadius,
} = require("../controllers/bootcamps");

// Creating a router
const router = express.Router();

// Auth middleware
const { protect, authorize } = require("../middlewares/auth");

// Bootcamps Routes
// GET for fetching all bootcamps, POST for creating a new bootcamp
router
  .route("/")
  .get(getBootcamps)
  .post(protect, authorize("admin", "publisher"), createBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsWithinRadius);

// Individual Bootcamp Routes
// GET for fetching, PUT for updating, DELETE for deleting a bootcamp by ID
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("admin", "publisher"), updateBootcamp)
  .delete(protect, authorize("admin", "publisher"), deleteBootcamp);

// Exporting the router
module.exports = router;
