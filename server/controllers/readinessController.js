const User = require("../models/User");

const getCareerReadinessScore = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "careerPath skills projects certificates"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let score = 0;

    // Career path: 20 points
    if (user.careerPath) {
      score += 20;
    }

    // Skills: 25 points
    const skillCount = user.skills?.length || 0;

    if (skillCount >= 5) {
      score += 25;
    } else {
      score += skillCount * 5;
    }

    // Projects: 25 points
    const projectCount = user.projects?.length || 0;

    if (projectCount >= 3) {
      score += 25;
    } else {
      score += projectCount * 8;
    }

    // Certificates: 15 points
    const certificateCount =
      user.certificates?.length || 0;

    if (certificateCount >= 3) {
      score += 15;
    } else {
      score += certificateCount * 5;
    }

    // Advanced skills bonus: 15 points
    const advancedSkills =
      user.skills?.filter(
        (skill) => skill.proficiency === "Advanced"
      ).length || 0;

    if (advancedSkills >= 3) {
      score += 15;
    } else {
      score += advancedSkills * 5;
    }

    score = Math.min(score, 100);

    let level = "Beginner";

    if (score >= 75) {
      level = "Career Ready";
    } else if (score >= 50) {
      level = "Developing";
    } else if (score >= 25) {
      level = "Getting Started";
    }

    res.status(200).json({
      success: true,
      score,
      level,
      breakdown: {
        careerPath: user.careerPath ? 20 : 0,
        skills: Math.min(skillCount * 5, 25),
        projects: Math.min(projectCount * 8, 25),
        certificates: Math.min(
          certificateCount * 5,
          15
        ),
        advancedSkills: Math.min(
          advancedSkills * 5,
          15
        ),
      },
    });
  } catch (error) {
    console.error(
      "Career readiness error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to calculate career readiness score",
    });
  }
};

module.exports = {
  getCareerReadinessScore,
};