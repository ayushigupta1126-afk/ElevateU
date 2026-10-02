const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
      trim: true,
    },

    expectedOutput: {
      type: String,
      required: true,
      trim: true,
    },

    explanation: {
      type: String,
      default: "",
      trim: true,
    },

    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const codingQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    career: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    roadmapSkill: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    inputFormat: {
      type: String,
      default: "",
      trim: true,
    },

    outputFormat: {
      type: String,
      default: "",
      trim: true,
    },

    constraints: {
      type: [String],
      default: [],
    },

    examples: {
      type: [
        {
          input: {
            type: String,
            required: true,
          },
          output: {
            type: String,
            required: true,
          },
          explanation: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },

    starterCode: {
      javascript: {
        type: String,
        default: "",
      },

      cpp: {
        type: String,
        default: "",
      },

      python: {
        type: String,
        default: "",
      },

      java: {
        type: String,
        default: "",
      },
    },

    testCases: {
      type: [testCaseSchema],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    marks: {
      type: Number,
      default: 10,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CodingQuestion",
  codingQuestionSchema
);