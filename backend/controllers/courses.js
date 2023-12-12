const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc        Get single course
// @route       GET /api/v1/courses/:id
// @access      Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} does not exist`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});

// @desc        Create new course
// @route       POST /api/v1/bootcamps/:bootcampId/courses
// @access      Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  // Set bootcampid
  if (req.params.bootcampId) {
    req.body.bootcamp = req.params.bootcampId;
  }

  // Find associated bootcamp
  const bootcamp = await Bootcamp.findById(req.body.bootcamp);

  // Validate bootcamp
  if (!bootcamp) {
    next(
      new ErrorResponse(
        `Bootcamp with id ${req.body.bootcamp} does not exist`,
        404
      )
    );
  }

  // Create course
  const course = await Course.create(req.body);

  res.status(201).json({ success: true, data: course });
});
