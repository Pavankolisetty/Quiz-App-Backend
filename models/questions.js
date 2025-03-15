const mongoose = require("mongoose"); // ✅ Import mongoose

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Maths", "English", "Science"],
  }, // Add category field
});

module.exports = mongoose.model("Question", questionSchema);
