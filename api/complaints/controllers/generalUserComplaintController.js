const catchAsync = require("../../../utils/catchAsync");
const Complaint = require("../../../models/Complaints");
const AppError = require("../../../utils/appError");

exports.createComplaint = catchAsync(async (req, res, next) => {
	req.body.user = req.user.id;
	next();
});

exports.getMyComplaints = catchAsync(async (req, res, next) => {
	req.query.user = req.user.id;

	next();
});

exports.getMyComplaint = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const complaint = await Complaint.findOne({ _id: id });

	if (complaint && (!complaint.user || !complaint.user.equals(req.user.id))) {
		return next(
			new AppError("Cannot access this complaint. Forbidden!!!", 400)
		);
	}

	return res.json({
		status: "success",
		data: complaint,
	});
});
