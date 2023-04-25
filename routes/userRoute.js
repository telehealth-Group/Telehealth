const express = require("express");
const superAdminController = require("../controller/superAdminController");

const router = express.Router();

router
  .route("/")
  .get(superAdminController.getAllHospitals)
  .post(superAdminController.createHospitals);

router
  .route("/:id")
  .get(superAdminController.getHospital)
  .patch(superAdminController.updateHospitals);

module.exports = router;
