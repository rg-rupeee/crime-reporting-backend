const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const uploadController = require("./controllers/uploadController");
const auth = require("../auth/middlewares/authMiddlewares");

router.use(
	fileUpload({
		useTempFiles: true,
	})
);

// all roles
router.route("/upload/image").post(auth.protect, uploadController.uploadImage);

router
	.route("/upload/images")
	.post(auth.protect, uploadController.uploadImages);

module.exports = router;
