const express = require("express");

const protect = require("../middleware/authMiddleware");
const {
  generateCareerAdvice,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/career-advice",
  protect,
  generateCareerAdvice
);

module.exports = router;