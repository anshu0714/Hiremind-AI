const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");
const interviewRoutes = require("./routes/interview.route");
const dashboardRoutes = require("./routes/dashboard.route");

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

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    service: "HireMind AI API",
    uptime: process.uptime().toFixed(2) + "s",
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

module.exports = app;
