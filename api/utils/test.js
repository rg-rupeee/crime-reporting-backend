const express = require("express");
const router = express.Router();

const auth = require("../auth/middlewares/authMiddlewares");

router.get("/", (req, res, next) => {
	res.json({
		status: "success",
		message: "Hello from server",
	});
});

router.get(
	"/admin",
	auth.protect,
	auth.restrictTo("admin"),
	(req, res, next) => {
		res.json({
			status: "success",
			message: "Hello admin",
		});
	}
);

router.get(
	"/police",
	auth.protect,
	auth.restrictTo("police"),
	(req, res, next) => {
		res.json({
			status: "success",
			message: "Hello police",
		});
	}
);

router.get("/hq", auth.protect, auth.restrictTo("hq"), (req, res, next) => {
	res.json({
		status: "success",
		message: "Hello hq",
	});
});

router.get("/user", auth.protect, auth.restrictTo("user"), (req, res, next) => {
	res.json({
		status: "success",
		message: "Hello user",
	});
});

router.get(
	"/all",
	auth.protect,
	auth.restrictTo("admin", "hq", "police", "user"),
	(req, res, next) => {
		res.json({
			status: "success",
			message: "Hello all roles",
		});
	}
);

router.get(
	"/hq-admin",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	(req, res, next) => {
		res.json({
			status: "success",
			message: "Hello hq / admin",
		});
	}
);

module.exports = router;
