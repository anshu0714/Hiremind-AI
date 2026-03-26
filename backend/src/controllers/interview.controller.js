const InterviewReport = require("../models/interviewReport.model");
const generateInterviewReport = require("../services/ai.service");
const asyncHandler = require("../utils/asyncHandler.util");
const { PDFParse } = require("pdf-parse");
const { sendSuccess } = require("../utils/response.util");

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
    const error = new Error(
      "Job description and either resume or self description are required",
    );
    error.statusCode = 400;
    throw error;
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

module.exports = generateReport;
