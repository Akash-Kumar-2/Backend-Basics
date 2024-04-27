/* eslint-disable no-console */
const mongoose = require('mongoose');
const slugify = require('slugify');
// external library for validators
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      minLength: [10, 'A tour name must have a minimum lenght of 10'],
      maxLength: [40, 'A tour name must have a maximum lenght of 40']
      //custom validator from validator package
      // validate: [validator.isAlpha, ' tour name must be in alphabets only']
    },
    slug: String,
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
      required: [true, 'A tour must have a difficulty'],
      //enum is only for string
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can either be : easy ,medium or difficult'
      }
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0 '],
      max: [5, 'Rating must be below 5.0 ']
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      // custom validator
      //custum validator that we have specified
      validate: {
        validator: function(val) {
          //this keyword only works when we create new document and not when we update existing one
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be lower than price'
      }
    },
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  //to display virtual property
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// virtual Property
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

//Document MiddleWare : runs before .save() and .create() since pre keyword is used
// save method works for save and create only
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//All pre request should be before post
// tourSchema.pre('save', function(next) {
//   console.log(' Document will be saved ');
//   next();
// });
//post
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

//Query MiddleWare
// works for find only and not for other find methods like findbyid
// tourSchema.pre('find', function(next) {

// works for all find method
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(doc, next) {
  console.log(`query took ${Date.now() - this.start} ms `);
  // console.log(doc);
  next();
});

//Aggregation middleware

tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
