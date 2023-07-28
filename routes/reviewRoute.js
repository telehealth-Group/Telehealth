const express = require("express");
const reviewController = require("../controller/reviewController");
const authController = require("../controller/authController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(
    authController.protect,
    reviewController.setTourUserId,
    reviewController.getAllReview
  )
  .post(reviewController.createReview);

reviewRouter
  .route("/:id")
  .get(
    authController.protect,
    reviewController.setTourUserId,
    reviewController.getAllReview
  )
  .post(
    authController.protect,
    reviewController.setTourUserId,
    reviewController.createReview
  );
module.exports = reviewRouter;
