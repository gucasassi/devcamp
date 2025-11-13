import Course from '../models/Course.js';
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

// Export controllers.
export { getCourses };
