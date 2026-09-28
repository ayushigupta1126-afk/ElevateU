const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getGithubRepositories,
} = require("../controllers/githubController");

const router = express.Router();

router.get(
  "/repositories",
  protect,
  getGithubRepositories
);

module.exports = router;