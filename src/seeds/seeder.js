import fs from 'node:fs';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load models.
import Bootcamp from '../models/Bootcamp.js';
import Course from '../models/Course.js';

// Read data files.
const bootcamps = JSON.parse(fs.readFileSync(`${process.cwd()}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${process.cwd()}/_data/courses.json`, 'utf-8'));

// Load env vars
dotenv.config();

// Connect to DB.
mongoose.connect(process.env.MONGO_URI);

// Seed all data.
export const insertData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log('Data: Inserted'.green);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data.
export const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data: Deleted'.yellow);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run script.
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
