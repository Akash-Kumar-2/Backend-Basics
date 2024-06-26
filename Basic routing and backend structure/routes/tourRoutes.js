const express = require('express');

const tourController = require('./../controllers/tourControllers');

const router = express.Router();

// param middleware

// router.param('id', tourController.checkID);
router
  .route('/top-5-cheaps')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
//   .post(tourController.checkBody, tourController.createTour);
// above we have done chaining of 2 middleware

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
