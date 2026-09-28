const User = require("../models/User");

const getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "name email careerPath skills projects certificates"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: {
        name: user.name,
        email: user.email,
        careerPath: user.careerPath || "Not selected",
        skills: user.skills || [],
        projects: user.projects || [],
        certificates: user.certificates || [],
      },
    });
  } catch (error) {
    console.error(
      "Public profile error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to load public profile",
    });
  }
};

module.exports = {
  getPublicProfile,
};