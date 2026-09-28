const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getProjects,
  addProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

// Get logged-in user's projects
router.get("/", protect, getProjects);

// Add a new project
router.post("/", protect, addProject);

// Delete a project
router.delete("/:projectId", protect, deleteProject);

module.exports = router;