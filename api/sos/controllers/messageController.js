const twilio = require("twilio");

const catchAsync = require("../../../utils/catchAsync");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.sendMessage = catchAsync(async (req, res, next) => {
	const { message, phone } = req.body.message;

	client.messages
		.create({ body: message, from: "+918223088814", to: phone })
		.then((message) => {
			return res.json({
				status: "success",
				message: "message sent successfully",
				data: message,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({ status: "fail", error: err });
		});
});
