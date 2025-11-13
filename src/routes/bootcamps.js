import express from 'express';
// Import controller functions for bootcamp routes.
import {
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} from '../controllers/bootcamps.js';
import coursesRouter from './courses.js';

/**
 * Create a new Express router for bootcamp routes.
 */
const router = express.Router();

/***
 * Mount the courses router on the bootcamp routes to handle nested course routes.
 * This allows access to courses related to a specific bootcamp.
 */
router.use('/:bootcampId/courses', coursesRouter);

/**
 * Define route handlers for getting all bootcamps and creating a new bootcamp.
 */
router.route('/').get(getBootcamps).post(createBootcamp);

/**
 * Define route handler for getting bootcamps within a radius.
 */
router.route('/radius').get(getBootcampsInRadius);

/**
 * Define route handlers for getting, updating, and deleting a single bootcamp by ID.
 */
router.route('/:id').get(getBootcampById).put(updateBootcamp).delete(deleteBootcamp);

/**
 * Export the router as the default export of this module.
 */
export default router;
