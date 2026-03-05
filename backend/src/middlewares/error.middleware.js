/**
 * Global error handler middleware
 * Formats and sends errors in a standardized response
 */
function errorHandler(err, req, res, next) {
  console.log(err);

  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
