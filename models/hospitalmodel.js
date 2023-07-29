const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"],
      minlength: 10,
    },
    email: {
      type: String,
      required: [true, "Provide an email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlegth: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        messege: "Passwords are not the same",
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating average must be greater or equal to 1"],
      max: [5, "Rating average must be less or equal to 5"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: [true, "Please image of the hospital"],
      },
    ],
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
        // required: [true, "Provide services"],
      },
    ],
    specialities: [
      {
        type: String,
        // required: [true, "Provide specialities"],
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
    availableTimes: [
      {
        time: [
          {
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
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

hospitalSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

hospitalSchema.pre(/^find/, function (next) {
  this.populate({
    path: "doctors",
  });
  next();
});
hospitalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

hospitalSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
hospitalSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
hospitalSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
