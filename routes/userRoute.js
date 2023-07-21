const express = require("express");
const userController=require("../controller/userController")
const authController=require("../controller/authController")

const router = express.Router();


router.route('/login').post(userController.login)
router.route('/signUp').post(userController.signUp)
router.route('/addpatients').post(userController.addPatients)
router.route('/patients').get (userController.getAllUsers)

router.route('/logins').post(authController.login)
router.route('/signUps').post(authController.signUp)

module.exports = router;
