const catchAsync = require("../../../utils/catchAsync");
const factory = require("../../../controllers/handlerFactory");
const Complaint = require("../../../models/Complaints");

exports.getMyComplaints = catchAsync(async (req, res, next) => {
	req.query = {
		user: req.user.id,
	};
	return next();
});

exports.getMyComplaint = catchAsync(async (req, res, next) => {});
