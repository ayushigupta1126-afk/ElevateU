import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import CareerPath from "./pages/CareerPath";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Admin from "./pages/Admin";
import AIAssistant from "./pages/AIAssistant";
import ResumeBuilder from "./pages/ResumeBuilder";
import GitHub from "./pages/GitHub";
import ProjectRecommendations from "./pages/ProjectRecommendations";
import Analytics from "./pages/Analytics";
import PublicProfile from "./pages/PublicProfile";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/public-profile/:id"
          element={<PublicProfile />}
        />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/skills"
            element={<Skills />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/certificates"
            element={<Certificates />}
          />

          <Route
            path="/career-path"
            element={<CareerPath />}
          />

          <Route
            path="/skill-gap"
            element={<SkillGap />}
          />

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          <Route
            path="/ai-assistant"
            element={<AIAssistant />}
          />

          <Route
            path="/resume-builder"
            element={<ResumeBuilder />}
          />

          <Route
            path="/github"
            element={<GitHub />}
          />

          <Route
            path="/project-recommendations"
            element={<ProjectRecommendations />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />
        </Route>

        {/* ================= ADMIN ROUTE ================= */}

        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;