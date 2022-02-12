const express = require("express");
const router = express.Router();

const createUserController = require("./controllers/createUserController");
const updateUserController = require("./controllers/updateUserController");

// hq role
router.post("/create/police", createUserController.createPoliceUser);

// admin role
router.post("/create/hq", createUserController.createHQUser);

// all
router.patch("/update/me", updateUserController.updateProfile);
router.patch("/update/me/aadahar", updateUserController.addAadhar);

module.exports = router;
