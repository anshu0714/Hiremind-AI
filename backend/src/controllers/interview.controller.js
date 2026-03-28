const InterviewReport = require("../models/interviewReport.model");
const generateInterviewReport = require("../services/ai.service");
const asyncHandler = require("../utils/asyncHandler.util");
const { PDFParse } = require("pdf-parse");
const { sendSuccess } = require("../utils/response.util");
const AppError = require("../utils/error.util");
const ERROR_TYPES = require("../utils/errorTypes.util");
const { validateObjectId } = require("../utils/validateObjectID.util");

const isValidText = (text) => text && text.trim().length > 0;

const cleanText = (text) => text?.replace(/\s+/g, " ").trim();

/**
 * @desc Generate a report by AI
 * @route POST /api/interview/
 * @access Private
 */
const generateReport = asyncHandler(async (req, res) => {
  let resumeContent = "";

  if (req.file) {
    const parser = new PDFParse(Uint8Array.from(req.file.buffer));
    const pdfData = await parser.getText();
    resumeContent = pdfData.text?.slice(0, 15000);
  }

  const { jobDescription, selfDescription } = req.body;

  if (
    !isValidText(jobDescription) ||
    (!resumeContent && !isValidText(selfDescription))
  ) {
    throw new AppError(
      "Job description and either resume or self description are required",
      400,
      ERROR_TYPES.VALIDATION_ERROR,
    );
  }

  const report = await generateInterviewReport({
    jobDescription: cleanText(jobDescription),
    resume: resumeContent ? cleanText(resumeContent) : undefined,
    selfDescription: isValidText(selfDescription)
      ? cleanText(selfDescription)
      : undefined,
  });

  const interviewReport = await InterviewReport.create({
    user: req.user._id,
    resume: resumeContent,
    jobDescription,
    selfDescription,
    ...report,
  });

  return sendSuccess(
    res,
    "Interview report created successfully",
    interviewReport,
    201,
  );
});

/**
 * @desc Get all interview reports (paginated)
 * @route GET /api/interview/
 * @access Private
 */
const getAllReports = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const reports = await InterviewReport.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-resume -jobDescription -selfDescription");

  const total = await InterviewReport.countDocuments({
    user: req.user._id,
  });

  return sendSuccess(res, "Reports fetched successfully", {
    reports,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * @desc Get single interview report
 * @route GET /api/interview/:id
 * @access Private
 */
const getSingleReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "report ID");

  const report = await InterviewReport.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!report) {
    throw new AppError(
      "Interview report not found",
      404,
      ERROR_TYPES.NOT_FOUND,
    );
  }

  return sendSuccess(res, "Report fetched successfully", report);
});

module.exports = { generateReport, getAllReports, getSingleReport };
