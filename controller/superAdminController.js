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
