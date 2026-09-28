const express = require("express");

const {
  getPublicProfile,
} = require("../controllers/publicProfileController");

const router = express.Router();

router.get("/:id", getPublicProfile);

module.exports = router;