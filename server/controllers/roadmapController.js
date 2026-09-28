const User = require("../models/User");

const {
  getRequiredSkills,
} = require("../services/careerService");

const {
  generateRoadmap,
} = require("../services/roadmapService");

const getRoadmap = async (req, res) => {
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

    const userSkills = user.skills.map((skill) =>
      skill.name.trim().toLowerCase()
    );

    const missingSkills = requiredSkills.filter(
      (skill) =>
        !userSkills.includes(skill.toLowerCase())
    );

    const roadmap = generateRoadmap(missingSkills);

    res.status(200).json({
      success: true,
      careerPath: user.careerPath,
      totalSteps: roadmap.length,
      roadmap,
    });
  } catch (error) {
    console.error("Roadmap error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to generate career roadmap",
    });
  }
};

module.exports = {
  getRoadmap,
};