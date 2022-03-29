const twilio = require("twilio");

const catchAsync = require("../../../utils/catchAsync");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.sendMessage = catchAsync(async (req, res, next) => {
	const { message, phone } = req.body;

	const destinationNumber = phone;
	const messageConfig = {
		body: message,
		from: process.env.TWILIO_NUMBER,
		to: destinationNumber,
	};
	const data = await client.messages.create(messageConfig);

	return res.json({ data });
});
