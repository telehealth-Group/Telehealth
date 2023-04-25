const express = require("express");
const superAdminController = require("../controller/superAdminController");

const router = express.Router();

const router = express.Router()

router.route('/').get(superAdminController.getAllHospitals).post(superAdminController.createHospitals)

module.exports = router;
