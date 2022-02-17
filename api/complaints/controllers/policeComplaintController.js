const catchAsync = require("../../../utils/catchAsync");

exports.getAssignedComplaints = catchAsync(async (req, res, next) => {
	req.query = {
		AssignedOfficer: req.user.id,
	};
	return next();
});

exports.getAssignedComplaint = catchAsync(async (req, res, next) => {});

exports.updateAssignedComplaint = catchAsync(async (req, res, next) => {});
