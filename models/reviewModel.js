const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    hospital: {
      type: mongoose.Schema.ObjectId,
      ref: "Hospital",
      require: [true, "Review must belong to a hospital"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewschema.pre(/^find/, function (next) {
  this.populate({
    path: "hospital",
    select: "title",
  }).populate({
    path: "user",
    select: "name image",
  });
  next();
});

const Review = mongoose.model("Review", reviewschema);

module.exports = Review;
