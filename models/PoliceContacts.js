const mongoose = require("mongoose");

const policeContactSchema = new mongoose.Schema({
	stationName: {
		type: String,
		required: true,
	},
	headName: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		trim: true,
	},
	coordinates: {
		type: {
			type: String,
			default: "Point",
			enum: ["Point"],
		},
		coordinates: [Number],
		address: String,
		description: String,
	},
});

policeContactSchema.index({ coordinates: "2dsphere" });

const PoliceContact = mongoose.model("PoliceContact", policeContactSchema);

module.exports = PoliceContact;
