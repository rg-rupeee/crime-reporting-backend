const express = require("express");
const router = express.Router();

const messageController = require("./controllers/messageController");
const auth = require("../auth/middlewares/authMiddlewares");
const check = require("../../controllers/middlewares/check");

// general and police
router.post(
	"/sendmessage",
	auth.protect,
	auth.restrictTo("user", "police"),
	check.requiredFields("message", "phone"),
	messageController.sendMessage
);

module.exports = router;
