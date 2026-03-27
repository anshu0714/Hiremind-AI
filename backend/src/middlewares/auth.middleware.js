const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler.util");
const TokenBlacklist = require("../models/tokenBlacklist.model");
const AppError = require("../utils/error.util");
const ERROR_TYPES = require("../utils/errorTypes.util");

/** Authenticate user using JWT token from cookies */
const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError(
      "Unauthorized request!",
      401,
      ERROR_TYPES.SESSION_EXPIRED,
    );
  }

  const isBlacklisted = await TokenBlacklist.findOne({ token });

  if (isBlacklisted) {
    throw new AppError(
      "Session expired. Please login again.",
      401,
      ERROR_TYPES.SESSION_EXPIRED,
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AppError(
      "Session expired or invalid token",
      401,
      ERROR_TYPES.SESSION_EXPIRED,
    );
  }

  let user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User doesn't exist!", 404, ERROR_TYPES.AUTH_ERROR);
  }

  req.user = user;
  next();
});

module.exports = { authenticate };
