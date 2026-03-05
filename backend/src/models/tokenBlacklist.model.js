const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required for blacklisting."],
      unique: true,
    },
  },
  { timestamps: true },
);

tokenBlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklist;
