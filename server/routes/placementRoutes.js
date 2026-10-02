const express = require("express");

const placementController = require("../controllers/placementController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get practice questions
router.get(
  "/questions",
  protect,
  placementController.getPracticeQuestions
);

// Get single practice question
router.get(
  "/questions/:questionId",
  protect,
  placementController.getPracticeQuestion
);

// Submit answer
router.post(
  "/questions/:questionId/answer",
  protect,
  placementController.submitPracticeAnswer
);

// Get user's progress
router.get(
  "/progress",
  protect,
  placementController.getPlacementProgress
);

// Get user's readiness
router.get(
  "/readiness",
  protect,
  placementController.getPlacementReadiness
);

module.exports = router;