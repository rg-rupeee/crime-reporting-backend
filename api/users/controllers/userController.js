const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const User = require("../../../models/User");

exports.createPoliceUser = catchAsync(async (req, res, next) => {
	if (req.body.role && req.body.role != "police") {
		return next(new AppError("Unexpected Field: role", 400));
	}

	const { name, phone, address } = req.body;

	if (!name) {
		return next(new AppError("Missing Field: name", 400));
	}

	if (!phone) {
		return next(new AppError("Missing Field: phone", 400));
	}

	const police = await User.create({
		name,
		phone,
		role: "police",
		address,
	});

	return res.status(201).json({
		status: "success",
		data: police,
	});
});

exports.createHQUser = catchAsync(async (req, res, next) => {
	if (req.body.role && req.body.role != "hq") {
		return next(new AppError("Unexpected Field: role", 400));
	}

	const { name, phone, address } = req.body;

	if (!name) {
		return next(new AppError("Missing Field: name", 400));
	}

	if (!phone) {
		return next(new AppError("Missing Field: phone", 400));
	}

	const hq = await User.create({
		name,
		phone,
		role: "hq",
		address,
	});

	return res.status(201).json({
		status: "success",
		data: hq,
	});
});

exports.deletePoliceUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const police = await User.findById(id);

	if (!police) {
		return next(new AppError("user does not exists", 400));
	}

	if (police.role != "police") {
		return next(new AppError("can delete only police user", 400));
	}

	await User.findByIdAndDelete(id);

	return res.status(201).json({
		status: "success",
	});
});

exports.deleteHQUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const hq = await User.findById(id);

	if (!hq) {
		return next(new AppError("user does not exists", 400));
	}

	if (hq.role != "hq") {
		return next(new AppError("can delete only hq user", 400));
	}

	await User.findByIdAndDelete(id);

	return res.status(201).json({
		status: "success",
	});
});

exports.getPoliceUsers = catchAsync(async (req, res, next) => {
	const role = "police";
	const users = await User.find({ role });

	return res.json({
		status: "success",
		data: users,
	});
});

exports.getHQUsers = catchAsync(async (req, res, next) => {
	const role = "hq";
	const users = await User.find({ role });

	return res.json({
		status: "success",
		data: users,
	});
});

exports.getPoliceUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("user does not exists", 400));
	}

	if (user.role != "police") {
		return next(new AppError("can get only police user", 400));
	}

	return res.json({
		status: "success",
		data: user,
	});
});

exports.getHQUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("user does not exists", 400));
	}

	if (user.role != "hq") {
		return next(new AppError("can get only hq user", 400));
	}

	return res.json({
		status: "success",
		data: user,
	});
});

exports.updatePoliceUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	if (req.body.role) {
		return next(new AppError("Unexpected Field: role", 400));
	}

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("user does not exists", 400));
	}

	if (user.role != "police") {
		return next(new AppError("can update only police user", 400));
	}

	const updated = await User.findByIdAndRemove(id, req.body);

	return res.json({
		status: "success",
		data: updated,
	});
});

exports.updateHQUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	if (req.body.role) {
		return next(new AppError("Unexpected Field: role", 400));
	}

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("user does not exists", 400));
	}

	if (user.role != "hq") {
		return next(new AppError("can update only hq user", 400));
	}

	const updated = await User.findByIdAndRemove(id, req.body);

	return res.json({
		status: "success",
		data: updated,
	});
});

exports.updateProfile = catchAsync(async (req, res, next) => {});
exports.updateAadhar = catchAsync(async (req, res, next) => {});
