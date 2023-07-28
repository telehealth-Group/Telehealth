const express = require('express')
const appointmentController = require('../controller/appointmentController')
const authController = require("../controller/authController")

const router = express.Router()

router.route('/appointments').get(appointmentController.getAllAppointments)
router.route('/updateAppointment/:id').patch(appointmentController.updateAppointment)
router
  .route("/createAppointment/:id")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    appointmentController.createAppointment
  );
router
  .route("/completeAppointment/:id")
  .patch(
    authController.protect,
    authController.restrictTo("doctor"),
    appointmentController.completAppointment
  );
router
  .route("/cancelAppointment/:id")
  .patch(appointmentController.cancleAppointment);

module.exports = router