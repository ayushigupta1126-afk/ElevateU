const User = require("../models/User");

const getSkills = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("skills");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      skills: user.skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch skills",
    });
  }
};

const addSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyExists = user.skills.some(
      (skill) =>
        skill.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Skill already exists",
      });
    }

    user.skills.push({
      name: name.trim(),
      proficiency: proficiency || "Beginner",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skills: user.skills,
    });
  } catch (error) {
    console.error("Add skill error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add skill",
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const skillExists = user.skills.some(
      (skill) => skill._id.toString() === skillId
    );

    if (!skillExists) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    user.skills = user.skills.filter(
      (skill) => skill._id.toString() !== skillId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      skills: user.skills,
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete skill",
    });
  }
};

module.exports = {
  getSkills,
  addSkill,
  deleteSkill,
};