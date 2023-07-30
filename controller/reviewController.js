const Review = require("../models/reviewModel");

exports.setTourUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReview = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.hopitalId) filter = { hospital: req.params.hospitalId };

    const reviews = await Review.find(filter);

    res.status(200).json({
      status: "success",
      result: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newReview,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};
