const jwt = require("jsonwebtoken");

const catchAsync = require("../../../utils/catchAsync");
const User = require("../../../models/User");
const AppError = require("../../../utils/appError");

exports.createUser = catchAsync(async (req, res, next) => {
	let user = await User.findOne({ phone: req.body.phone });

	if (!user) {
		user = await User.create({
			name: req.body.name,
			phone: req.body.phone,
			role: "user",
		});
		req.newUser = true;
	}

	req.user = user;

	return next();
});

exports.getUser = catchAsync(async (req, res, next) => {
	const { phone } = req.body;

	const user = await User.findOne({ phone });

	if (!user) {
		return next(new AppError("User does not exist! Please signup.", 400));
	}

	req.user = user;
	return next();
});

exports.signJWT = catchAsync(async (req, res, next) => {
	const token = jwt.sign(
		{ id: req.user._id, phone: req.user.phone },
		process.env.JWT_SECRET
	);

	const status = req.newUser ? 201 : 200;
	const message = req.newUser
		? "OTP Verified! User created successfully"
		: "OTP Verified! User exists";

	return res.status(status).json({
		status: "success",
		message,
		token,
		user: req.user,
		otp: req.otp,
	});
});
