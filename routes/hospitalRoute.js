const express = require("express");
const hospitalController = require("../controller/hospitalController");

const router = express.Router();

router.route('/hospital/delete/:id').patch(hospitalController.deleteHospitals)

router.route('/hospital').get(hospitalController.getAllHospitals).post(hospitalController.createHospitals);
router.route('/hospital/:id').get(hospitalController.getHospital).patch(hospitalController.updateHospitals);
router.route('/hospital/createDoctor').post(hospitalController.createHospitalDoctor);
router.route('/hospital/deleteDoctor').patch(hospitalController.deleteDoctor);


router
  .route("/")
  .get(hospitalController.topHospitals, hospitalController.getAllHospitals);

router.route("/hospital-status").get(hospitalController.hospiatlStatus);

router
  .route("/hospital-within/:distance/center/:latlng/unit/:unit")
  .get(hospitalController.getHospitalwithin);

router.route("/distance/:latlng/unit/:unit").get(hospitalController.getDistances);

module.exports = router;
