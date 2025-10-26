import express from 'express';
// Import controller functions for bootcamp routes.
import { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp } from '../controllers/bootcamps.js';

/**
 * Create a new Express router for bootcamp routes.
 */
const router = express.Router();

/**
 * Define route handlers for getting all bootcamps and creating a new bootcamp.
 */
router.route('/').get(getBootcamps).post(createBootcamp);

/**
 * Define route handlers for getting, updating, and deleting a single bootcamp by ID.
 */
router.route('/:id').get(getBootcampById).put(updateBootcamp).delete(deleteBootcamp);

/**
 * Export the router as the default export of this module.
 */
export default router;
