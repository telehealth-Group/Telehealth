const Appointment  = require("../models/appointmentModel")

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

        res.status(200).json({
            status: true,
            results: appointments.length,
            data: {
                appointments,
            },
          });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message,
          });
    }
}

