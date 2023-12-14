// Import
const express = require("express");
const { getReviews, getReview } = require("../controllers/reviews");
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

router.route("/:id").get(getReview);

// Export
module.exports = router;
