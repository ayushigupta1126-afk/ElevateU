
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./CareerPath.css";

const careerOptions = [
  {
    title: "Full Stack Developer",
    icon: "💻",
    category: "WEB DEVELOPMENT",
    description:
      "Build complete web applications using frontend, backend and databases.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    title: "Frontend Developer",
    icon: "🎨",
    category: "WEB DEVELOPMENT",
    description:
      "Create modern, responsive and interactive user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    title: "Backend Developer",
    icon: "⚙️",
    category: "SOFTWARE DEVELOPMENT",
    description:
      "Design APIs, server-side applications and database systems.",
    skills: ["Node.js", "Express.js", "MongoDB", "REST API", "Git"],
  },
  {
    title: "Data Analyst",
    icon: "📊",
    category: "DATA & ANALYTICS",
    description:
      "Analyze data and create meaningful insights for decision making.",
    skills: ["Python", "SQL", "Excel", "Pandas", "Data Visualization"],
  },
  {
    title: "UI/UX Designer",
    icon: "🖌️",
    category: "DESIGN",
    description:
      "Design intuitive digital experiences and user interfaces.",
    skills: ["Figma", "Wireframing", "Prototyping", "UI Design", "UX Research"],
  },
  {
    title: "Mobile App Developer",
    icon: "📱",
    category: "APP DEVELOPMENT",
    description:
      "Build modern applications for mobile platforms.",
    skills: ["JavaScript", "React Native", "APIs", "Git", "UI Design"],
  },
];

export default function CareerPath() {
  const { user, login } = useAuth();

  const [selectedCareer, setSelectedCareer] = useState(
    user?.careerPath || ""
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedCareer(user?.careerPath || "");
  }, [user]);

  const handleSelect = (careerTitle) => {
    setSelectedCareer(careerTitle);
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    if (!selectedCareer) {
      setError("Please select a career path first.");
      setMessage("");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.put("/users/profile", {
        careerPath: selectedCareer,
      });

      const token = localStorage.getItem("elevateu_token");

      if (token && response.data.user) {
        login(response.data.user, token);
      }

      setMessage("Your career path has been saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save career path. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page career-page">
      <section className="career-hero">
        <div className="career-hero-content">
          <span className="career-eyebrow">
            <span className="career-eyebrow-dot" />
            YOUR CAREER JOURNEY
          </span>

          <h1>
            Choose your path.
            <br />
            <span>Build your future.</span>
          </h1>

          <p>
            Discover a career direction that matches your goals.
            Your selection helps ElevateU organize your skill gaps
            and learning roadmap.
          </p>

          <div className="career-hero-tags">
            <span>✦ Define your goals</span>
            <span>✦ Identify key skills</span>
            <span>✦ Track your progress</span>
          </div>
        </div>

        <div className="career-hero-art" aria-hidden="true">
          <div className="career-art-orbit orbit-one" />
          <div className="career-art-orbit orbit-two" />
          <div className="career-art-center">🚀</div>
          <span className="career-art-star career-star-one">✦</span>
          <span className="career-art-star career-star-two">✧</span>
        </div>
      </section>

      <section className="career-selection-section">
        <div className="career-section-heading">
          <div>
            <span className="career-section-label">EXPLORE YOUR OPTIONS</span>
            <h2>Where do you want to go?</h2>
            <p>
              Choose one career path to personalize your learning journey.
            </p>
          </div>

          <span className="career-count-badge">
            {careerOptions.length} career paths
          </span>
        </div>

        <div className="career-options-grid">
          {careerOptions.map((career) => {
            const isSelected = selectedCareer === career.title;

            return (
              <button
                type="button"
                className={`career-option-card ${
                  isSelected ? "career-option-selected" : ""
                }`}
                key={career.title}
                onClick={() => handleSelect(career.title)}
                aria-pressed={isSelected}
              >
                <div className="career-option-top">
                  <div className="career-option-icon">
                    {career.icon}
                  </div>

                  <span
                    className={`career-radio ${
                      isSelected ? "career-radio-active" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </div>

                <span className="career-option-category">
                  {career.category}
                </span>

                <h3>{career.title}</h3>

                <p className="career-option-description">
                  {career.description}
                </p>

                <div className="career-skills-heading">
                  <span>KEY SKILLS</span>
                  <span>{career.skills.length} skills</span>
                </div>

                <div className="career-skill-tags">
                  {career.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="career-option-footer">
                  <span>
                    {isSelected ? "Selected career" : "Select this path"}
                  </span>
                  <span className="career-option-arrow">
                    {isSelected ? "✓" : "↗"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="career-save-panel">
        <div className="career-save-copy">
          <div className="career-save-icon">🎯</div>
          <div>
            <span className="career-section-label">YOUR NEXT STEP</span>
            <h3>
              {selectedCareer || "Choose your career direction"}
            </h3>
            <p>
              {selectedCareer
                ? "Save your selection to update your career profile."
                : "Select a career card above to get started."}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="career-save-button"
          onClick={handleSave}
          disabled={saving || !selectedCareer}
        >
          {saving ? "Saving..." : "Save Career Path"}
          {!saving && <span>→</span>}
        </button>
      </section>

      {message && (
        <div className="career-feedback career-feedback-success" role="status">
          <span>✓</span>
          {message}
        </div>
      )}

      {error && (
        <div className="career-feedback career-feedback-error" role="alert">
          <span>!</span>
          {error}
        </div>
      )}
    </main>
  );
}