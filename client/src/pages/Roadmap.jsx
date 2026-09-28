import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Roadmap() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoadmap = async () => {
    try {
      const response = await api.get("/roadmap");

      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to generate career roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Building your personalized roadmap...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <section className="card">
          <h2>Career Roadmap</h2>

          <p
            style={{
              color: "#dc2626",
              marginTop: "12px",
            }}
          >
            {error}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">PERSONALIZED LEARNING</p>

          <h1>Career Roadmap</h1>

          <p>
            Follow these learning steps to develop the skills
            required for your selected career.
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Career:</strong> {data.careerPath}
          </p>
        </div>
      </section>

      {data.roadmap.length === 0 ? (
        <section className="card">
          <h2>🎉 Roadmap Completed</h2>

          <p style={{ marginTop: "12px" }}>
            You currently have all the required skills for this
            career path.
          </p>
        </section>
      ) : (
        <section>
          <h2 style={{ marginBottom: "20px" }}>
            Your Learning Path
          </h2>

          <div className="dashboard-grid">
            {data.roadmap.map((step) => (
              <div
                className="dashboard-card"
                key={step.skill}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#4f46e5",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    marginBottom: "15px",
                  }}
                >
                  {step.step}
                </div>

                <h3>{step.skill}</h3>

                <p>
                  <strong>Level:</strong> {step.level}
                </p>

                <p>
                  <strong>What to learn:</strong>{" "}
                  {step.resource}
                </p>

                <p>
                  <strong>Practice project:</strong>{" "}
                  {step.project}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}