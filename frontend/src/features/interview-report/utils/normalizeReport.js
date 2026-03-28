export const normalizeReport = (data = {}) => {
  return {
    id: data._id,

    matchScore: data.matchScore || 0,
    summary: data.summary || "",

    skillGaps: Array.isArray(data.skillGap)
      ? data.skillGap.map((item) => ({
          name: item.name || item.skill || "Unknown Skill",
          severity: item.severity || "LOW",
        }))
      : [],

    questions: {
      technical: Array.isArray(data.technicalQuestions)
        ? data.technicalQuestions.map((q) => ({
            question: q.question || "",
            intention: q.intention || "",
            answer: q.answer || "",
          }))
        : [],

      behavioral: Array.isArray(data.behavioralQuestions)
        ? data.behavioralQuestions.map((q) => ({
            question: q.question || "",
            intention: q.intention || "",
            answer: q.answer || "",
          }))
        : [],
    },

    preparationPlan: Array.isArray(data.preparationPlan)
      ? data.preparationPlan.map((day) => ({
          day: day.day || 0,
          title: Array.isArray(day.focus)
            ? day.focus.join(", ")
            : day.title || "",
          task: Array.isArray(day.tasks)
            ? day.tasks.join(", ")
            : day.task || "",
        }))
      : [],

    inputs: {
      resume: data.resume || "",
      jd: data.jobDescription || "",
      self: data.selfDescription || "",
    },
  };
};
