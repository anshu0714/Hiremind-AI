const Groq = require("groq-sdk");
const z = require("zod");
const AppError = require("../utils/error.util");
const ERROR_TYPES = require("../utils/errorTypes.util");
const { buildInterviewPrompt } = require("../prompts/interview.prompt");

/** Remove markdown wrappers if AI adds them */
function extractJSON(text) {
  return text?.replace(/```json|```/g, "").trim();
}

const interviewReportSchema = z.object({
  title: z.string(),
  matchScore: z.number().min(0).max(100),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGap: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["HIGH", "MEDIUM", "LOW"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.array(z.string()),
      tasks: z.array(z.string()),
    }),
  ),
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/** Safe array handling */
function safeArray(arr) {
  return Array.isArray(arr) ? arr.filter(Boolean) : [];
}

/** 🔥 Extract clean role title (fallback safety) */
function cleanTitle(title) {
  if (!title) return "General Role";

  return title
    .replace(/interview report/gi, "")
    .replace(/report/gi, "")
    .replace(/analysis/gi, "")
    .replace(/match/gi, "")
    .trim()
    .split(" ")
    .slice(0, 4)
    .join(" ");
}

/** Normalize */
function normalizeAIResponse(data) {
  const score = Number(data.matchScore);

  return {
    title: cleanTitle(data.title),
    matchScore: isNaN(score) ? 0 : score <= 1 ? score * 100 : score,

    technicalQuestions: safeArray(data.technicalQuestions),
    behavioralQuestions: safeArray(data.behavioralQuestions),
    skillGap: safeArray(data.skillGap),
    preparationPlan: safeArray(data.preparationPlan),
  };
}

/** Business rules */
function enforceBusinessRules(data) {
  if (data.title === "Invalid Input") {
    return {
      title: "Invalid Input",
      matchScore: 0,
      technicalQuestions: [],
      behavioralQuestions: [],
      skillGap: [],
      preparationPlan: [],
    };
  }

  if (data.technicalQuestions.length < 5) data.technicalQuestions = [];
  if (data.behavioralQuestions.length < 5) data.behavioralQuestions = [];

  return data;
}

function isClearlyInvalid(text) {
  if (!text || text.trim().length < 15) return true;

  const nonLetterRatio = text.replace(/[a-zA-Z\s]/g, "").length / text.length;

  if (nonLetterRatio > 0.3) return true;

  const words = text.trim().split(/\s+/);

  if (words.length < 3) return true;

  const readableWords = words.filter((w) => /[aeiouAEIOU]/.test(w));

  if (readableWords.length < 2) return true;

  return false;
}

async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription,
}) {
  try {
    let candidateSection = "";

    if (isClearlyInvalid(jobDescription)) {
      return {
        title: "Invalid Input",
        matchScore: 0,
        technicalQuestions: [],
        behavioralQuestions: [],
        skillGap: [],
        preparationPlan: [],
      };
    }

    if (resume) candidateSection += `Resume:\n${resume}\n\n`;
    if (selfDescription)
      candidateSection += `Self Description:\n${selfDescription}\n\n`;

    const prompt = buildInterviewPrompt({
      jobDescription,
      candidateSection,
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const text = response.choices?.[0]?.message?.content;

    if (!text) {
      throw new AppError(
        "Empty response from AI",
        500,
        ERROR_TYPES.SERVER_ERROR,
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(extractJSON(text));
    } catch {
      throw new AppError("Invalid JSON from AI", 500, ERROR_TYPES.SERVER_ERROR);
    }

    const normalized = normalizeAIResponse(parsed);
    const finalData = enforceBusinessRules(normalized);

    const result = interviewReportSchema.safeParse(finalData);

    if (!result.success) {
      console.error("Zod Validation Error:", result.error);
      throw new AppError(
        "AI response structure invalid",
        500,
        ERROR_TYPES.SERVER_ERROR,
      );
    }

    return result.data;
  } catch (err) {
    console.error("FULL ERROR:", err);
    console.error("STACK:", err.stack);

    throw new AppError(
      err.message || "Error creating report",
      err.statusCode || 500,
      ERROR_TYPES.SERVER_ERROR,
    );
  }
}

module.exports = generateInterviewReport;
