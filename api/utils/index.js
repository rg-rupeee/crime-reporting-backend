const express = require("express");
const router = express.Router();

const uploadController = require("./controllers/uploadController");

// all roles
router.post("/upload/image", uploadController.uploadImage);

module.exports = router;
