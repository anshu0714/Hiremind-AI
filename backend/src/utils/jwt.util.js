const jwt = require("jsonwebtoken");

/** Generate a JWT token for a user */
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

/** Set a JWT token in an HTTP-only cookie */
function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
}

module.exports = { generateToken, setTokenCookie };
