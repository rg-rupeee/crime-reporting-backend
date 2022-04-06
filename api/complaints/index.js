const express = require("express");
const router = express.Router();

const generalUserComplaintController = require("./controllers/generalUserComplaintController");
const policeComplaintController = require("./controllers/policeComplaintController");
const complaintController = require("./controllers/complaintController");
const auth = require("../auth/middlewares/authMiddlewares");
const check = require("../../controllers/middlewares/check");

// all role
router.get("/nearby/:lat/:long", complaintController.getNearbyComplaints);
router.get("/all", complaintController.getAllComplaints);

// police role
router.get(
	"/me/assigned/:id",
	auth.protect,
	auth.restrictTo("police"),
	policeComplaintController.checkAssignedComplaint,
	complaintController.getComplaint
);
router.get(
	"/me/assigned",
	auth.protect,
	auth.restrictTo("police"),
	policeComplaintController.getAssignedComplaints,
	complaintController.getAllComplaints
);
router.patch(
	"/me/assigned/:id",
	auth.protect,
	auth.restrictTo("police"),
	check.restrictedFields(
		"title",
		"description",
		"user",
		"crimeLocation",
		"crimeLocationCoordinates",
		"images",
		"assignedOfficer"
	),
	check.requiredFields("status"),
	policeComplaintController.checkAssignedComplaint,
	complaintController.updateComplaint
);

// user role
router.post(
	"/",
	auth.protect,
	auth.restrictTo("user"),
	check.restrictedFields("assignedOfficer", "headquater", "status"),
	check.requiredFields(
		"title",
		"description",
		"crimeLocation",
		"crimeLocationCoordinates"
	),
	generalUserComplaintController.createComplaint,
	complaintController.createComplaint
);
router.get(
	"/me",
	auth.protect,
	auth.restrictTo("user"),
	generalUserComplaintController.getMyComplaints,
	complaintController.getAllComplaints
);
router.get(
	"/me/:id",
	auth.protect,
	auth.restrictTo("user"),
	generalUserComplaintController.getMyComplaint,
	complaintController.getComplaint
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
	check.restrictedFields(
		"title",
		"description",
		"user",
		"crimeLocation",
		"crimeLocationCoordinates",
		"images"
	),
	complaintController.updateComplaint
);

module.exports = router;
