const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
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
      day: Number``,
    },
  ],
  services: [
    {
      type: String,
      required: [true, "Provide an services"],
    },
  ],
  specialities: [
    {
      type: String,
      require: [true, "Provide an specialities"],
    },
    ],
    doctors: [{
        type: mongoose.Schema.ObjectId,
        ref:'User'
  }]
});

const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital;