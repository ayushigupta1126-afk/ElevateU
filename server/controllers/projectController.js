const User = require("../models/User");

const getProjects = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("projects");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      projects: user.projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch projects",
    });
  }
};

const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubUrl,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Project title and description are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.projects.push({
      title: title.trim(),
      description: description.trim(),
      technologies: Array.isArray(technologies)
        ? technologies
        : [],
      githubUrl: githubUrl || "",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      projects: user.projects,
    });
  } catch (error) {
    console.error("Add project error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add project",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const projectExists = user.projects.some(
      (project) =>
        project._id.toString() === projectId
    );

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    user.projects = user.projects.filter(
      (project) =>
        project._id.toString() !== projectId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      projects: user.projects,
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete project",
    });
  }
};

module.exports = {
  getProjects,
  addProject,
  deleteProject,
};