const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const User = require("../../../models/User");
const factory = require("../../../controllers/handlerFactory");

exports.preCreatePoliceUser = catchAsync(async (req, res, next) => {
	req.body.role = "police";
	next();
});
exports.createPoliceUser = factory.createOne(User);

exports.preCreateHQUser = catchAsync(async (req, res, next) => {
	req.body.role = "hq";
	next();
});
exports.createHQUser = factory.createOne(User);

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

	return res.status(200).json({
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

	return res.status(200).json({
		status: "success",
	});
});

exports.preGetPoliceUsers = catchAsync(async (req, res, next) => {
	req.query = {
		role: "police",
	};

	next();
});
exports.getPoliceUsers = factory.getAll(User);

exports.preGetHQUsers = catchAsync(async (req, res, next) => {
	req.query = {
		role: "hq",
	};

	next();
});
exports.getHQUsers = factory.getAll(User);

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

	const updated = await User.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

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

	const updated = await User.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	return res.json({
		status: "success",
		data: updated,
	});
});

exports.preGetUsers = catchAsync(async (req, res, next) => {
	req.query = {
		role: "user",
	};
	next();
});
exports.getUsers = factory.getAll(User);

exports.getUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("user does not exists", 400));
	}

	if (user.role != "user") {
		return next(new AppError("can get only normal user", 400));
	}

	return res.json({
		status: "success",
		data: user,
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	console.log(req.body);
	const updated = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});

	return res.json({
		status: "success",
		data: updated,
	});
});

exports.getMe = catchAsync(async (req, res, next) => {
	const { id } = req.user;

	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("user does not exists", 400));
	}

	return res.json({
		status: "success",
		data: user,
	});
});

exports.getAllUsers = factory.getAll(User);

exports.getAllUser = factory.getOne(User);
