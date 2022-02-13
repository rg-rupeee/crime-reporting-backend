const express = require("express");
const router = express.Router();

const authRoutes = require("./auth/index");
const complaintRoutes = require("./complaints/index");
const contactRoutes = require("./contacts/index");
const sosRoutes = require("./sos/index");
const userRoutes = require("./users/index");
const utilRoutes = require("./utils/index");

router.get("/test", (req, res, next) => {
	res.json({
		status: "success",
		message: "Hello from server",
	});
});

router.use("/auth", authRoutes);
router.use("/complaint", complaintRoutes);
router.use("/contact", contactRoutes);
router.use("/sos", sosRoutes);
router.use("/user", userRoutes);
router.use("/util", utilRoutes);

module.exports = router;
