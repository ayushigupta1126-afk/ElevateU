const User = require("../models/User");

const getCertificates = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "certificates"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      certificates: user.certificates,
    });
  } catch (error) {
    console.error("Get certificates error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch certificates",
    });
  }
};

const addCertificate = async (req, res) => {
  try {
    const {
      title,
      issuer,
      issueDate,
      certificateUrl,
    } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({
        success: false,
        message:
          "Certificate title and issuer are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.certificates.push({
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate: issueDate || "",
      certificateUrl: certificateUrl || "",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Certificate added successfully",
      certificates: user.certificates,
    });
  } catch (error) {
    console.error("Add certificate error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add certificate",
    });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const certificateExists = user.certificates.some(
      (certificate) =>
        certificate._id.toString() === certificateId
    );

    if (!certificateExists) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    user.certificates = user.certificates.filter(
      (certificate) =>
        certificate._id.toString() !== certificateId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
      certificates: user.certificates,
    });
  } catch (error) {
    console.error(
      "Delete certificate error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to delete certificate",
    });
  }
};

module.exports = {
  getCertificates,
  addCertificate,
  deleteCertificate,
};