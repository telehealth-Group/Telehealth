const Appointment  = require("../models/appointmentModel")

exports.createAppointment = async (req, res,next) => {
     try {
       const newAppointment = await Appointment.create(req.body);
       res.status(201).json({
         status: "succuess",
         data: {
           newAppointment,
         },
       });
     } catch (error) {
       next(
         res.status(404).json({
           status: "failed",
           message: error,
         })
       );
     }
}
exports.getAllAppointments = async (req, res) =>{
    try {
        const appointments = await Appointment.find()

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

exports.updateAppointment = async (req, res) => {
   try {
     const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true,
     });
     res.status(200).json({
       status: "succuess",
       data: {
         appointment,
       },
     });
   } catch (error) {
     res.status(404).json({
       status: "failed",
       message: error,
     });
   }
}
exports.cancleAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: "canceled" },{
       new: true,
       runValidators: true,
     });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return next(
      res.status(400).json({
        status: "failed",
        message: error,
      })
    );
  }
};
exports.completAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return next(
      res.status(400).json({
        status: "failed",
        message: error,
      })
    );
  }
};