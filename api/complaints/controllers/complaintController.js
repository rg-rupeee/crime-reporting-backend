const catchAsync = require("../../../utils/catchAsync");
const factory = require("../../../controllers/handlerFactory");
const Complaint = require("../../../models/Complaints");

exports.getNearbyComplaints = catchAsync(async (req, res, next) => {
	const { lat, long } = req.params;

	const complaints = await Complaint.find({
		crimeLocationCoordinates: {
			$near: {
				$geometry: {
					type: "Point",
					coordinates: [long, lat],
				},
				$maxDistance: 500000,
			},
		},
	});

	console.log(complaints);

	return res.json(complaints);
});

exports.getAllComplaints = factory.getAll(Complaint);
exports.getComplaint = factory.getOne(Complaint);
exports.createComplaint = factory.createOne(Complaint);
exports.updateComplaint = factory.updateOne(Complaint);
exports.deleteComplaint = factory.deleteOne(Complaint);
