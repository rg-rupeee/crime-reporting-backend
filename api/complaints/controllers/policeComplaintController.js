const catchAsync = require("../../../utils/catchAsync");

exports.getAssignedComplaints = catchAsync(async (req, res, next) => {
	req.query.assignedOfficer = req.user.id;

	next();
});

exports.checkAssignedComplaint = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const complaint = await Complaint.findOne({ _id: id });

	if (
		complaint &&
		(!complaint.assignedOfficer ||
			!complaint.assignedOfficer.equals(req.user.id))
	) {
		return next(
			new AppError("Cannot access this complaint. Forbidden!!!", 400)
		);
	}

	return res.json({
		status: "success",
		data: complaint,
	});
});
