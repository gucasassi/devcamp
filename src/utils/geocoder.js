// Ensure environment variables are loaded before using geocoder.
import 'dotenv/config';
import NodeGeocoder from 'node-geocoder';

/**
 * Geocoder configuration options.
 * @typedef {Object} GeocoderOptions
 * @property {string} provider - The geocoding service provider (e.g., 'google', 'mapquest').
 * @property {string} httpAdapter - The HTTP adapter to use ('https' recommended).
 * @property {string} apiKey - The API key for the geocoding service.
 * @property {?string} formatter - Optional formatter for the geocoding results.
 */
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

/**
 * Initializes a geocoder instance using the specified options.
 * @param {GeocoderOptions} options - The geocoder configuration options.
 * @returns {NodeGeocoder} The initialized geocoder instance.
 */
const geocoder = NodeGeocoder(options);

/**
 * Geocoder utility for converting addresses to geographic coordinates and vice versa.
 * @module geocoder
 * @type {Object}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export}
 */
export default geocoder;
