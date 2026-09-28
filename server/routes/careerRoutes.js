const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getSkillGap,
} = require("../controllers/careerController");

const router = express.Router();

// Generate skill gap analysis
router.get("/skill-gap", protect, getSkillGap);

module.exports = router;