const ERROR_TYPES = require("../utils/errorTypes.util");
/**
 * Global error handler middleware
 * Formats and sends errors in a standardized response
 */
function errorHandler(err, req, res, next) {
  console.log(err);

  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;
  let type = err.type || ERROR_TYPES.SERVER_ERROR;

  if (err.name === "ValidationError") {
    statusCode = 400;
    type = ERROR_TYPES.VALIDATION_ERROR;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    type,
  });
}

module.exports = errorHandler;
