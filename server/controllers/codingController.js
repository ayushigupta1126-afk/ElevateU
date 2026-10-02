const CodingQuestion = require("../models/CodingQuestion");

// GET CODING QUESTIONS
const getCodingQuestions = async (req, res) => {
  try {
    const {
      career,
      topic,
      roadmapSkill,
      difficulty,
      limit = 10,
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (career) {
      filter.career = career;
    }

    if (topic) {
      filter.topic = topic;
    }

    if (roadmapSkill) {
      filter.roadmapSkill = roadmapSkill;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await CodingQuestion.find(filter)
      .select(
        "-testCases"
      )
      .limit(Number(limit))
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(
      "Get coding questions error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch coding questions",
    });
  }
};

// GET SINGLE CODING QUESTION
const getCodingQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await CodingQuestion.findOne({
      _id: questionId,
      isActive: true,
    }).select("-testCases");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Coding question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(
      "Get coding question error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch coding question",
    });
  }
};

// GET TEST CASES FOR INTERNAL RUNNER
// This endpoint will later be used only by the
// secure code execution layer.
const getCodingTestCases = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await CodingQuestion.findOne({
      _id: questionId,
      isActive: true,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Coding question not found",
      });
    }

    res.status(200).json({
      success: true,
      testCases: question.testCases,
    });
  } catch (error) {
    console.error(
      "Get coding test cases error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch coding test cases",
    });
  }
};

module.exports = {
  getCodingQuestions,
  getCodingQuestion,
  getCodingTestCases,
};