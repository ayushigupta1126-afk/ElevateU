const User = require("../models/User");

const getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "careerPath skills projects certificates"
    );

    const totalUsers = users.length;

    const totalCareerPaths = new Set(
      users
        .map((user) => user.careerPath)
        .filter(Boolean)
    ).size;

    const totalSkills = users.reduce(
      (total, user) =>
        total + (user.skills?.length || 0),
      0
    );

    const totalProjects = users.reduce(
      (total, user) =>
        total + (user.projects?.length || 0),
      0
    );

    const totalCertificates = users.reduce(
      (total, user) =>
        total + (user.certificates?.length || 0),
      0
    );

    res.status(200).json({
      success: true,
      totalUsers,
      totalCareerPaths,
      totalSkills,
      totalProjects,
      totalCertificates,
    });
  } catch (error) {
    console.error(
      "Admin dashboard error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to load admin dashboard",
    });
  }
};

module.exports = {
  getAdminDashboard,
};