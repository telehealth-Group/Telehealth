const express = require('express')
const appointmentController = require('../controller/appointmentController')
const authController = require("../controller/authController")

const router = express.Router()

router.route('/getAllAppointemts').get(appointmentController.getAllAppointments)
router.route('/updateAppointment').patch(appointmentController.updateAppointment)
router.route('/createAppointment').post(appointmentController.createAppointment)
router.route('/completeAppointment').patch(appointmentController.completAppointment)
router.route('/cancelAppointment').patch(appointmentController.cancleAppointment)

module.exports = router