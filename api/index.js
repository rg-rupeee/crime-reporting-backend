const express = require("express");
const router = express.Router();

const authRoutes = require("./auth/index");
const complaintRoutes = require("./complaints/index");
const contactRoutes = require("./contacts/index");
const sosRoutes = require("./sos/index");
const userRoutes = require("./users/index");
const utilRoutes = require("./utils/index");

router.get("/", (req, res, next) => {
	res.json({
		status: "success",
		message: "Hello from server",
	});
});

router.route("/auth", authRoutes);
router.route("/complaint", complaintRoutes);
router.route("/contact", contactRoutes);
router.route("/sos", sosRoutes);
router.route("/user", userRoutes);
router.route("/util", utilRoutes);

module.exports = router;
