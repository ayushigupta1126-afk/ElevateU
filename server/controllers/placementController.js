const PracticeQuestion = require("../models/PracticeQuestion");

// =====================================================
// GET PRACTICE QUESTIONS
// =====================================================
const getPracticeQuestions = async (req, res) => {
  try {
    const {
      career,
      topic,
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

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await PracticeQuestion.find(filter)
      .select("-correctAnswer")
      .limit(Number(limit))
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(
      "Get placement questions error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch practice questions",
    });
  }
};

// =====================================================
// GET SINGLE PRACTICE QUESTION
// =====================================================
const getPracticeQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await PracticeQuestion.findOne({
      _id: questionId,
      isActive: true,
    }).select("-correctAnswer");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Practice question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(
      "Get single placement question error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch practice question",
    });
  }
};

// =====================================================
// SUBMIT ANSWER
// =====================================================
const submitPracticeAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { selectedAnswer } = req.body;

    if (!selectedAnswer) {
      return res.status(400).json({
        success: false,
        message: "Please select an answer",
      });
    }

    const question = await PracticeQuestion.findOne({
      _id: questionId,
      isActive: true,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Practice question not found",
      });
    }

    const isCorrect =
      selectedAnswer.trim().toLowerCase() ===
      question.correctAnswer.trim().toLowerCase();

    res.status(200).json({
      success: true,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      marks: isCorrect ? question.marks : 0,
    });
  } catch (error) {
    console.error(
      "Submit placement answer error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to submit answer",
    });
  }
};

// =====================================================
// GET PLACEMENT PROGRESS
// =====================================================
const getPlacementProgress = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      progress: {
        questionsAttempted: 0,
        correctAnswers: 0,
        totalScore: 0,
        accuracy: 0,
      },
    });
  } catch (error) {
    console.error(
      "Get placement progress error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch placement progress",
    });
  }
};

// =====================================================
// GET PLACEMENT READINESS
// =====================================================
const getPlacementReadiness = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      readiness: {
        percentage: 0,
        level: "Getting Started",
      },
    });
  } catch (error) {
    console.error(
      "Get placement readiness error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch placement readiness",
    });
  }
};

module.exports = {
  getPracticeQuestions,
  getPracticeQuestion,
  submitPracticeAnswer,
  getPlacementProgress,
  getPlacementReadiness,
};