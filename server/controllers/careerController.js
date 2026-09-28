const User = require("../models/User");
const {
  getRequiredSkills,
} = require("../services/careerService");

const getSkillGap = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "careerPath skills projects certificates"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.careerPath) {
      return res.status(400).json({
        success: false,
        message: "Please select a career path first",
      });
    }

    const requiredSkills = getRequiredSkills(
      user.careerPath
    );

    if (requiredSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Career path not supported",
      });
    }

    // Normalize user's skill names
    const userSkills = user.skills.map((skill) =>
      skill.name.trim().toLowerCase()
    );

    // Find completed and missing skills
    const completedSkills = requiredSkills.filter(
      (skill) =>
        userSkills.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
      (skill) =>
        !userSkills.includes(skill.toLowerCase())
    );

    // Basic skill completion score
    const skillScore = Math.round(
      (completedSkills.length /
        requiredSkills.length) *
        100
    );

    // Additional profile progress
    const projectScore =
      user.projects && user.projects.length > 0
        ? 100
        : 0;

    const certificateScore =
      user.certificates &&
      user.certificates.length > 0
        ? 100
        : 0;

    // Overall Career Readiness Score
    const readinessPercentage = Math.round(
      skillScore * 0.7 +
        projectScore * 0.2 +
        certificateScore * 0.1
    );

    res.status(200).json({
      success: true,

      careerPath: user.careerPath,

      totalRequiredSkills: requiredSkills.length,

      completedSkills,

      missingSkills,

      // Overall score
      readinessPercentage,

      // Detailed score breakdown
      scoreBreakdown: {
        skillScore,
        projectScore,
        certificateScore,
      },

      // Profile progress
      totalProjects: user.projects?.length || 0,

      totalCertificates:
        user.certificates?.length || 0,
    });
  } catch (error) {
    console.error(
      "Skill gap analysis error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to generate skill gap analysis",
    });
  }
};

module.exports = {
  getSkillGap,
};