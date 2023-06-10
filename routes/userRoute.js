const express = require("express");
const superAdminController = require("../controller/superAdminController");
const userController = require("../controller/userController")
const authController = require('../controller/authController')

const router = express.Router();

router.route('/deletehospital/:id').patch(superAdminController.deleteHospitals)

router.route('/hospital').get(superAdminController.getAllHospitals).post(superAdminController.createHospitals);
router.route('/hospital/:id').get(superAdminController.getHospital).patch(superAdminController.updateHospitals);

// router.route('/signup').post(superAdminController.sign)\
router.route('/login').post(authController.login)
router.route('/signUp').post(authController.signUp)

module.exports = router;
