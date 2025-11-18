import express from 'express';
// Import controllers.
import { getCourses, getCourseById, createCourse, updateCourse } from '../controllers/courses.js';

/**
 * Create a new Express router for course routes.
 * The mergeParams option is set to true to access parameters from parent routers.
 */
const router = express.Router({ mergeParams: true });

/**
 * Define route handlers for getting all courses and creating a new course.
 */
router.route('/').get(getCourses).post(createCourse);

/**
 * Define route handler for getting a single course by ID.
 */
router.route('/:id').get(getCourseById).put(updateCourse);

/**
 * Export the router as the default export of this module.
 */
export default router;
