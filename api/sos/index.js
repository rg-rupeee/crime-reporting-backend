const express = require("express");
const router = express.Router();

const sosController = require("./controllers/sosController");
const messageController = require("./controllers/messageController");

// general and police
router.get("/", sosController.getSavedContacts);
router.post("/", sosController.addContacts);
router.delete("/", sosController.deleteContacts);
router.post("/", messageController.sendMessage);

module.exports = router;
