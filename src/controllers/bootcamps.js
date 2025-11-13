import Bootcamp from '../models/Bootcamp.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/error-response.js';
import geocoder from '../utils/geocoder.js';

/**
 * @desc   - Get all bootcamps controller.
 * @route  - GET /api/v1/bootcamps
 * @access - Public
 */
const getBootcamps = asyncHandler(async (req, res) => {
  // Copy req.query to manipulate.
  const reqQuery = { ...req.query };

  // Remove fields not for filtering.
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string with operators.
  // Note: This part can be replaced with mongoose-query-parser for more complex parsing.
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|nin)\b/g, (match) => `$${match}`);

  // Build the query with population of courses.
  let query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // Select specific fields if requested.
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort results if requested.
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // Default sort by creation date descending.
    query = query.sort('-createdAt');
  }

  // Pagination setup.
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;

  // Calculate the number of documents to skip.
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  // Apply pagination to the query.
  query = query.skip(startIndex).limit(limit);

  // Prepare pagination result.
  const pagination = {};

  // Check for next page, if there are more results.
  // Add next and previous page info to pagination object.
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  // Check for previous page, if not on the first page.
  // Add previous page info to pagination object.
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  // Execute the query to get bootcamps.
  const bootcamps = await query;

  // Return the list of bootcamps.
  res.status(200).send({ success: true, count: bootcamps.length, pagination, data: bootcamps });
});

/**
 * @desc   - Get single bootcamp controller.
 * @route  - GET /api/v1/bootcamps/:id
 * @access - Public
 */
const getBootcampById = asyncHandler(async (req, res, next) => {
  // Find requested bootcamp.
  const bootcamp = await Bootcamp.findById(req.params.id);

  // If bootcamp not found, return 404.
  if (!bootcamp) {
    // Pass errors to middleware.
    return next(new ErrorResponse(`No bootcamp found with the provided id: '${req.params.id}'.`, 404));
  }

  // Return the found bootcamp.
  res.status(200).send({ success: true, data: bootcamp });
});

/**
 * @desc   - Create new bootcamp controller.
 * @route  - POST /api/v1/bootcamps
 * @access - Private
 */
const createBootcamp = asyncHandler(async (req, res) => {
  // Create new bootcamp in the database.
  const bootcamp = await Bootcamp.create(req.body);

  // Return the created bootcamp.
  res.status(201).send({ success: true, data: bootcamp });
});

/**
 * @desc   - Update bootcamp controller.
 * @route  - PUT /api/v1/bootcamps/:id
 * @access - Private
 */
const updateBootcamp = asyncHandler(async (req, res, next) => {
  // Update requested bootcamp with new data.
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // If bootcamp not found, return 404.
  if (!bootcamp) {
    // Pass errors to middleware.
    return next(new ErrorResponse(`No bootcamp found with the provided id: '${req.params.id}'.`, 404));
  }

  // Return the updated bootcamp.
  res.status(200).send({ success: true, data: bootcamp });
});

/**
 * @desc   - Delete bootcamp controller.
 * @route  - DELETE /api/v1/bootcamps/:id
 * @access - Private
 */
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  // Delete requested bootcamp.
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  // If bootcamp not found, return 404.
  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp found with the provided id: '${req.params.id}'.`, 404));
  }

  // Return success message.
  res.status(200).send({ success: true, data: {} });
});

/**
 * @desc   - Get bootcamps within a radius controller.
 * @route  - GET /api/v1/bootcamps/radius?zipcode=:zipcode&distance=:distance
 * @access - Private
 */
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  // Extract zipcode and distance from query parameters.
  const { zipcode, distance = 10 } = req.query;

  // Validate presence of zipcode.
  if (!zipcode) {
    return next(new ErrorResponse('Please provide a zipcode.', 400));
  }

  // Get latitude/longitude from geocoder.
  const loc = await geocoder.geocode(zipcode);

  // Extract latitude, longitude and calculate radius.
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  const radius = distance / 3963; // Radius in radians (Earth radius = 3963 miles)

  // Find bootcamps within calculated radius.
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  // Return the list of bootcamps found within the radius.
  res.status(200).send({ success: true, count: bootcamps.length, data: bootcamps });
});

// Export all controllers.
export { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius };
