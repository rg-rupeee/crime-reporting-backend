const catchAsync = require("../../../utils/catchAsync");

// create and send otp using twilio
exports.sendOTP = catchAsync(async (req, res, next) => {});

// verify otp at twilio then send the signed jwt to user
exports.verifyOTP = catchAsync(async (req, res, next) => {});
