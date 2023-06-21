const express = require('express')
const appointmentController = require('../controller/appointmentController')

const router = express.Router()

router.route('/getAllAppointemts').get(appointmentController.getAllAppointments)

module.exports = router