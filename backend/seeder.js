// Importing required modules
const fs = require("fs");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load en vars
dotenv.config(".env");

// Load models
const User = require("./models/User");
const Course = require("./models/Course");
const Bootcamp = require("./models/Bootcamp");

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import bootcamps into database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    console.log(`Data imported`.green);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete bootcamps from database
const deleteData = async () => {
  try {
    await Course.deleteMany();
    await User.deleteMany();
    await Bootcamp.deleteMany();
    console.log(`Data deleted`.yellow);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
