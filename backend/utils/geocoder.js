const NodeGeocoder = require("node-geocoder");

// Encapsulate the configuration in a function for better structure and testability
function getGeocoderOptions() {
  // Ensure the environment variables for provider and API key are set
  if (!process.env.GEOCODER_PROVIDER || !process.env.GEOCODER_API_KEY) {
    throw new Error("Geocoder configuration is missing environment variables");
  }

  return {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: "https",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null, // Explicitly state the absence of a formatter for clarity
  };
}

// Create the geocoder instance using the options
const geocoderOptions = getGeocoderOptions();
const geocoder = NodeGeocoder(geocoderOptions);

module.exports = geocoder;
