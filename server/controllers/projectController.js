
const User = require("../models/User");

// GET: Fetch all projects of logged-in user
const getProjects = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("projects");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      projects: user.projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch projects",
    });
  }
};

// POST: Add a new project
const addProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
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
            .filter((item) => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      githubUrl:
        typeof githubUrl === "string" ? githubUrl.trim() : "",
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      projects: user.projects,
    });
  } catch (error) {
    console.error("Add project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add project",
    });
  }
};

// PUT: Update an existing project
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, technologies, githubUrl } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
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

    const project = user.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.title = title.trim();
    project.description = description.trim();
    project.technologies = Array.isArray(technologies)
      ? technologies
          .filter((item) => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    project.githubUrl =
      typeof githubUrl === "string" ? githubUrl.trim() : "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      projects: user.projects,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update project",
    });
  }
};

// DELETE: Delete an existing project
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

    const project = user.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.deleteOne();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      projects: user.projects,
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete project",
    });
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};