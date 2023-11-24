const express = require("express");

// Create an express app.
const app = express();

// Define a route handler just for test
app.get("/", (req, res) => {
  res.send("Hi there!");
});

// Start the server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
