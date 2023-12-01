// Imports
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Define schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please add email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please add password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Export model
module.exports = mongoose.model("User", UserSchema);