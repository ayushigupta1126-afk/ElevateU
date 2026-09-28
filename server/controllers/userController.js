
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      careerPath,
      skills,
      projects,
      certificates,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update basic profile information
    if (name !== undefined) {
      user.name = name;
    }

    if (careerPath !== undefined) {
      user.careerPath = careerPath;
    }

    // Update skills
    if (skills !== undefined) {
      user.skills = skills;
    }

    // Update projects
    if (projects !== undefined) {
      user.projects = projects;
    }

    // Update certificates
    if (certificates !== undefined) {
      user.certificates = certificates;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        careerPath: user.careerPath,
        skills: user.skills,
        projects: user.projects,
        certificates: user.certificates,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

