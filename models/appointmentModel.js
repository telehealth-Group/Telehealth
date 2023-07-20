const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    role: "patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    role: "doctor",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  dateTime: { type: Date, default: Date.now(), required: true },
  status: {
    type: String,
    enum: ["scheduled", "canceled", "completed"],
    default: "scheduled",
  },
  confirmation: { type: Boolean, default: false },
});

appointmentSchema.pre(/^find/, function(next) {
    this.find({status: {$ne: 'canceled'}})
    next()
})

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "patient",
    select: "name phone email age gender medicalHistory",
  })
    .populate({
      path: "doctor",
      select: "name ratings specialization",
    })
    .populate({
      path: "hospital",
      select: "name phoneNumber locations",
    });
  next();
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
