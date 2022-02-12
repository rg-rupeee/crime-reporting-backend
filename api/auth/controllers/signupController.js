const catchAsync = require("../../../utils/catchAsync");

// create a general user document in database (isVerified: false)
exports.sendOTP = catchAsync(async (req, res, next) => {});

// verify otp at twilio then send the signed jwt to user (isVerified: true)
exports.verifyOTP = catchAsync(async (req, res, next) => {});
