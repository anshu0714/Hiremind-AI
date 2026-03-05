const express = require("express");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
