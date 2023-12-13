const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
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
  // Add user to req.body
  req.body.user = req.user.id;

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

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add course to bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

  // Create course
  const course = await Course.create(req.body);

  res.status(201).json({ success: true, data: course });
});

// @desc        Update course
// @route       PUT /api/v1/courses/:id
// @access      Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  // Check course exist
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} does not exist`, 404)
    );
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course ${course._id}`,
        401
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: course });
});

// @desc        Delete course
// @route       DELETE /api/v1/courses/:id
// @access      Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  // Check course exist
  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} does not exist`, 404)
    );
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete course ${course._id}`,
        401
      )
    );
  }

  await course.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
