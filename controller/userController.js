const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/usermodel");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUsersPhoto = upload.single("photo");

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(
      `client\src\assets${req.file.filename}`
    );
  next();
};

const filterObj = (obj, ...allowedfiled) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedfiled.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      res.status(400).json({
        status: "failed",
        message:
          "This route is not for password Update,pease use /updateMyPassword",
      })
    );
  }

  try {
    const filteredBody = filterObj(req.body, "name", "email", "phone", "age");
    if (req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "succuss",
    message: "account deleted",
    data: null,
  });
};


exports.updateOne = (Model) => async (req, res) => {
  try {
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      requested: req.reqtime,
      data: {
        doc,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("reviews")
      .populate("DoctorAppointments")
      .populate("PaitentAppointments")
      .exec();;
     users.forEach((element) => {
       console.log(element.DoctorAppointments);
     });
    res.status(200).json({
      status: true,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

exports.addPatients = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: true,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};
