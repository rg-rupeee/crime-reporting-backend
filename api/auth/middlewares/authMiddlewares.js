const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const User = require("../../../models/User");

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(new AppError("Please Login! Unauthorized."));
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError("User belonging to this token no longer exists"));
	}

	req.user = {
		id: currentUser._id,
		phone: currentUser.phone,
		role: currentUser.role,
	};
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError("Insufficient Permissions!!!! Forbidden.", 403));
		}
		next();
	};
};
