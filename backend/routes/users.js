// Imports
const express = require("express");
const { getMe } = require("../controllers/users");

// Auth middleware
const { protect } = require("../middlewares/auth");

// Creating router
const router = express.Router();

// Mapping routes
router.route("/").get().put().delete();
router.route("/me").get(protect, getMe);

// Export router;
module.exports = router;
