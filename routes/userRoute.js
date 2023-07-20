const express = require("express");
const userController=require("../controller/userController")

const router = express.Router();


router.route('/login').post(userController.login)
router.route('/signUp').post(userController.signUp)

module.exports = router;
