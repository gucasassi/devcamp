// Importing required modules
const fs = require("fs");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load en vars
dotenv.config(".env");

// Load models
const Bootcamp = require("./models/Bootcamp");

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import bootcamps into database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log(`Data imported`.green);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete bootcamps from database
const deleteData = async () => {
  try {
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
