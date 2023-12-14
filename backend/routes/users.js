// Imports
const express = require("express");
const { getMe, updateDetails } = require("../controllers/users");

// Auth middleware
const { protect, authorize } = require("../middlewares/auth");

// Creating router
const router = express.Router();

// Mapping routes
router.route("/").put(protect, updateDetails);
router.route("/me").get(protect, getMe);

// Export router;
module.exports = router;
