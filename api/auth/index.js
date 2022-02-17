const express = require("express");
const router = express.Router();

const twilioServiceController = require("./controllers/twilioServiceController");
const userServiceController = require("./controllers/userServiceController");
const check = require("../../controllers/middlewares/check");

router.post("/sendOTP", twilioServiceController.sendOTP);

router.post(
	"/signup/verifyOTP",
	twilioServiceController.verifyOTP,
	check.requiredFields("phone", "name"),
	userServiceController.createUser,
	userServiceController.signJWT
);

router.post(
	"/login/verifyOTP",
	twilioServiceController.verifyOTP,
	check.requiredFields("phone"),
	userServiceController.getUser,
	userServiceController.signJWT
);

module.exports = router;
