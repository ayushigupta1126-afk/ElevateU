const User = require("../models/User");
const {
  getRequiredSkills,
} = require("../services/careerService");

const getAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name careerPath skills projects certificates"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const totalSkills = user.skills?.length || 0;
    const totalProjects = user.projects?.length || 0;
    const totalCertificates =
      user.certificates?.length || 0;

    let requiredSkillsCount = 0;
    let completedRequiredSkills = 0;

    if (user.careerPath) {
      const requiredSkills = getRequiredSkills(
        user.careerPath
      );

      requiredSkillsCount = requiredSkills.length;

      const userSkills = (user.skills || []).map(
        (skill) =>
          skill.name.trim().toLowerCase()
      );

      completedRequiredSkills =
        requiredSkills.filter((skill) =>
          userSkills.includes(
            skill.toLowerCase()
          )
        ).length;
    }

    const skillProgress =
      requiredSkillsCount > 0
        ? Math.round(
            (completedRequiredSkills /
              requiredSkillsCount) *
              100
          )
        : 0;

    const projectProgress =
      totalProjects > 0 ? 100 : 0;

    const certificateProgress =
      totalCertificates > 0 ? 100 : 0;

    const overallProgress = Math.round(
      skillProgress * 0.6 +
        projectProgress * 0.25 +
        certificateProgress * 0.15
    );

    res.status(200).json({
      success: true,

      analytics: {
        userName: user.name,
        careerPath:
          user.careerPath || "Not selected",

        totalSkills,
        totalProjects,
        totalCertificates,

        requiredSkillsCount,
        completedRequiredSkills,

        skillProgress,
        projectProgress,
        certificateProgress,

        overallProgress,
      },
    });
  } catch (error) {
    console.error(
      "Analytics error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to generate analytics",
    });
  }
};

module.exports = {
  getAnalytics,
};