const User = require("../models/usermodel");
const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const signtoken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signtoken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 + 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;
  res.cookie("jwt", token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and pass exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // 2) Check if user exists & pass is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    createSendToken(user, 201, res);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "logedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      res.status(400).render("error", {
        title: "You are not loged in! please login",
      })
    );
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        res.status(401).json({
          status: "failed",
          message: "The user belonging to this token does no longer exit",
        })
      );
    }
    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return next(
        res.status(401).json({
          status: "failed",
          message: "User recently changed password! please login again",
        })
      );
    }
    req.user = freshUser;
    res.locals.user = freshUser;
  } catch (error) {
    return next(
      res.status(404).render("error", {
        title: "invalid Token id",
      })
    );
  }
  next();
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "failed",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "There is no user with email this address",
    });
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetpassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      res.status(500).json({
        status: "failed",
        message: "There was an error sending the email,Try again later",
      })
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      res.status(400).json({
        status: "failed",
        message: "Token is expired",
      })
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  createSendToken("", 200, res);
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(
      res.status(401).json({
        status: "failed",
        message: "Your current password is wrong",
      })
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      res.locals.user = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};