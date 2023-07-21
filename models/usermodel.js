const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const ratingSchema = new mongoose.Schema({
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
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
    required: [true, "please provide a password"],
  },
  passwordConfirmaton: {
    type: String,
  },
  age: {
    type: Number,
    // required: [true, "please provide age"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    // required: [true, "please provide your gender"],
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

const User = mongoose.model("User", userSchema);

module.exports = User;
