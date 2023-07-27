const mongoose = require("mongoose");
const Hospital = require('./hospitalmodel')

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    hospital: {
      type: mongoose.Schema.ObjectId,
      ref: "Hospital",
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      role: "doctor",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      role: "patient",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
reviewSchema.index({ hospital : 1, user: 1 }, { unique: true });


reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  })
    .populate({
      path: "doctor",
      select: "name specialization",
    })
    .populate({
      path: "hospital",
      select: "name phoneNumber locations",
    });
  next();
});
reviewSchema.statics.calcAvarageRatings = async function (hospitalId) {
  const stats = await this.aggregate([
    {
      $match: { hospital: hospitalId },
    },
    {
      $group: {
        _id: "$hospital",
        nRating: { $sum: 1 },
        avgRating: { $avg: "rating" },
      },
    },
  ]);
  Hospital.findByIdAndUpdate(hospitalId, {
    ratingsQuantity: 0,
    ratingsAvarage: 4.5,
  });
};

reviewSchema.pre("save", function (next) {
  this.constructor.calcAvarageRatings(this.hospital);
  next();
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r.constructor.calcAvarageRatings(this.r.hospital);
  next();
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
