const InterviewReport = require("../models/interviewReport.model");
const generateInterviewReport = require("../services/ai.service");
const asyncHandler = require("../utils/asyncHandler.util");
const { PDFParse } = require("pdf-parse");
const { sendSuccess } = require("../utils/response.util");
const AppError = require("../utils/error.util");
const ERROR_TYPES = require("../utils/errorTypes.util");
const { validateObjectId } = require("../utils/validateObjectId.util");
const { generateInterviewPDF } = require("../services/pdf.service");

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

  const search = req.query.search?.trim() || "";
  const minScore = parseInt(req.query.minScore, 10) || 0;
  const sort = req.query.sort || "latest";

  const skip = (page - 1) * limit;

  const query = {
    user: req.user._id,
    matchScore: { $gte: minScore },
  };

  const { startDate, endDate } = req.query;

  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const sortOption = sort === "score" ? { matchScore: -1 } : { createdAt: -1 };

  const reports = await InterviewReport.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .select(
      "-resume -jobDescription -selfDescription -__v -user -updatedAt -technicalQuestions -behavioralQuestions -preparationPlan -skillGap",
    );

  const total = await InterviewReport.countDocuments(query);

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

/**
 * @desc Delete interview report
 * @route DELETE /api/interview/:id
 * @access Private
 */
const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id);

  const report = await InterviewReport.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  return sendSuccess(res, "Report deleted successfully");
});

/**
 * @desc Regenerate interview report
 * @route POST /api/interview/:id/regenerate
 * @access Private
 */
const regenerateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const oldReport = await InterviewReport.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!oldReport) {
    throw new AppError("Report not found", 404);
  }

  const newReport = await generateInterviewReport({
    jobDescription: oldReport.jobDescription,
    resume: oldReport.resume,
    selfDescription: oldReport.selfDescription,
  });

  const baseData = oldReport.toObject();

  delete baseData._id;
  delete baseData.createdAt;
  delete baseData.updatedAt;

  const saved = await InterviewReport.create({
    ...baseData,
    ...newReport,
    user: req.user._id,
  });

  return sendSuccess(res, "Report re-generated", saved);
});

/**
 * @desc Download interview report as PDF
 * @route GET /api/interview/:id/download
 * @access Private
 */
const downloadReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "report ID");

  const report = await InterviewReport.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!report) {
    throw new AppError("Report not found", 404, ERROR_TYPES.NOT_FOUND);
  }

  generateInterviewPDF(res, report, `report-${id}`);
});

module.exports = {
  generateReport,
  getAllReports,
  getSingleReport,
  deleteReport,
  regenerateReport,
  downloadReport,
};
