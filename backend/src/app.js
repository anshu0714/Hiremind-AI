const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");
const interviewRoutes = require("./routes/interview.route");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

app.use(errorHandler);

module.exports = app;
