import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function SkillGap() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSkillGap = async () => {
    try {
      const response = await api.get("/career/skill-gap");

      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to generate skill gap analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Analyzing your career readiness...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <section className="card">
          <h2>Skill Gap Analysis</h2>

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
          <p className="eyebrow">CAREER INTELLIGENCE</p>

          <h1>Skill Gap Analysis</h1>

          <p>
            Understand how prepared you are for your selected
            career and discover which skills you should learn
            next.
          </p>
        </div>
      </section>

      {/* Career Readiness */}

      <section
        className="dashboard-card"
        style={{
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">CAREER READINESS</p>

        <h2
          style={{
            fontSize: "56px",
            margin: "10px 0",
            color: "#4f46e5",
          }}
        >
          {data.readinessPercentage}%
        </h2>

        <h3>{data.careerPath}</h3>

        <p>
          {data.completedSkills.length} of{" "}
          {data.totalRequiredSkills} required skills completed.
        </p>
      </section>

      {/* Completed Skills */}

      <section style={{ marginBottom: "35px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          ✓ Completed Skills
        </h2>

        {data.completedSkills.length === 0 ? (
          <div className="card">
            <p>
              No required skills have been completed yet.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {data.completedSkills.map((skill) => (
              <div
                className="dashboard-card"
                key={skill}
              >
                <h3>{skill}</h3>

                <p
                  style={{
                    color: "#16a34a",
                    fontWeight: "600",
                  }}
                >
                  Skill completed
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Missing Skills */}

      <section>
        <h2 style={{ marginBottom: "20px" }}>
          → Skills You Need to Learn
        </h2>

        {data.missingSkills.length === 0 ? (
          <div className="card">
            <h3>All required skills completed! 🎉</h3>

            <p>
              You have covered all the skills currently
              required for this career path.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {data.missingSkills.map((skill) => (
              <div
                className="dashboard-card"
                key={skill}
              >
                <h3>{skill}</h3>

                <p>
                  This skill is required for your selected
                  career path.
                </p>

                <strong
                  style={{
                    color: "#dc2626",
                  }}
                >
                  Skill Gap
                </strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}