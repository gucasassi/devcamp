import Course from '../models/Course.js';
import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/error-response.js';
import asyncHandler from '../middleware/async.js';

/**
 * @desc   - Get all courses controller.
 * @route  - GET /api/v1/courses
 * @route  - GET /api/v1/bootcamps/:bootcampId/courses
 * @access - Public
 */
const getCourses = asyncHandler(async (req, res) => {
  // Define query variable.
  let query;

  if (req.params.bootcampId) {
    // Get courses for a specific bootcamp.
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // Get all courses with bootcamp name and description.
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  // Execute query.
  const courses = await query;

  // Return response.
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

/**
 * @desc   - Get single course controller.
 * @route  - GET /api/v1/courses/:id
 * @access - Public
 */
const getCourseById = asyncHandler(async (req, res, next) => {
  // Find requested course.
  const course = await Course.findById(req.params.id);

  // If course not found, return 404.
  if (!course) {
    // Pass errors to middleware.
    return next(new ErrorResponse(`No course found with the provided id: '${req.params.id}'.`, 404));
  }

  // Return the found course.
  res.status(200).send({ success: true, data: course });
});

/**
 * @desc   - Create new course controller.
 * @route  - POST /api/v1/bootcamps/:bootcampId/courses
 * @access - Private
 */
const createCourse = asyncHandler(async (req, res) => {
  // Set bootcamp field from URL parameter to request body.
  // This associates the new course with the specified bootcamp.
  req.body.bootcamp = req.params.bootcampId;

  // Verify that the bootcamp exists.
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  // If bootcamp not found, return 404.
  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp found with the provided id: '${req.params.bootcampId}'.`, 404));
  }

  // Create new course in the database.
  const course = await Course.create(req.body);

  // Return the created course.
  res.status(201).send({ success: true, data: course });
});

// Export controllers.
export { getCourses, getCourseById, createCourse };
