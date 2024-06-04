const express = require('express');
const tourController = require('./../controllers/tourController');
const authContorller = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/234hfhfhf/reviews
// GET /tour/234hfhfhf/reviews
// GET /tour/234hfhfhf/reviews/948876da

// router
//   .route('/:tourId/reviews')
//   .post(
//     authContorller.protect,
//     authContorller.restrictTo('user'),
//     reviewController.createReview
//   );

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authContorller.protect,
    authContorller.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
