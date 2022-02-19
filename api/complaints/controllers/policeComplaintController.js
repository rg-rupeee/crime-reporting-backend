const catchAsync = require("../../../utils/catchAsync");
const Complaint = require("../../../models/Complaints");
const AppError = require("../../../utils/appError");

exports.getAssignedComplaints = catchAsync(async (req, res, next) => {
	req.query.assignedOfficer = req.user.id;

	next();
});

exports.checkAssignedComplaint = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const complaint = await Complaint.findOne({ _id: id });

	console.log(complaint);

	if (
		!complaint ||
		!complaint.assignedOfficer ||
		!complaint.assignedOfficer.equals(req.user.id)
	) {
		return next(
			new AppError("Cannot access this complaint. Forbidden!!!", 400)
		);
	}

	next();
});
