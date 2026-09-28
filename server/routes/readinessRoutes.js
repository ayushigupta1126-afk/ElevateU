const express = require("express");

const {
  getCareerReadinessScore,
} = require("../controllers/readinessController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getCareerReadinessScore
);

module.exports = router;