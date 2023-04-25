const express = require('express')
const superAdminController = require('../controller/superAdminController')

const router = express.Router()

router.route('/').post(superAdminController.createHospitals)

router.route('/:id').patch(superAdminController.updateHospitals)

module.exports = router