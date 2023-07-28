const express = require("express");
const hospitalController = require("../controller/hospitalController");
const authController = require('../controller/authController')

const router = express.Router();

router
  .route("/hospital/delete/:id")
  .patch(
    authController.protect,
    authController.restrictTo("superAdmin"),
    hospitalController.deleteHospitals
  );

router
  .route("/hospital")
  .get(hospitalController.getAllHospitals)
  .post(
    authController.protect,
    authController.restrictTo("superAdmin"),
    hospitalController.createHospitals
  );
router
  .route("/hospital/:id")
  .get(hospitalController.getHospital)
  .patch(
    authController.protect,
    authController.restrictTo("superAdmin admin"),
    hospitalController.updateHospitals
  );
router
  .route("/hospital/createDoctor")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    hospitalController.createHospitalDoctor
  );
router
  .route("/hospital/deleteDoctor/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    hospitalController.deleteDoctor
  );


router
  .route("/top-10-hospital")
  .get(hospitalController.topHospitals, hospitalController.getAllHospitals);

router.route("/hospital-status").get(hospitalController.hospiatlStatus);

router
  .route("/hospital-within/:distance/center/:latlng/unit/:unit")
  .get(hospitalController.getHospitalwithin);

router.route("/distance/:latlng/unit/:unit").get(hospitalController.getDistances);

module.exports = router;
