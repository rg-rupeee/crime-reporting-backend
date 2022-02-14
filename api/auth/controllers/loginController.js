const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");
const twilio = require("twilio");
const { promisify } = require("util");
const User = require("../../../models/User");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// create and send otp using twilio
exports.sendOTP = catchAsync(async (req, res, next) => {
	const { phone } = req.body;

	if (!phone) {
		return next(new AppError("Missing Field: phone", 400));
	}

	const channel = "sms";

	client.verify
		.services(process.env.SERVICE_ID)
		.verifications.create({
			to: `+${phone}`,
			channel,
		})
		.then((data) => {
			console.log(data);
			return res.json(data);
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json(err);
		});
});

// verify otp at twilio then send the signed jwt to user
exports.verifyOTP = catchAsync(async (req, res, next) => {
	const { phone, code, name } = req.body;

	if (!phone) {
		return next(new AppError("Missing Field: phone", 400));
	}

	if (!code) {
		return next(new AppError("Missing Field: code", 400));
	}

	if (!name) {
		return next(new AppError("Missing Field: name", 400));
	}

	client.verify
		.services(process.env.SERVICE_ID)
		.verificationChecks.create({
			to: `+${phone}`,
			code,
		})
		.then((data) => {
			console.log(data);
			if (data.status === "approved") {
				req.user = {
					name,
					phone,
				};
				return next();
			}
			return res.json(data);
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json(err);
		});
});

exports.createUser = catchAsync(async (req, res, next) => {
	const user = await User.create({
		name: req.user.name,
		phone: req.user.phone,
	});

	return res.status(201).json({
		user,
	});
});
