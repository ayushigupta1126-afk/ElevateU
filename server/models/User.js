const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    careerPath: {
      type: String,
      default: "",
    },

    skills: {
      type: [
        {
          name: String,
          proficiency: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
          },
        },
      ],
      default: [],
    },

    projects: {
      type: [
        {
          title: String,
          description: String,
          technologies: [String],
          githubUrl: String,
        },
      ],
      default: [],
    },

    certificates: {
      type: [
        {
          title: String,
          issuer: String,
          issueDate: String,
          certificateUrl: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);