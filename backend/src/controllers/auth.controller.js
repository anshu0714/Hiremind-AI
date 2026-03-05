const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken, setTokenCookie } = require("../utils/jwt.util");
const TokenBlacklist = require("../models/tokenBlacklist.model");
const asyncHandler = require("../utils/asyncHandler.util");
const { sendSuccess } = require("../utils/response.util");

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const error = new Error("All fields are required!");
    error.statusCode = 400;
    throw error;
  }

  const isUserExist = await User.findOne({ $or: [{ username }, { email }] });
  if (isUserExist) {
    const error = new Error("User already exists with this username or email.");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ username, email, password });
  const token = generateToken(user._id);
  setTokenCookie(res, token);

  return sendSuccess(
    res,
    "User created successfully!",
    {
      user: { id: user._id, username: user.username, email: user.email },
    },
    201,
  );
});

/**
 * @desc Login an existing user
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("All fields are required!");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password!");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password!");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);
  setTokenCookie(res, token);

  return sendSuccess(res, "User logged in successfully!", {
    user: { id: user._id, username: user.username, email: user.email },
  });
});

/**
 * @desc Logout current user
 * @route POST /api/auth/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    const error = new Error("Unauthorized request!");
    error.statusCode = 401;
    throw error;
  }

  const isTokenBlacklisted = await TokenBlacklist.findOne({ token });
  if (!isTokenBlacklisted) {
    await TokenBlacklist.create({ token });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendSuccess(res, "User logged out successfully!");
});

/**
 * @desc Get current user details
 * @route POST /api/auth/user
 * @access Private
 */
const getUser = asyncHandler(async (req, res) => {
  sendSuccess(
    res,
    "User fetched successfully!",
    {
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    },
    200,
  );
});

module.exports = { registerUser, loginUser, logoutUser, getUser };
