const express = require('express')
const appointmentController = require('../controller/appointmentController')

const router = express.Router()

router.route('/getAllAppointemts').get(appointmentController.getAllAppointments)
router.route('/updateAppointment').patch(appointmentController.updateAppointment)
router.route('/createAppointment').post(appointmentController.createAppointment)

module.exports = router