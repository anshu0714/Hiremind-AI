class AppError extends Error {
  constructor(message, statusCode, type = "SERVER_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

module.exports = AppError;