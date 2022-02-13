const cloudinary = require("cloudinary").v2;
const catchAsync = require("../../../utils/catchAsync");

exports.uploadImage = catchAsync(async (req, res) => {
	console.log(req.files);
	const file = req.files.image;

	const result = await cloudinary.uploader.upload(file.tempFilePath);

	return res.json({
		succes: true,
		result,
	});
});

exports.uploadImages = catchAsync(async (req, res) => {
	console.log(req.files);
	const files = req.files.images;

	const result = [];
	for (const file of files) {
		const res = await cloudinary.uploader.upload(file.tempFilePath);
		result.push(res);
	}

	return res.json({
		succes: true,
		result,
	});
});
