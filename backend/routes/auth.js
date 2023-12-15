// Imports
const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  getMe,
} = require("../controllers/auth");

// Creating router
const router = express.Router();

// Auth middleware
const { protect } = require("../middlewares/auth");

// Auth routes
router.route("/me").get(protect, getMe);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
router.route("/update-password").put(protect, updatePassword);
router.route("/reset-password/:resettoken").put(resetPassword);

// Exporting router
module.exports = router;
