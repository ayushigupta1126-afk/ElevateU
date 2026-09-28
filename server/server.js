const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const projectRoutes = require("./routes/projectRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const careerRoutes = require("./routes/careerRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");
const githubRoutes = require("./routes/githubRoutes");
const projectRecommendationRoutes = require("./routes/projectRecommendationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const readinessRoutes = require("./routes/readinessRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ElevateU backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/github", githubRoutes);

app.use(
  "/api/project-recommendations",
  projectRecommendationRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/readiness",
  readinessRoutes
);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `ElevateU server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );
  }
};

startServer();