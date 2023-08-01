const Hospital = require("../models/hospitalmodel");
const User = require('../models/usermodel')

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      .populate("reviews")
      .populate("appointments")
      .exec();
    
   
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
exports.topHospitals = (req, res, next) => {
  req.query.limit = "10";
  req.query.sort = "-ratingAvarage";
  req.query.fields = "ratingsAverage,name,services,specialities";
  next();
};

exports.getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate('reviews').populate("appointments").exec();;

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
exports.createHospitalDoctor = async (req, res) => { 
  try { 
    const { name, phone, email, password, passwordConfirm, specialization, hospitalId } = req.body; 
    const newDoctor = await User.create({ 
      name, 
      phone, 
      email, 
      password, 
      passwordConfirm, 
      specialization, 
      role: 'doctor', 
    }); 
    const updatedHospital = await Hospital.findByIdAndUpdate( 
      hospitalId, 
      { $push: { doctors: newDoctor._id } },  
      { new: true }  
    ); 
 
    res.status(201).json({ 
      status: true, 
      data: { 
        newDoctor, 
        updatedHospital, 
      }, 
    }); 
  } catch (error) { 
    console.error(error); 
    res.status(404).json({ 
      status: false, 
      message: error.message, 
    }); 
  } 
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'delete' },
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
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.hospiatlStatus = async (req, res) => {
  try {
    const stats = await Hospital.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          numTour: { $sum: 1 },
          numRating: { $sum: "$ratingsQuantity" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getHospitalwithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(
      res.status(400).json({
        status: 'failed',
        message: 'please provide latitude and longtude in the format lat,lng.',
      })
    );
  }
  const hospital = await Hospital.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    result: hospital.length,
    data: {
      hospital,
    },
  });
};

exports.getDistances = async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");
  const multiplier = unit === "mi" ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    return next(
      res.status(400).json({
        status: "failed",
        message: "please provide latitude and longtude in the format lat,lng.",
      })
    );
  }
  const distance = await Hospital.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      distance,
    },
  });
};

