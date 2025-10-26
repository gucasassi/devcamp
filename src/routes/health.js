import express from 'express';

// Create a router instance.
const router = express.Router();

// Define a route handler for GET requests to the /health URL.
router.get('/', (req, res) => {
  res.status(200).send({ success: true });
});

// Export the router to be used in index.js.
export default router;
