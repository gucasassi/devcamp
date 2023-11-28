// @desc        Helth check
// @route       GET /health
// @access      Public
exports.healthCheck = (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  res.status(200).json(healthcheck);
};
