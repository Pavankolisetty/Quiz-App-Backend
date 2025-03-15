const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Add references to `Question` documents
});

module.exports = mongoose.model("Quiz", quizSchema);
