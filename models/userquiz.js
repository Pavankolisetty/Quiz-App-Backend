const mongoose = require("mongoose");

const userQuizSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    submittedAnswers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: String, required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
    category: { type: String, required: true }, // Include the quiz category
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserQuiz", userQuizSchema);
