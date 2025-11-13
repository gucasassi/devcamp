import slugify from 'slugify';
import mongoose from 'mongoose';
import geocoder from '../utils/geocoder.js';

// Define the Bootcamp schema for MongoDB.
const BootcampSchema = new mongoose.Schema(
  {
    // Name of the bootcamp.
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    // URL-friendly identifier for the bootcamp.
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [50, 'Slug can not be more than 50 characters'],
    },
    // Description of the bootcamp.
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    // Website URL of the bootcamp.
    website: {
      type: String,
      required: [true, 'Please add a website URL'],
      match: [/https?:\/\/(www\.)?[a-z0-9]+\.[a-z]{2,}/, 'Please use a valid URL with HTTP or HTTPS'],
    },
    // Contact phone number.
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      maxlength: [20, 'Phone number can not be more than 20 characters'],
    },
    // Contact email address.
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please use a valid email address'],
    },
    // Physical address of the bootcamp.
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    // GeoJSON location data.
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
      // Additional address details.
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    // Array of career paths offered by the bootcamp.
    careers: {
      type: [String],
      required: true,
      enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
    },
    // Average rating for the bootcamp.
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating can not be more than 10'],
    },
    // Average cost of attending the bootcamp.
    averageCost: Number,
    // Photo filename for the bootcamp.
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    // Whether housing is available.
    housing: {
      type: Boolean,
      default: false,
    },
    // Whether job assistance is provided.
    jobsAssistance: {
      type: Boolean,
      default: false,
    },
    // Whether job guarantee is provided.
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    // Whether GI Bill is accepted.
    acceptGi: {
      type: Boolean,
      default: false,
    },
    // Timestamp of creation.
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  // Enable virtuals in JSON and Object outputs.
  // This allows for fields that are not stored in MongoDB to be included in responses.
  // For example, we can create a virtual field for courses associated with the bootcamp.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Create a slug from the bootcamp name before saving.
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

BootcampSchema.pre('save', async function (next) {
  // Geocode the address to get location data.
  const loc = await geocoder.geocode(this.address);

  // Set the location field with the geocoded data.
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  next();
});

// Cascade delete courses when a bootcamp is deleted.
// NOTE: Using deleteOne with { document: true, query: false } to ensure middleware is triggered.
BootcampSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await this.model('Course').deleteMany({ bootcamp: this._id });
  next();
});

// Virtual populate for courses.
BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false,
});

// Export the Bootcamp model.
export default mongoose.model('Bootcamp', BootcampSchema);
