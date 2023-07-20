const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
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
  doctors: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  active: {
    type: Boolean,
    default: true,
    }
});

hospitalSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
})


const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital;