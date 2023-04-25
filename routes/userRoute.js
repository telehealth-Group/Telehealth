const express = require('express')
const superAdminController = require('../controller/superAdminController')

const router = express.Router()

router.route('/').post(superAdminController.createHospitals)

module.exports = router