const express = require("express");
const reviewController = require("../controller/reviewController");
const authController = require("../controller/authController");

const reviewRouter = express.Router({mergeParams:true});

reviewRouter
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.getAllReview
  )
  .post(reviewController.createReview);
 
reviewRouter
  .route("/:id")
  .get(reviewController.getAllReview)
  .post(
    reviewController.createReview
  );
module.exports = reviewRouter;
