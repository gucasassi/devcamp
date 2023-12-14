// Importing Express and Bootcamp controllers
const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsWithinRadius,
  uploadBootcampPhoto,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middlewares/advancedResults");

// Include other resource routers
const coursesRouter = require("./courses");
const reviewsRouter = require("./reviews");

// Creating a router
const router = express.Router();

// Auth middleware
const { protect, authorize } = require("../middlewares/auth");

// Bootcamps Routes
// GET for fetching all bootcamps, POST for creating a new bootcamp
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("admin", "publisher"), createBootcamp);

// Individual Bootcamp Routes
// GET for fetching, PUT for updating, DELETE for deleting a bootcamp by ID
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("admin", "publisher"), updateBootcamp)
  .delete(protect, authorize("admin", "publisher"), deleteBootcamp);

// PUT for upload bootcamp photo
router
  .route("/:id/photo")
  .put(protect, authorize("admin", "publisher"), uploadBootcampPhoto);

// Re-route into other resource routers
router.use("/:bootcampId/courses", coursesRouter);
router.use("/:bootcampId/reviews", reviewsRouter);

// Bootcamps Routes
// GET for fetching all bootcamps within radius
router.route("/radius/:zipcode/:distance").get(getBootcampsWithinRadius);

// Exporting the router
module.exports = router;
