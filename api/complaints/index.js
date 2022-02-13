const express = require("express");
const router = express.Router();

const generalUserComplaintController = require("./controllers/generalUserComplaintController");
const policeComplaintController = require("./controllers/policeComplaintController");
const HQandAdminComplaintController = require("./controllers/HQandAdminComplaintController");

// all role
router.get("/nearby/:lat/:long", fadjdskljfalksdjfklj);

// user role
router.post("/", generalUserComplaintController.createComplaint); //filters, sort
router.get("/me", generalUserComplaintController.getMyComplaints);
router.get("/me/:id", generalUserComplaintController.getMyComplaint);

// police role
router.get("/me/assigned", policeComplaintController.getAssignedComplaints); //filters, sort
router.get("/me/assigned/:id", policeComplaintController.getAssignedComplaint);
router.patch(
	"/me/assigned/:id",
	policeComplaintController.updateAssignedComplaint
);

// hq and admin role
router.get("/", HQandAdminComplaintController.getAllComplaints); // filters, sort
router.get("/:id", HQandAdminComplaintController.getComplaint);
router.patch("/:id", HQandAdminComplaintController.updateComplaint);

module.exports = router;
