const User = require("../models/User");

const {
  getProjectRecommendations,
} = require("../services/projectRecommendationService");

const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "careerPath skills"
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
        message:
          "Please select a career path first",
      });
    }

    const userSkills = (user.skills || []).map(
      (skill) => skill.name
    );

    const recommendations =
      getProjectRecommendations(
        user.careerPath,
        userSkills
      );

    res.status(200).json({
      success: true,
      careerPath: user.careerPath,
      recommendations,
    });
  } catch (error) {
    console.error(
      "Project recommendation error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to generate project recommendations",
    });
  }
};

module.exports = {
  getRecommendations,
};