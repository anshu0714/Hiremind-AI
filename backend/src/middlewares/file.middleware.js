const multer = require("multer");
const AppError = require("../utils/error.util");
const ERROR_TYPES = require("../utils/errorTypes.util");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(
        new AppError(
          "Only PDF files are allowed",
          400,
          ERROR_TYPES.VALIDATION_ERROR,
        ),
        false,
      );
    }
    cb(null, true);
  },
});

module.exports = { upload };
