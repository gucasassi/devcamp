/**
 * @desc   - Get all bootcamps controller.
 * @route  - GET /api/v1/bootcamps
 * @access - Public
 */
const getBootcamps = (req, res) => {
  res.status(200).send({ success: true, message: 'retrieve all bootcamps' });
};

/**
 * @desc   - Get single bootcamp controller.
 * @route  - GET /api/v1/bootcamps/:id
 * @access - Public
 */
const getBootcampById = (req, res) => {
  res.status(200).send({ success: true, message: `retrieve bootcamp ${req.params.id}` });
};

/**
 * @desc   - Create new bootcamp controller.
 * @route  - POST /api/v1/bootcamps
 * @access - Private
 */
const createBootcamp = (req, res) => {
  res.status(201).send({ success: true, message: 'create new bootcamp' });
};

/**
 * @desc   - Update bootcamp controller.
 * @route  - PUT /api/v1/bootcamps/:id
 * @access - Private
 */
const updateBootcamp = (req, res) => {
  res.status(200).send({ success: true, message: `update bootcamp ${req.params.id}` });
};

/**
 * @desc   - Delete bootcamp controller.
 * @route  - DELETE /api/v1/bootcamps/:id
 * @access - Private
 */
const deleteBootcamp = (req, res) => {
  res.status(200).send({ success: true, message: `delete bootcamp ${req.params.id}` });
};

// Export all controllers.
export { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp };
