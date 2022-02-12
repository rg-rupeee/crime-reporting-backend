const express = require("express");
const router = express.Router();

const loginController = require("./controllers/loginController");
const signupController = require("./controllers/signupController");
const forgetPasswordController = require("./controllers/forgetPasswordController");

router.post("/login/sendOTP", loginController.sendOTP);
router.post("/login/verifyOTP", loginController.verifyOTP);

router.post("/signup/sendOTP", signupController.sendOTP);
router.post("/signup/verifyOTP", signupController.verifyOTP);

router.post("/forgetPassword/sendOTP", forgetPasswordController.sendOTP);
router.post("/forgetPassword/verifyOTP", forgetPasswordController.verifyOTP);

module.exports = router;
