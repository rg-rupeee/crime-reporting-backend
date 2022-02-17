const express = require("express");
const router = express.Router();

const contactController = require("./controllers/HQandAdminContactsController");
const generalContactController = require("./controllers/contactController");
const auth = require("../auth/middlewares/authMiddlewares");

// no restriction
router.get("/", generalContactController.getAllContacts);
router.get("/:id", generalContactController.getContact);
router.get("/nearby/:lat/:long", generalContactController.getNearbyContacts);

// hq and admin role
router.post(
	"/",
	auth.protect,
	auth.restrictTo("hq", "admin"),
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
