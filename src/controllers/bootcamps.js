import slugify from 'slugify';
import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/error-response.js';

/**
 * @desc   - Get all bootcamps controller.
 * @route  - GET /api/v1/bootcamps
 * @access - Public
 */
const getBootcamps = async (req, res) => {
  // Retrieve all bootcamps from the database.
  const bootcamps = await Bootcamp.find().catch((err) => {
    return res.status(400).send({ success: false, error: err.message });
  });

  // Return the list of bootcamps.
  res.status(200).send({ success: true, count: bootcamps.length, data: bootcamps });
};

/**
 * @desc   - Get single bootcamp controller.
 * @route  - GET /api/v1/bootcamps/:id
 * @access - Public
 */
const getBootcampById = async (req, res, next) => {
  try {
    // Find requested bootcamp.
    const bootcamp = await Bootcamp.findById(req.params.id);

    // If bootcamp not found, return 404.
    if (!bootcamp) {
      // Pass errors to middleware.
      return next(new ErrorResponse(`No bootcamp found with the provided id: '${req.params.id}'.`, 404));
    }

    // Return the found bootcamp.
    res.status(200).send({ success: true, data: bootcamp });
  } catch (err) {
    // Pass errors to middleware.
    next(err);
  }
};

/**
 * @desc   - Create new bootcamp controller.
 * @route  - POST /api/v1/bootcamps
 * @access - Private
 */
const createBootcamp = async (req, res, next) => {
  try {
    // Generate slug from bootcamp name.
    const slug = slugify(req.body.name, { lower: true });

    // Create new bootcamp in the database.
    const bootcamp = await Bootcamp.create({ ...req.body, slug });

    // Return the created bootcamp.
    res.status(201).send({ success: true, data: bootcamp });
  } catch (err) {
    // Pass errors to middleware.
    next(err);
  }
};

/**
 * @desc   - Update bootcamp controller.
 * @route  - PUT /api/v1/bootcamps/:id
 * @access - Private
 */
const updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    // Pass errors to middleware.
    next(err);
  }
};

/**
 * @desc   - Delete bootcamp controller.
 * @route  - DELETE /api/v1/bootcamps/:id
 * @access - Private
 */
const deleteBootcamp = async (req, res, next) => {
  try {
    // Delete requested bootcamp.
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    // If bootcamp not found, return 404.
    if (!bootcamp) {
      return next(new ErrorResponse(`No bootcamp found with the provided id: '${req.params.id}'.`, 404));
    }

    // Return success message.
    res.status(200).send({ success: true, data: {} });
  } catch (err) {
    // Pass errors to middleware.
    next(err);
  }
};

// Export all controllers.
export { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp };
