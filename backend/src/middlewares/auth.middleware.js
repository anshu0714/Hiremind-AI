const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler.util");
const TokenBlacklist = require("../models/tokenBlacklist.model");

/** Authenticate user using JWT token from cookies */
const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const error = new Error("Unauthorized request!");
    error.statusCode = 401;
    throw error();
  }

  const isBlacklisted = await TokenBlacklist.findOne({ token });

  if (isBlacklisted) {
    const error = new Error("Token expired. Please login again.");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User doesn't exist!");
    error.statusCode = 404;
    throw error;
  }

  req.user = user;
  next();
});

module.exports = { authenticate };
