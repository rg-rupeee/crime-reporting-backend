const express = require("express");
const router = express.Router();

const generalUserComplaintController = require("./controllers/generalUserComplaintController");
const policeComplaintController = require("./controllers/policeComplaintController");
const complaintController = require("./controllers/complaintController");
const auth = require("../auth/middlewares/authMiddlewares");

// all role
router.get("/nearby/:lat/:long", complaintController.getNearbyComplaints);

// user role
router.post(
	"/",
	auth.protect,
	auth.restrictTo("user"),
	complaintController.createComplaint
);
router.get(
	"/me",
	auth.protect,
	auth.restrictTo("user"),
	generalUserComplaintController.getMyComplaint,
	complaintController.getAllComplaints
);
router.get(
	"/me/:id",
	auth.protect,
	auth.restrictTo("user"),
	generalUserComplaintController.getMyComplaint
);

// police role
router.get(
	"/me/assigned",
	auth.protect,
	auth.restrictTo("police"),
	complaintController.getAllComplaints
);
router.get(
	"/me/assigned/:id",
	auth.protect,
	auth.restrictTo("police"),
	policeComplaintController.getAssignedComplaint
);
router.patch(
	"/me/assigned/:id",
	auth.protect,
	auth.restrictTo("police"),
	policeComplaintController.updateAssignedComplaint,
	complaintController.updateComplaint
);

// hq and admin role
router.get(
	"/",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	complaintController.getAllComplaints
);
router.get(
	"/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	complaintController.getComplaint
);
router.patch(
	"/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	complaintController.updateComplaint
);

module.exports = router;
