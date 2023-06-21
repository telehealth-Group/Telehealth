const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    role:'patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    role:'doctor',
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  dateTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'canceled', 'completed'],
    default: 'scheduled',
  },
  confirmation: { type: Boolean, default: false },
  active: {
    type: Boolean,
    select: false,
    default: true
  }
});

appointmentSchema.pre(/^find/, function(next) {
    this.find({active: {$ne: false}})
    next()
})

appointmentSchema.pre(/^find/, function (next) {
    this.populate('patient').populate({
        path: 'user',
    })
  this.populate("doctor").populate({
    path: "user",
  });
  this.populate("hospital").populate({
    path: "hospital",
  });
    next();
})
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
