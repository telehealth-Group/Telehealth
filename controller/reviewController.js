const Review = require("../models/reviewModel");


exports.setHospitalUserId = (req, res, next) => {
  if (!req.body.hospital) req.body.hospital = req.params.hopitalId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.setDoctorUserId = (req, res, next) => {
  if (!req.body.hospital.doctor) req.body.hospital.doctor = req.params.doctorId;
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
