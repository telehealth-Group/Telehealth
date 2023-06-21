const express = require('express')
const appointmentController = require('../controller/appointmentController')

const router = express.Router()

router.route('/getAllAppointemts').get(appointmentController.getAllAppointments)
router.route('/updateAppointment').patch(appointmentController.updateAppointment)
router.route('/createAppointment').post(appointmentController.createAppointment)
router.route('/completeAppointment').post(appointmentController.completAppointment)
router.route('/cancelAppointment').post(appointmentController.cancleAppointment)

module.exports = router