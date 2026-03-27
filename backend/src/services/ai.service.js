const Groq = require("groq-sdk");
const z = require("zod");

/** Remove markdown wrappers if AI adds them */
function extractJSON(text) {
  return text?.replace(/```json|```/g, "").trim();
}

const interviewReportSchema = z.object({
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

    const prompt = `
You MUST return strictly valid JSON.

CORE RULES:
- Return ONLY JSON (no markdown, no explanation, no backticks)
- Follow the structure EXACTLY
- Do NOT stringify objects

ROLE ALIGNMENT:
- Generate output strictly based on the job description
- Adapt completely to the role (e.g., Product Manager, Designer, Data Analyst)
- Do NOT generate backend-specific content unless the role is backend

ANSWER MODE (CRITICAL):
- You are an INTERVIEW COACH, not the candidate

STRICTLY FORBIDDEN:
- Do NOT use candidate experience
- Do NOT use phrases like:
  - "I did..."
  - "In my project..."
  - "I worked on..."
- Do NOT personalize answers

INSTEAD:
- Explain HOW the candidate should answer
- Use neutral coaching language:
  - "The candidate should explain..."
  - "A strong answer should include..."
  - "For example, the candidate can say..."

ANSWER STRUCTURE:
Each answer MUST include:
1. What the interviewer is evaluating
2. Clear step-by-step approach to answer
3. A generic example template (NOT personal)

QUALITY RULES:
- Each answer must be 4–5 sentences minimum
- Must be practical and structured
- Avoid vague or generic advice
- Include frameworks where relevant (e.g., STAR, RICE, metrics)
- Behavioral answers MUST follow STAR format

BEHAVIORAL ANSWER FORMAT (STRICT):
- MUST be written in STAR format explicitly:
  Situation:
  Task:
  Action:
  Result:

ANSWER QUALITY IMPROVEMENT:
- Avoid repetitive phrases like "the candidate should describe"
- Provide precise, actionable guidance
- Keep explanations structured and concise

QUESTION COUNT (STRICT):
- Generate AT LEAST 5 technicalQuestions
- Generate AT LEAST 5 behavioralQuestions

CONSISTENCY:
- Do not skip any field
- Do not return empty arrays
- Ensure all objects strictly match schema

FORMAT:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGap": [
    {
      "skill": string,
      "severity": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string[],
      "tasks": string[]
    }
  ]
}

Job Description:
${jobDescription}

Candidate:
${candidateSection}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const text = response.choices?.[0]?.message?.content;

    if (!text) throw new Error("Empty response from AI");

    const parsed = JSON.parse(extractJSON(text));

    const normalized = normalizeAIResponse(parsed);

    const result = interviewReportSchema.safeParse(normalized);

    if (!result.success) {
      console.error("Zod Validation Error:", result.error);
      throw new Error("AI response structure invalid");
    }

    return result.data;
  } catch (err) {
    console.error("AI ERROR:", err.message);
    throw new Error(`Error creating report: ${err.message}`);
  }
}

module.exports = generateInterviewReport;
