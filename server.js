const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet"); // For added security
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process if database connection fails
  });

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

// Import Routes
const quizRoutes = require("./routes/quizroutes");
const authRoutes = require("./routes/authroutes");

app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

// Handle Invalid Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB Connection Closed");
  process.exit(0);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
