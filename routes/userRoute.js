const express = require("express");
const userController=require("../controller/userController")
const authController=require("../controller/authController")

const router = express.Router();


// router.route('/login').post(userController.login)
// router.route('/signUp').post(userController.signUp)
router.route('/addpatients').post(userController.addPatients)
router.route('/patients').get (userController.getAllUsers)

router.route('/login').post(authController.login)
router.route('/signUp').post(authController.signUp)

router.get('/logout', authController.logout);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.patch(
  "/updatemypassword",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
