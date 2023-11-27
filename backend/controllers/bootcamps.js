// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get all bootcamps` });
};

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get bootcamp with id ${req.params.id}` });
};

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `create new bootcamp` });
};

// @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update bootcamp with id ${req.params.id}` });
};

// @desc        Delete bootcamp
// @route       DEL /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `delete bootcamp with id ${req.params.id}` });
};
