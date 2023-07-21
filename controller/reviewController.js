const Review = require("../model/reviewModel");

exports.getAllReview = async (req, res, next) => {
  try {
    let filter={}
    if(req.params.hopitalId)filter = {tour:req.params.hospitalId}

    const reviews = await Review.find(filter);

    res.status(200).json({
      status: "success",
      result: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    return next(
      res.status(400).json({
        status: "failed",
        message: error,
      })
    );
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body,{user:req.user._id});
    res.status(200).json({
      status: "success",
      data: {
        newReview,
      },
    });
  } catch (error) {
    return next(
      res.status(400).json({
        status: "failed",
        message: error,
      })
    );
  }
};
