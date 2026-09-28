const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getSkills,
  addSkill,
  deleteSkill,
} = require("../controllers/skillController");

const router = express.Router();

// Get logged-in user's skills
router.get("/", protect, getSkills);

// Add a new skill
router.post("/", protect, addSkill);

// Delete a skill
router.delete("/:skillId", protect, deleteSkill);

module.exports = router;