const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const UserQuiz = require("../models/userquiz");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure dotenv is loaded

// ✅ Add Multiple Questions at Once

// ✅ API to fetch all quiz questions
router.get("/all", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ API to submit quiz answers
router.post("/submit", async (req, res) => {
  try {
    const { username, answers, category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Quiz category is required." });
    }

    const questions = await Question.find({ category }); // Fetch only questions for the specified category
    let score = 0;
    let submittedAnswers = [];

    answers.forEach((answer) => {
      const question = questions.find(
        (q) => q._id.toString() === answer.questionId
      );
      if (question) {
        if (question.correctAnswer === answer.selectedOption) {
          score++;
        }
        submittedAnswers.push({
          questionId: question._id,
          selectedOption: answer.selectedOption,
          correctAnswer: question.correctAnswer,
        });
      }
    });

    // Save quiz attempt
    const userQuiz = new UserQuiz({
      username,
      score,
      total: questions.length,
      submittedAnswers,
      category, // Save the category for future reference
    });

    await userQuiz.save();

    res.json({
      message: "Quiz submitted successfully",
      score,
      total: questions.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting quiz", error: error.message });
  }
});

// ✅ API to fetch leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await UserQuiz.aggregate([
      {
        $group: {
          _id: "$username",
          totalScore: { $sum: "$score" },
          totalAttempts: { $sum: 1 },
        },
      },
      { $sort: { totalScore: -1, totalAttempts: 1 } },
      { $limit: 10 },
    ]);

    res.json(leaderboard);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leaderboard", error: error.message });
  }
});

// ✅ API to fetch quiz history for a user
router.get("/history/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const history = await UserQuiz.find({ username }).select("-__v"); // Exclude version key

    if (!history.length) {
      return res
        .status(404)
        .json({ message: "No quiz history found for this user." });
    }

    res.json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quiz history", error: error.message });
  }
});

// Fetch questions by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching questions", error: error.message });
  }
});

// ✅ Fix: Move `module.exports` to the end
module.exports = router;
