const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getCertificates,
  addCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

const router = express.Router();

// Get logged-in user's certificates
router.get("/", protect, getCertificates);

// Add a new certificate
router.post("/", protect, addCertificate);

// Delete a certificate
router.delete("/:certificateId", protect, deleteCertificate);

module.exports = router;