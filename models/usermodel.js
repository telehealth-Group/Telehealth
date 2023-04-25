const mongoose = require("mongoose");

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
    required: [true, "please provide age"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "please provide your gender"],
  },
  address: {
    type: String,
    coordinates: [Number],
  },
  medicalHistory: {
    type: String,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin", "superAdmin"],
    default: "patient",
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
