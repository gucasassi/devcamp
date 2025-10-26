import express from 'express';

// Create a router instance.
const router = express.Router();

// Define a route handler for get all bootcamps.
router.get('/', (req, res) => {
  res.status(200).send({ success: true, message: 'retrieve all bootcamps' });
});

// Define a route handler for get single bootcamp.
router.get('/:id', (req, res) => {
  res.status(200).send({ success: true, message: `retrieve bootcamp ${req.params.id}` });
});

// Define a route handler for create new bootcamp.
router.post('/', (req, res) => {
  res.status(201).send({ success: true, message: 'create new bootcamp' });
});

// Define a route handler for update bootcamp.
router.put('/:id', (req, res) => {
  res.status(200).send({ success: true, message: `update bootcamp ${req.params.id}` });
});

// Define a route handler for delete bootcamp.
router.delete('/:id', (req, res) => {
  res.status(200).send({ success: true, message: `delete bootcamp ${req.params.id}` });
});

// Export the router to be used in index.js.
export default router;
