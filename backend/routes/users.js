// Imports
const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateDetails,
} = require("../controllers/users");

// Models
const User = require("../models/User");

// Middleware
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

// Creating router
const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize("admin"));

// Mapping routes
router.route("/").get(advancedResults(User), getUsers).post(createUser);
router
  .route("/:id")
  .get(getUser)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

// Export router;
module.exports = router;
