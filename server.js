const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cloudinary = require("./config/cloudinary");

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! Shutting down...");
	console.log(err.name, err.message);
	// console.log(err);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// database connection
connectDB();

// configuring cloudinary
cloudinary();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Listening to Server on port ${port} *_*`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on("SIGTERM", () => {
	console.log("SIGTERM RECEIVED. Shutting down gracefully");
	server.close(() => {
		console.log("Process terminated!");
	});
});
