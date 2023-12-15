// Import
const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
} = require("../controllers/reviews");
const advancedResults = require("../middlewares/advancedResults");

// Models
const Review = require("../models/Review");

// Middleware
const { protect, authorize } = require("../middlewares/auth");

// Create Router
const router = express.Router();

// Mapping routes
router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router.route("/:id").get(getReview).put(protect, updateReview);

// Export
module.exports = router;
