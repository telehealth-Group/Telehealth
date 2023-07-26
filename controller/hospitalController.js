const Hospital = require("../models/hospitalmodel");
const User = require('../models/usermodel')

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
    const hospital = await Hospital.findById(req.params.id).populate('reviews');

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
exports.createHospitalDoctor = async(req,res)=>{
    try {
        const { name, phone, email, password, specialization } = req.body;
        const newDoctor = await User.create({
            name,
            phone,
            email,
            password,
            specialization,
            role: 'doctor',
          });
    const hospital = await Hospital.findByIdAndUpdate()
        res.status(201).json({
          status: true,
          data: {
            newDoctor,
          },
        });
      } catch (error) {
        res.status(404).json({
          status: false,
          message: error.message,
        });
      }
}


exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(
      req.params,
      { isActive: false },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({
        status: false,
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      status: true,
      data: {
        doctor,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

