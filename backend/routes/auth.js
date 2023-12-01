// Imports
const express = require("express");
const { register } = require("../controllers/auth");

// Creating router
const router = express.Router();

// Auth routes
router.route("/register").post(register);

// Exporting router
module.exports = router;
