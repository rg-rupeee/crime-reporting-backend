const catchAsync = require("../../../utils/catchAsync");

exports.sendMessage = catchAsync(async (req, res, next) => {
	return res.json({
		status: "success",
		message: "message sent succesfully",
	});
});
