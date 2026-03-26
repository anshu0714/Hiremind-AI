const mongoose = require("mongoose");

const nonEmptyString = {
  type: String,
  required: true,
  trim: true,
  validate: [(v) => v && v.length > 0, "Field cannot be empty"],
};

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      ...nonEmptyString,
      required: [true, "Technical questions are required"],
    },
    intention: {
      ...nonEmptyString,
      required: [true, "Interviewer intention is required!"],
    },
    answer: {
      ...nonEmptyString,
      required: [true, "How to answer question format is required!"],
    },
  },
  { _id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      ...nonEmptyString,
      required: [true, "Behavioral questions are required"],
    },
    intention: {
      ...nonEmptyString,
      required: [true, "Interviewer intention is required!"],
    },
    answer: {
      ...nonEmptyString,
      required: [true, "How to answer question format is required!"],
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      ...nonEmptyString,
      required: [true, "Skill is required!"],
    },
    severity: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      required: [true, "Severity is required!"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required!"],
    },
    focus: {
      type: [nonEmptyString],
      required: true,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Focus cannot be empty",
      ],
    },
    tasks: {
      type: [nonEmptyString],
      required: true,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Tasks cannot be empty",
      ],
    },
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      ...nonEmptyString,
      required: [true, "Job description is required!"],
    },
    resume: {
      type: String,
      trim: true,
    },
    selfDescription: {
      type: String,
      trim: true,
    },
    matchScore: {
      type: Number,
      required: [true, "Match score is required!"],
      min: 0,
      max: 100,
    },
    skillGap: {
      type: [skillGapSchema],
      required: true,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Skill gap cannot be empty",
      ],
    },
    technicalQuestions: {
      type: [technicalQuestionSchema],
      required: true,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Technical questions cannot be empty",
      ],
    },
    behavioralQuestions: {
      type: [behavioralQuestionSchema],
      required: true,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Behavioral questions cannot be empty",
      ],
    },
    preparationPlan: {
      type: [preparationPlanSchema],
      required: true,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Preparation plan cannot be empty",
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

interviewReportSchema.index({ user: 1, createdAt: -1 });

interviewReportSchema.pre("validate", function () {
  if (!this.resume && !this.selfDescription) {
    throw new Error("Either resume or selfDescription is required");
  }
});

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = InterviewReport;
