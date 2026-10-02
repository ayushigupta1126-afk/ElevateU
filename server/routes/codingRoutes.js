const express = require("express");

const codingController = require("../controllers/codingController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get coding questions
router.get(
  "/questions",
  protect,
  codingController.getCodingQuestions
);

// Get one coding question
router.get(
  "/questions/:questionId",
  protect,
  codingController.getCodingQuestion
);

// Internal test-case access
router.get(
  "/questions/:questionId/test-cases",
  protect,
  codingController.getCodingTestCases
);

module.exports = router;