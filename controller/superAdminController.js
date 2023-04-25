const Hospital = require("../models/hospitalmodel");

exports.createHospitals = async (req, res) => {
  try {
    const newHospital = await Hospital.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });

    res.status(201).json({
      status: true,
      data: {
        newHospital,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateHospitals = async (req, res) => {
  try {
    const updateHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new:true,
      runValidate:false
    })
     res.status(200).json({
       status: true,
       data: {
         updateHospital,
       },
     });
  } catch (error) {
     res.status(404).json({
       status: false,
       message: error.message,
     });
  }
}
