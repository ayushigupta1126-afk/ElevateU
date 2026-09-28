const express = require("express");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAdminDashboard,
} = require("../controllers/adminController");

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);

module.exports = router;