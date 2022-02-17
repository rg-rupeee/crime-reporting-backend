const catchAsync = require("../../../utils/catchAsync");
const factory = require("../../../controllers/handlerFactory");
const Complaint = require("../../../models/Complaints");

exports.getNearbyComplaints = catchAsync(async (req, res, next) => {});

exports.getAllComplaints = factory.getAll(Complaint);
exports.getComplaint = factory.getOne(Complaint);
exports.createComplaint = factory.createOne(Complaint);
exports.updateComplaint = factory.updateOne(Complaint);
exports.deleteComplaint = factory.deleteOne(Complaint);
