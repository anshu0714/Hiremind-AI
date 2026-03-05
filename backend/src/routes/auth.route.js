const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const authRoutes = express.Router();

authRoutes.post("/register", authController.registerUser);
authRoutes.post("/login", authController.loginUser);
authRoutes.post("/logout", authController.logoutUser);
authRoutes.get("/user", authenticate, authController.getUser);

module.exports = authRoutes;
