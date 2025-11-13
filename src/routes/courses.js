import express from 'express';
// Import controllers.
import { getCourses } from '../controllers/courses.js';

/**
 * Create a new Express router for course routes.
 * The mergeParams option is set to true to access parameters from parent routers.
 */
const router = express.Router({ mergeParams: true });

/**
 * Define route handler for getting all courses or courses for a specific bootcamp.
 */
router.route('/').get(getCourses);

/**
 * Export the router as the default export of this module.
 */
export default router;
