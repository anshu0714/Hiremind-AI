const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/file.middleware");
const {
  generateReport,
  getAllReports,
  getSingleReport,
  deleteReport,
  regenerateReport,
  downloadReport,
} = require("../controllers/interview.controller");

const interviewRoutes = express.Router();

interviewRoutes.post(
  "/",
  authenticate,
  upload.single("resume"),
  generateReport,
);

interviewRoutes.get("/", authenticate, getAllReports);
interviewRoutes.get("/:id", authenticate, getSingleReport);
interviewRoutes.delete("/:id", authenticate, deleteReport);
interviewRoutes.post("/:id/regenerate", authenticate, regenerateReport);
interviewRoutes.get("/:id/download", authenticate, downloadReport);

module.exports = interviewRoutes;
