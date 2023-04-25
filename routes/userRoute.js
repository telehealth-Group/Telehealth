const express = require('express')
const superAdminController = require('../controller/hospitalController')

const router = express.Router()

router.route('/').post(superAdminController.createHospitals)

module.exports = router