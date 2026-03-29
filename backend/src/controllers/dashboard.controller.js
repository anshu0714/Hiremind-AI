const asyncHandler = require("../utils/asyncHandler.util");
const { sendSuccess } = require("../utils/response.util");
const InterviewReport = require("../models/interviewReport.model");

/**
 * @desc Get dashboard data
 * @route GET /api/dashboard
 * @access Private
 */
const getDashboard = asyncHandler(async (req, res) => {
  const reports = await InterviewReport.find({ user: req.user._id })
    .sort({ createdAt: 1 })
    .select("matchScore createdAt title");

  const scores = reports.map((r) => r.matchScore || 0);
  const total = scores.length;

  // BASIC STATS
  const avgScore = scores.reduce((a, b) => a + b, 0) / (total || 1);

  const bestScore = Math.max(...scores, 0);

  // SCORE RANGE
  const minScore = Math.min(...scores, 0);
  const maxScore = Math.max(...scores, 0);
  const scoreRange = `${minScore}% - ${maxScore}%`;

  // REPORTS THIS WEEK
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const reportsThisWeek = reports.filter(
    (r) => new Date(r.createdAt) >= sevenDaysAgo,
  ).length;

  // CHART (LAST 7 REPORTS)
  const chartSource = reports.slice(-7);

  const chartData = chartSource.map((r) => ({
    date: r.createdAt,
    score: r.matchScore,
  }));

  // RECENT REPORTS
  const recentReports = [...reports].reverse().slice(0, 5);

  return sendSuccess(res, "Dashboard data", {
    stats: {
      avgScore: Math.round(avgScore),
      bestScore,
      scoreRange,
      totalReports: total,
      reportsThisWeek,
    },
    chartData,
    recentReports,
  });
});

module.exports = { getDashboard };
