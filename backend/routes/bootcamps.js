// Importing Express and Bootcamp controllers
const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

// Creating a router
const router = express.Router();

// Bootcamps Routes
// GET for fetching all bootcamps, POST for creating a new bootcamp
router.route("/").get(getBootcamps).post(createBootcamp);

// Individual Bootcamp Routes
// GET for fetching, PUT for updating, DELETE for deleting a bootcamp by ID
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// Exporting the router
module.exports = router;
