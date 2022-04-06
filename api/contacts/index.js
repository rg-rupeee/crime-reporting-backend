const express = require("express");
const router = express.Router();

const generalContactController = require("./controllers/contactController");
const auth = require("../auth/middlewares/authMiddlewares");
const check = require("../../controllers/middlewares/check");

// no restriction
router.get("/", auth.protect, generalContactController.getAllContacts);
router.get("/:id", auth.protect, generalContactController.getContact);
router.get(
	"/nearby/:lat/:long",
	auth.protect,
	generalContactController.getNearbyContacts
);

// hq and admin role
router.post(
	"/",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	check.requiredFields(
		"stationName",
		"headName",
		"phone",
		"address",
		"coordinates"
	),
	generalContactController.createContact
);

router.patch(
	"/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	generalContactController.updateContact
);

router.delete(
	"/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	generalContactController.deleteContact
);

module.exports = router;
