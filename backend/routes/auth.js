// Imports
const express = require("express");
const { register, login } = require("../controllers/auth");

// Creating router
const router = express.Router();

// Auth routes
router.route("/login").post(login);
router.route("/register").post(register);

// Exporting router
module.exports = router;
