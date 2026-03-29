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
  title: z.string().min(1),
  matchScore: z.number().min(0).max(100),

  technicalQuestions: z
    .array(
      z.object({
        question: z.string().min(1),
        intention: z.string().min(1),
        answer: z.string().min(1),
      }),
    )
    .min(5),

  behavioralQuestions: z
    .array(
      z.object({
        question: z.string().min(1),
        intention: z.string().min(1),
        answer: z.string().min(1),
      }),
    )
    .min(5),

  skillGap: z
    .array(
      z.object({
        skill: z.string().min(1),
        severity: z.enum(["HIGH", "MEDIUM", "LOW"]),
      }),
    )
    .min(1),

  preparationPlan: z
    .array(
      z.object({
        day: z.number().int().min(1),
        focus: z.array(z.string().min(1)).min(1),
        tasks: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/** Safe array handling */
function safeArray(arr) {
  return Array.isArray(arr) ? arr.filter(Boolean) : [];
}

/** Normalize only critical inconsistencies */
function normalizeAIResponse(data) {
  const score = Number(data.matchScore);

  return {
    title: data.title || "General Role",
    matchScore: isNaN(score) ? 50 : score <= 1 ? score * 100 : score,

    technicalQuestions: safeArray(data.technicalQuestions),
    behavioralQuestions: safeArray(data.behavioralQuestions),
    skillGap: safeArray(data.skillGap),
    preparationPlan: safeArray(data.preparationPlan),
  };
}

async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription,
}) {
  try {
    let candidateSection = "";

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
    } catch (err) {
      throw new AppError("Invalid JSON from AI", 500, ERROR_TYPES.SERVER_ERROR);
    }

    const normalized = normalizeAIResponse(parsed);

    const result = interviewReportSchema.safeParse(normalized);

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
    console.error("AI ERROR:", err.message);
    throw new AppError(
      err.message || "Error creating report",
      500,
      ERROR_TYPES.SERVER_ERROR,
    );
  }
}

module.exports = generateInterviewReport;
