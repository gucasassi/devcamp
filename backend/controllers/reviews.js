// Imports
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// Models
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");

// @desc        Get reviews
// @route       GET /api/v1/reviews
// @route       GET /api/v1/bootcamps/:bootcampId/reviews
// @access      Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Get single review
// @route       GET /api/v1/reviews/:id
// @access      Public
exports.getReview = asyncHandler(async (req, res, next) => {
  // Get review
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  // Validate review exist
  if (!review) {
    return next(
      new ErrorResponse(`No review found with ${req.params.id} id`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});

// @desc        Add review
// @route       POST /api/v1/reviews
// @route       POST /api/v1/bootcamps/:bootcampId/reviews
// @access      Private
exports.addReview = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Set bootcampid
  if (req.params.bootcampId) {
    req.body.bootcamp = req.params.bootcampId;
  }

  // Validate bootcamp
  const bootcamp = await Bootcamp.findById(req.body.bootcamp);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id ${req.body.bootcamp}`, 404)
    );
  }

  // Create Review
  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});

// @desc        Update review
// @route       PUT /api/v1/reviews/:id
// @access      Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  // Validate review exist
  let review = await Review.findById(req.params.id);

  if (!review) {
    const msg = `No review with id ${req.body.bootcamp}`;
    console.error(msg);

    return next(new ErrorResponse(msg, 404));
  }

  // Make sure belongs to user or user is admin
  if (review?.user.toString() !== req.user.id && req.user.role !== "admin") {
    const msg = `Not authorized to update this review`;
    console.error(msg);

    return next(new ErrorResponse(`Not authorized to update this review`, 403));
  }

  // Update review
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data: review });
});

// @desc        Delete review
// @route       PUT /api/v1/reviews/:id
// @access      Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  // Validate review exist
  let review = await Review.findById(req.params.id);

  if (!review) {
    const msg = `No review with id ${req.params.id}`;
    console.error(msg.yellow);

    return next(new ErrorResponse(msg, 404));
  }

  // Make sure belongs to user or user is admin
  if (review?.user.toString() !== req.user.id && req.user.role !== "admin") {
    const msg = `Not authorized to update this review`;
    console.error(msg.yellow);

    return next(new ErrorResponse(`Not authorized to update this review`, 403));
  }

  // Delete review
  await review.deleteOne();

  res.status(200).json({ success: true, data: review });
});
