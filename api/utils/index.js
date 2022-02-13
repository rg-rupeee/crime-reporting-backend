const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const uploadController = require("./controllers/uploadController");

router.use(
	fileUpload({
		useTempFiles: true,
	})
);

// all roles
router.route("/upload/image").post(uploadController.uploadImage);

router.route("/upload/images").post(uploadController.uploadImages);

module.exports = router;
