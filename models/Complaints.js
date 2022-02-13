const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		crimeLocation: {
			type: String,
			trim: true,
		},
		crimeLocationCoordinates: {
			type: {
				type: String,
				default: "Point",
				enum: ["Point"],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		images: [String],
		complaintStatus: {
			type: String,
			enum: ["Filed", "In Progress", "Closed"],
		},
		AssignedOfficer: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		headquater: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
