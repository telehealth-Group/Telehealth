const express = require("express");
const userController=require("../controller/userController")
const authController=require("../controller/authController")

const router = express.Router();


router.route("/addpatients").post(
  // authController.protect,
  // authController.restrictTo("admin"),
  userController.addPatients
);
router.route('/patients').get (userController.getAllUsers)

router.route('/login').post(authController.login)
router.route('/signUp').post(authController.signUp)

router.get(
  "/logout",
  authController.protect,
  authController.logout
);

router.post(
  "/forgotpassword",
  authController.protect,
  authController.forgotPassword
);
router.patch(
  "/resetpassword/:token",
  authController.protect,
  authController.resetPassword
);

router.patch(
  "/updatemypassword",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
