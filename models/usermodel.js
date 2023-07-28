const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const ratingSchema = new mongoose.Schema({
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
    },
    phone: {
      type: String,
      require: [true, "Please provide a phone number"],
    },
    email: {
      type: String,
      unique: true,
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
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
      coordinates: [Number],
    },
    medicalHistory: {
      familyMedicalHistory: {
        type: String,
      },
      medications: {
        type: String,
      },
      immunizations: {
        type: String,
      },
      socialHistory: {
        type: String,
      },
      healthRiskFactors: {
        type: String,
      },
      reviewOfSystems: {
        type: String,
      },
      physicalExaminationFindings: {
        type: String,
      },
      diagnosticTestsResults: {
        type: String,
      },
      generalMedicalHistory: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin", "superAdmin"],
      default: "patient",
    },
    specialization: { type: String },
    ratings: [ratingSchema],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
  
userSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "doctor",
  localField: "_id",
});
userSchema.pre('save', async function (next) {
  // only run this function if password was actually modefied
  if (!this.isModified('password')) return next()
  // hash the password
  this.password = await bcrypt.hash(this.password, 12)
  // delete the password confirm field
  this.passwordConfirm = undefined
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
 
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
