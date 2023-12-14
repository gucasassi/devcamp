// Imports
const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

// Creating router
const router = express.Router();

// Auth middleware
const { protect } = require("../middlewares/auth");

// Auth routes
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/me").get(protect, getMe);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resettoken").put(resetPassword);

// Exporting router
module.exports = router;
