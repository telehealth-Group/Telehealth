const express = require("express");
const superAdminController = require("../controller/superAdminController");
const userController=require("../controller/userController")

const router = express.Router();

router.route('/deletehospital/:id').patch(superAdminController.deleteHospitals)

router.route('/hospital').get(superAdminController.getAllHospitals).post(superAdminController.createHospitals);
router.route('/hospital/:id').get(superAdminController.getHospital).patch(superAdminController.updateHospitals);

// router.route('/signup').post(superAdminController.sign)\
router.route('/login').post(userController.login)
router.route('/signUp').post(userController.signUp)

module.exports = router;
