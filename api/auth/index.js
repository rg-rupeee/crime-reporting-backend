const express = require("express");
const router = express.Router();

const twilioServiceController = require("./controllers/twilioServiceController");
const userServiceController = require("./controllers/userServiceController");

router.post("/sendOTP", twilioServiceController.sendOTP);

router.post(
	"/signup/verifyOTP",
	twilioServiceController.verifyOTP,
	userServiceController.createUser,
	userServiceController.signJWT
);

router.post(
	"/login/verifyOTP",
	twilioServiceController.verifyOTP,
	userServiceController.getUser,
	userServiceController.signJWT
);

module.exports = router;
