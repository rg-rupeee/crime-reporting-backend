const express = require("express");
const router = express.Router();

const UserController = require("./controllers/userController");
const auth = require("../auth/middlewares/authMiddlewares");

// hq - admin role
router.post(
	"/create/police",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	UserController.createPoliceUser
);
router.delete(
	"/delete/police/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	UserController.deletePoliceUser
);
router.get(
	"/police",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	UserController.getPoliceUsers
);
router.get(
	"/police/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	UserController.getPoliceUser
);
router.patch(
	"/police/:id",
	auth.protect,
	auth.restrictTo("hq", "admin"),
	UserController.updatePoliceUser
);

// HQ - Admin - Police
router.get(
	"/user",
	auth.protect,
	auth.restrictTo("hq", "admin", "police"),
	UserController.getUsers
);
router.get(
	"/user/:id",
	auth.protect,
	auth.restrictTo("hq", "admin", "police"),
	UserController.getUser
);

// admin role
router.post(
	"/create/hq",
	auth.protect,
	auth.restrictTo("admin"),
	UserController.createHQUser
);
router.delete(
	"/delete/hq/:id",
	auth.protect,
	auth.restrictTo("admin"),
	UserController.deleteHQUser
);
router.get(
	"/hq",
	auth.protect,
	auth.restrictTo("admin"),
	UserController.getHQUsers
);
router.get(
	"/hq/:id",
	auth.protect,
	auth.restrictTo("admin"),
	UserController.getHQUser
);
router.patch(
	"/hq/:id",
	auth.protect,
	auth.restrictTo("admin"),
	UserController.updateHQUser
);

// all
router.patch("/update/me", auth.protect, UserController.updateMe);
router.get("/me", auth.protect, UserController.getMe);

module.exports = router;
