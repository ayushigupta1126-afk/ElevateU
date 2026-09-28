const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getRoadmap,
} = require("../controllers/roadmapController");

const router = express.Router();

// Generate personalized career roadmap
router.get("/", protect, getRoadmap);

module.exports = router;