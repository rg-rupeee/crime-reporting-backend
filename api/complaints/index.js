const express = require("express");
const router = express.Router();

const generalUserComplaintController = require("./controllers/generalUserComplaintController");
const policeComplaintController = require("./controllers/policeComplaintController");
const HQandAdminComplaintController = require("./controllers/HQandAdminComplaintController");

// user role
router.post("/", generalUserComplaintController.createComplaint);
router.get("/me", generalUserComplaintController.getMyComplaints);
router.get("/me/:id", generalUserComplaintController.getMyComplaint);

// police role
router.get("/me/assigned", policeComplaintController.getAssignedComplaints);
router.get("/me/assigned/:id", policeComplaintController.getAssignedComplaint);
router.patch(
	"/me/assigned/:id",
	policeComplaintController.updateAssignedComplaint
);

// hq and admin role
router.get("/", HQandAdminComplaintController.getAllComplaints);
router.get("/:id", HQandAdminComplaintController.getComplaint);
router.patch("/:id", HQandAdminComplaintController.updateComplaint);

module.exports = router;
