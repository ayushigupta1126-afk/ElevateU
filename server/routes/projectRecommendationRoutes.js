const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getRecommendations,
} = require("../controllers/projectRecommendationController");

const router = express.Router();

router.get(
  "/recommendations",
  protect,
  getRecommendations
);

module.exports = router;