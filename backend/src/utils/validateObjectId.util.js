const mongoose = require("mongoose");
const AppError = require("./error.util");
const ERROR_TYPES = require("./errorTypes.util");

const validateObjectId = (id, fieldName = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(
      `Invalid ${fieldName}`,
      400,
      ERROR_TYPES.VALIDATION_ERROR
    );
  }
};

module.exports = { validateObjectId };