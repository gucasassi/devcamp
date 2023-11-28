// Importing Express and Health controllers
const express = require("express");
const { healthCheck } = require("../controllers/health");

// Create a new router instance
const router = express.Router();

// Define the route for the root path
// GET request to "/" will invoke the healthCheck controller
router.route("/").get(healthCheck);

// Export the router
module.exports = router;
