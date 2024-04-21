const mongoose = require('mongoose');

const tourschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true
  },
  discription: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image cover']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    // for hiding from user
    select: false
  },
  startDates: [Date]
});
const Tour = mongoose.model('Tour', tourschema);
module.exports = Tour;
