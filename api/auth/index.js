const express = require("express");
const router = express.Router();

const loginController = require("./controllers/loginController");
const signupController = require("./controllers/signupController");

router.post("/login/sendOTP", loginController.sendOTP);
router.post("/login/verifyOTP", loginController.verifyOTP);

router.post("/signup/sendOTP", signupController.sendOTP);
router.post("/signup/verifyOTP", signupController.verifyOTP);

module.exports = router;
