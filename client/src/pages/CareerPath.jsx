import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const careerOptions = [
  {
    title: "Full Stack Developer",
    description:
      "Build complete web applications using frontend, backend and databases.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    title: "Frontend Developer",
    description:
      "Create modern, responsive and interactive user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    title: "Backend Developer",
    description:
      "Design APIs, server-side applications and database systems.",
    skills: ["Node.js", "Express.js", "MongoDB", "REST API", "Git"],
  },
  {
    title: "Data Analyst",
    description:
      "Analyze data and create meaningful insights for decision making.",
    skills: ["Python", "SQL", "Excel", "Pandas", "Data Visualization"],
  },
  {
    title: "UI/UX Designer",
    description:
      "Design intuitive digital experiences and user interfaces.",
    skills: ["Figma", "Wireframing", "Prototyping", "UI Design", "UX Research"],
  },
  {
    title: "Mobile App Developer",
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

  const handleSave = async () => {
    if (!selectedCareer) {
      setError("Please select a career path first.");
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

      if (token) {
        login(response.data.user, token);
      }

      setMessage("Career path saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save career path."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">CAREER DIRECTION</p>

          <h1>Choose Your Career Path</h1>

          <p>
            Select your target career and ElevateU will use it
            to identify skill gaps and build your personalized
            learning roadmap.
          </p>
        </div>
      </section>

      {message && (
        <p
          style={{
            color: "#16a34a",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {message}
        </p>
      )}

      {error && (
        <p
          style={{
            color: "#dc2626",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {error}
        </p>
      )}

      <section className="dashboard-grid">
        {careerOptions.map((career) => {
          const isSelected =
            selectedCareer === career.title;

          return (
            <div
              className="dashboard-card"
              key={career.title}
              onClick={() =>
                setSelectedCareer(career.title)
              }
              style={{
                cursor: "pointer",
                border: isSelected
                  ? "2px solid #4f46e5"
                  : "1px solid #e5e7eb",
                transform: isSelected
                  ? "translateY(-3px)"
                  : "none",
                transition: "all 0.2s ease",
              }}
            >
              <h3>{career.title}</h3>

              <p>{career.description}</p>

              <p>
                <strong>Key Skills</strong>
              </p>

              <p>
                {career.skills.join(" • ")}
              </p>

              {isSelected && (
                <strong
                  style={{
                    color: "#4f46e5",
                  }}
                >
                  ✓ Selected
                </strong>
              )}
            </div>
          );
        })}
      </section>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Career Path"}
        </button>
      </div>
    </main>
  );
}