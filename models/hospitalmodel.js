const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
    },
    phoneNumber: {
      type: String,
      require: [true, "Please provide a phone number"],
      minlength: 10,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Provide an email address"],
    },
    ratingAvarage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating avarage must have greater or equal to 1"],
      max: [5, "Rating avarage must have less or equal to 5"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
      },
    ],
    services: [
      {
        type: String,
        // required: [true, "Provide an services"],
      },
    ],
    specialities: [
      {
        type: String,
        // require: [true, "Provide an specialities"],
      },
    ],
    doctors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


hospitalSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "hospital",
  localField: "_id",
});


hospitalSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
})
hospitalSchema.pre(/^find/, function (next) {
  this.populate({
    path: "doctors",
  });
  next();
});

const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital;