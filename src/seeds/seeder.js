import fs from 'fs';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load model.
import Bootcamp from '../models/Bootcamp.js';

// Load env vars
dotenv.config();

// Connect to DB.
mongoose.connect(process.env.MONGO_URI);

// Read JSON files.
const bootcamps = JSON.parse(fs.readFileSync(`${process.cwd()}/_data/bootcamps.json`, 'utf-8'));

// Seed Bootcamps.
const seedBootcamps = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Bootcamps: Seeded'.green);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete Bootcamps.
const deleteBootcamps = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Bootcamps: Deleted'.yellow);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run script.
if (process.argv[2] === '-i') {
  seedBootcamps();
} else if (process.argv[2] === '-d') {
  deleteBootcamps();
}
