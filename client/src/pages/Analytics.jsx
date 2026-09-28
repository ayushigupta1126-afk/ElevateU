import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [readiness, setReadiness] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [analyticsResponse, readinessResponse] =
          await Promise.all([
            api.get("/analytics"),
            api.get("/readiness"),
          ]);

        setAnalytics(
          analyticsResponse.data.analytics
        );

        setReadiness(readinessResponse.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Loading analytics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <section
          className="dashboard-card"
          style={{
            maxWidth: "900px",
            margin: "30px auto",
            background: "#fee2e2",
            color: "#b91c1c",
          }}
        >
          {error}
        </section>
      </main>
    );
  }

  const readinessScore = readiness?.score || 0;

  return (
    <main className="page">
      {/* Header */}

      <section className="dashboard-header">
        <div>
          <p className="eyebrow">
            PROGRESS ANALYTICS
          </p>

          <h1>Your Career Progress</h1>

          <p>
            Track your skills, projects, certificates
            and overall career development.
          </p>
        </div>
      </section>

      {/* Career Readiness */}

      <section
        className="dashboard-card"
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">
              CAREER READINESS
            </p>

            <h2
              style={{
                fontSize: "52px",
                margin: "8px 0",
                color: "#4f46e5",
              }}
            >
              {readinessScore}%
            </h2>

            <h3>
              {readiness?.level ||
                "Getting Started"}
            </h3>

            <p>
              Your score is calculated from your career
              path, skills, projects and certificates.
            </p>
          </div>

          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: `conic-gradient(
                #4f46e5 ${readinessScore * 3.6}deg,
                #e5e7eb ${readinessScore * 3.6}deg
              )`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "105px",
                height: "105px",
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "700",
                color: "#4f46e5",
              }}
            >
              {readinessScore}%
            </div>
          </div>
        </div>
      </section>

      {/* User Overview */}

      <section
        className="dashboard-card"
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >
        <h2>{analytics.userName}</h2>

        <p style={{ marginTop: "5px" }}>
          Career Path:{" "}
          <strong>
            {analytics.careerPath ||
              "Not selected"}
          </strong>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "18px",
            marginTop: "25px",
          }}
        >
          {/* Skills */}

          <div className="dashboard-card">
            <span className="card-icon">
              🧠
            </span>

            <h3>Skills</h3>

            <p
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginTop: "8px",
              }}
            >
              {analytics.totalSkills}
            </p>

            <small>
              Skills added
            </small>
          </div>

          {/* Projects */}

          <div className="dashboard-card">
            <span className="card-icon">
              📁
            </span>

            <h3>Projects</h3>

            <p
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginTop: "8px",
              }}
            >
              {analytics.totalProjects}
            </p>

            <small>
              Projects completed
            </small>
          </div>

          {/* Certificates */}

          <div className="dashboard-card">
            <span className="card-icon">
              🏆
            </span>

            <h3>Certificates</h3>

            <p
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginTop: "8px",
              }}
            >
              {analytics.totalCertificates}
            </p>

            <small>
              Certificates earned
            </small>
          </div>

          {/* Overall Progress */}

          <div className="dashboard-card">
            <span className="card-icon">
              📈
            </span>

            <h3>Overall Progress</h3>

            <p
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginTop: "8px",
              }}
            >
              {analytics.overallProgress}%
            </p>

            <small>
              Overall development
            </small>
          </div>
        </div>
      </section>

      {/* Progress Breakdown */}

      <section
        className="dashboard-card"
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >
        <h2>Progress Breakdown</h2>

        <div
          style={{
            display: "grid",
            gap: "24px",
            marginTop: "25px",
          }}
        >
          {/* Skills */}

          <ProgressBar
            title="Skills Progress"
            value={analytics.skillProgress}
          />

          {/* Projects */}

          <ProgressBar
            title="Projects Progress"
            value={analytics.projectProgress}
          />

          {/* Certificates */}

          <ProgressBar
            title="Certificate Progress"
            value={
              analytics.certificateProgress
            }
          />
        </div>
      </section>

      {/* Skill Completion */}

      <section
        className="dashboard-card"
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >
        <p className="eyebrow">
          CAREER SKILLS
        </p>

        <h2>Skill Completion</h2>

        <p style={{ marginTop: "10px" }}>
          You have completed{" "}
          <strong>
            {analytics.completedRequiredSkills}
          </strong>{" "}
          out of{" "}
          <strong>
            {analytics.requiredSkillsCount}
          </strong>{" "}
          required career skills.
        </p>

        {analytics.requiredSkillsCount > 0 && (
          <div
            style={{
              marginTop: "20px",
              height: "14px",
              background: "#e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${
                  (analytics.completedRequiredSkills /
                    analytics.requiredSkillsCount) *
                  100
                }%`,
                height: "100%",
                background: "#4f46e5",
              }}
            />
          </div>
        )}
      </section>

      {/* Readiness Breakdown */}

      {readiness?.breakdown && (
        <section
          className="dashboard-card"
          style={{
            maxWidth: "1000px",
            margin: "30px auto",
          }}
        >
          <p className="eyebrow">
            SCORE DETAILS
          </p>

          <h2>
            Readiness Breakdown
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "18px",
              marginTop: "25px",
            }}
          >
            <ScoreItem
              title="Career Path"
              score={
                readiness.breakdown.careerPath
              }
              max={20}
            />

            <ScoreItem
              title="Skills"
              score={
                readiness.breakdown.skills
              }
              max={25}
            />

            <ScoreItem
              title="Projects"
              score={
                readiness.breakdown.projects
              }
              max={25}
            />

            <ScoreItem
              title="Certificates"
              score={
                readiness.breakdown.certificates
              }
              max={15}
            />

            <ScoreItem
              title="Advanced Skills"
              score={
                readiness.breakdown
                  .advancedSkills
              }
              max={15}
            />
          </div>
        </section>
      )}
    </main>
  );
}

/* Progress Bar */

function ProgressBar({ title, value }) {
  const safeValue = Math.min(
    Math.max(value || 0, 0),
    100
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <strong>{title}</strong>

        <span>{safeValue}%</span>
      </div>

      <div
        style={{
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${safeValue}%`,
            height: "100%",
            background: "#4f46e5",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}

/* Score Item */

function ScoreItem({ title, score, max }) {
  const percentage =
    max > 0 ? (score / max) * 100 : 0;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <h3>{title}</h3>

      <p
        style={{
          fontSize: "25px",
          fontWeight: "700",
          margin: "8px 0",
          color: "#4f46e5",
        }}
      >
        {score}/{max}
      </p>

      <div
        style={{
          height: "8px",
          background: "#e5e7eb",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "#4f46e5",
          }}
        />
      </div>
    </div>
  );
}