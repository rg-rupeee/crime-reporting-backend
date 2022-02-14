const twilio = require("twilio");

const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

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
			// console.log(data);
			return res.json({
				status: "success",
				message: "OTP sent successfully",
				otp: data,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({ status: "fail", error: err });
		});
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
	const { phone, code } = req.body;

	if (!phone) {
		return next(new AppError("Missing Field: phone", 400));
	}

	if (!code) {
		return next(new AppError("Missing Field: code", 400));
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
				req.otp = data;
				return next();
			}
			return res.status(400).json(data);
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({ status: "fail", error: err });
		});
});
