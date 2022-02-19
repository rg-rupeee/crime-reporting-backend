const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: String,
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["user", "police", "hq", "admin"],
			default: "user",
		},
		AadharNo: {
			type: Number,
		},
		address: {
			type: String,
			trim: true,
		},
		homeCoordinates: {
			type: {
				type: String,
				default: "Point",
				enum: ["Point"],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		sosContacts: [
			{
				name: String,
				contact: Number,
			},
		],
		profileImage: String,
		hqRegion: {
			// only for hq users
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
