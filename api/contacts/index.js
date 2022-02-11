const express = require("express");
const router = express.Router();

const HQandAdminContactController = require("./controllers/HQandAdminContactsController");
const generalContactController = require("./controllers/generalContactController");

// no restriction
router.get("/", generalContactController.getAllContacts);
router.get("/:id", generalContactController.getContact);
router.get("/nearby/:lat/:long", generalContactController.getNearbyContacts);

// hq and admin role
router.post("/", HQandAdminContactController.createContact);

router.patch("/:id", HQandAdminContactController.updateContact);
router.delete("/:id", HQandAdminContactController.deleteContact);

module.exports = router;
