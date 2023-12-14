// Import
const express = require("express");
const { getReviews } = require("../controllers/reviews");
const advancedResults = require("../middlewares/advancedResults");

// Models
const Review = require("../models/Review");

// Create Router
const router = express.Router({ mergeParams: true });

// Mapping routes
router.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

// Export
module.exports = router;
