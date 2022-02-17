const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.requiredFields = (...Fields) => {
	return catchAsync(async (req, res, next) => {
		const bodyFields = Object.keys(req.body);
		for (const field of Fields) {
			if (!bodyFields.includes(field)) {
				return next(new AppError(`Missing Field: ${field}`, 400));
			}
		}
		next();
	});
};

exports.restrictedFields = (...Fields) => {
	return catchAsync(async (req, res, next) => {
		const bodyFields = Object.keys(req.body);
		for (const field of Fields) {
			if (bodyFields.includes(field)) {
				return next(new AppError(`Unexpected Field: ${field}`, 400));
			}
		}
		next();
	});
};
