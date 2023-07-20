const Hospital = require("../models/hospitalmodel");

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    res.status(200).json({
      status: true,
      results: hospitals.length,
      data: {
        hospitals,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    res.status(200).json({
      status: true,
      data: {
        hospital,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

exports.createHospitals = async (req, res) => {
  try {
    const newHospital = await Hospital.create(req.body);

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
    const updateHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidate: false,
      }
    );
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
};

exports.deleteHospitals = async (req, res) => {
try {
  await Hospital.findByIdAndUpdate(req.params.id, { active: false })
  res.status(200).json({
    status: true,
    message:'Hospital Deleted'
  });
} catch (error) {
  res.status(404).json({
    status: false,
    message: error.message,
  });
}
}