import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(user);
  const [skillGap, setSkillGap] = useState(null);
  const [readiness, setReadiness] = useState(null);

  const [loading, setLoading] = useState(true);
  const [skillGapLoading, setSkillGapLoading] = useState(true);
  const [readinessLoading, setReadinessLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profileResponse =
          await api.get("/users/profile");

        setProfile(profileResponse.data.user);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }

      try {
        const skillGapResponse =
          await api.get("/career/skill-gap");

        setSkillGap(skillGapResponse.data);
      } catch (err) {
        setSkillGap(null);
      } finally {
        setSkillGapLoading(false);
      }

      try {
        const readinessResponse =
          await api.get("/readiness");

        setReadiness(readinessResponse.data);
      } catch (err) {
        console.error(
          "Readiness score error:",
          err.response?.data || err.message
        );

        setReadiness(null);
      } finally {
        setReadinessLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="page">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="page">
      {/* Header */}

      <section className="dashboard-header">
        <div>
          <p className="eyebrow">
            STUDENT DASHBOARD
          </p>

          <h1>
            Welcome, {profile?.name || "Student"} 👋
          </h1>

          <p>
            Track your skills, projects, certificates and
            career progress from one place.
          </p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </section>

      {/* Error */}

      {error && (
        <div
          className="card"
          style={{ marginBottom: "25px" }}
        >
          <p style={{ color: "#dc2626" }}>{error}</p>
        </div>
      )}

      {/* Career Readiness Score */}

      <section
        className="dashboard-card"
        style={{
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">
              CAREER READINESS SCORE
            </p>

            <h2
              style={{
                fontSize: "52px",
                margin: "8px 0",
                color: "#4f46e5",
              }}
            >
              {readinessLoading
                ? "..."
                : readiness
                ? `${readiness.score}%`
                : "0%"}
            </h2>

            <h3>
              {readiness?.level ||
                "Start Building Your Career"}
            </h3>

            <p>
              {readiness
                ? "Based on your career path, skills, projects and certificates."
                : "Add your career information to calculate your readiness."}
            </p>
          </div>

          {/* Readiness Circle */}

          {!readinessLoading && readiness && (
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: `conic-gradient(
                  #4f46e5 ${
                    readiness.score * 3.6
                  }deg,
                  #e5e7eb ${
                    readiness.score * 3.6
                  }deg
                )`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "22px",
                  color: "#4f46e5",
                }}
              >
                {readiness.score}%
              </div>
            </div>
          )}
        </div>

        {/* Readiness Breakdown */}

        {readiness?.breakdown && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "18px" }}>
              Score Breakdown
            </h3>

            {/* Career Path */}

            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Career Path</span>

                <strong>
                  {readiness.breakdown.careerPath}/20
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      (readiness.breakdown.careerPath /
                        20) *
                      100
                    }%`,
                    height: "100%",
                    background: "#4f46e5",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            {/* Skills */}

            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Skills</span>

                <strong>
                  {readiness.breakdown.skills}/25
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      (readiness.breakdown.skills /
                        25) *
                      100
                    }%`,
                    height: "100%",
                    background: "#16a34a",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            {/* Projects */}

            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Projects</span>

                <strong>
                  {readiness.breakdown.projects}/25
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      (readiness.breakdown.projects /
                        25) *
                      100
                    }%`,
                    height: "100%",
                    background: "#f59e0b",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            {/* Certificates */}

            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Certificates</span>

                <strong>
                  {readiness.breakdown.certificates}/15
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      (readiness.breakdown.certificates /
                        15) *
                      100
                    }%`,
                    height: "100%",
                    background: "#db2777",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            {/* Advanced Skills */}

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Advanced Skills</span>

                <strong>
                  {readiness.breakdown.advancedSkills}/15
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      (readiness.breakdown
                        .advancedSkills /
                        15) *
                      100
                    }%`,
                    height: "100%",
                    background: "#7c3aed",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "25px" }}>
          <Link to="/profile">
            <button>
              Improve Your Profile
            </button>
          </Link>
        </div>
      </section>

      {/* Existing Skill Gap */}

      <section
        className="dashboard-card"
        style={{
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">
              SKILL GAP ANALYSIS
            </p>

            <h2
              style={{
                fontSize: "52px",
                margin: "8px 0",
                color: "#4f46e5",
              }}
            >
              {skillGapLoading
                ? "..."
                : skillGap
                ? `${skillGap.readinessPercentage}%`
                : "0%"}
            </h2>

            <h3>
              {skillGap?.careerPath ||
                "No Career Path Selected"}
            </h3>

            {skillGap && (
              <p>
                {skillGap.completedSkills.length} of{" "}
                {skillGap.totalRequiredSkills} required
                skills completed.
              </p>
            )}
          </div>

          {skillGap && (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: `conic-gradient(
                  #4f46e5 ${
                    skillGap.readinessPercentage *
                    3.6
                  }deg,
                  #e5e7eb ${
                    skillGap.readinessPercentage *
                    3.6
                  }deg
                )`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#4f46e5",
                }}
              >
                {skillGap.readinessPercentage}%
              </div>
            </div>
          )}
        </div>

        {skillGap?.scoreBreakdown && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "18px" }}>
              Readiness Breakdown
            </h3>

            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Skills</span>

                <strong>
                  {skillGap.scoreBreakdown.skillScore}%
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${skillGap.scoreBreakdown.skillScore}%`,
                    height: "100%",
                    background: "#4f46e5",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Projects</span>

                <strong>
                  {skillGap.scoreBreakdown.projectScore}%
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${skillGap.scoreBreakdown.projectScore}%`,
                    height: "100%",
                    background: "#16a34a",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                }}
              >
                <span>Certificates</span>

                <strong>
                  {
                    skillGap.scoreBreakdown
                      .certificateScore
                  }
                  %
                </strong>
              </div>

              <div
                style={{
                  height: "9px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${skillGap.scoreBreakdown.certificateScore}%`,
                    height: "100%",
                    background: "#f59e0b",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "25px" }}>
          {skillGap ? (
            <>
              <Link to="/skill-gap">
                <button>
                  View Skill Gap
                </button>
              </Link>

              <Link
                to="/roadmap"
                style={{ marginLeft: "10px" }}
              >
                <button className="secondary-btn">
                  View Roadmap
                </button>
              </Link>
            </>
          ) : (
            <Link to="/career-path">
              <button>
                Choose Career Path
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* Dashboard Cards */}

      <section className="dashboard-grid">
        {/* Career */}

        <div className="dashboard-card">
          <span className="card-icon">🎯</span>

          <h3>Career Path</h3>

          <p>
            Your selected career direction.
          </p>

          <strong>
            {profile?.careerPath || "Not selected"}
          </strong>

          <div style={{ marginTop: "15px" }}>
            <Link to="/career-path">
              <button>
                {profile?.careerPath
                  ? "Change Career"
                  : "Choose Career"}
              </button>
            </Link>
          </div>
        </div>

        {/* Skills */}

        <div className="dashboard-card">
          <span className="card-icon">🧠</span>

          <h3>Skills</h3>

          <p>
            Manage your skills and proficiency levels.
          </p>

          <strong>
            {profile?.skills?.length || 0} Skills
          </strong>

          <div style={{ marginTop: "15px" }}>
            <Link to="/skills">
              <button>
                Manage Skills
              </button>
            </Link>
          </div>
        </div>

        {/* Projects */}

        <div className="dashboard-card">
          <span className="card-icon">📁</span>

          <h3>Projects</h3>

          <p>
            Showcase your practical experience.
          </p>

          <strong>
            {profile?.projects?.length || 0} Projects
          </strong>

          <div style={{ marginTop: "15px" }}>
            <Link to="/projects">
              <button>
                Manage Projects
              </button>
            </Link>
          </div>
        </div>

        {/* Certificates */}

        <div className="dashboard-card">
          <span className="card-icon">🏆</span>

          <h3>Certificates</h3>

          <p>
            Keep track of your certifications.
          </p>

          <strong>
            {profile?.certificates?.length || 0} Certificates
          </strong>

          <div style={{ marginTop: "15px" }}>
            <Link to="/certificates">
              <button>
                Manage Certificates
              </button>
            </Link>
          </div>
        </div>

        {/* Skill Gap */}

        <div className="dashboard-card">
          <span className="card-icon">📊</span>

          <h3>Skill Gap</h3>

          <p>
            Discover which skills you need to learn.
          </p>

          <strong>
            {skillGap
              ? `${skillGap.missingSkills.length} Skills Missing`
              : "Analysis Pending"}
          </strong>

          <div style={{ marginTop: "15px" }}>
            <Link to="/skill-gap">
              <button>
                Analyze Skills
              </button>
            </Link>
          </div>
        </div>

        {/* Roadmap */}

        <div className="dashboard-card">
          <span className="card-icon">🗺️</span>

          <h3>Career Roadmap</h3>

          <p>
            Follow your personalized learning roadmap.
          </p>

          <strong>
            {skillGap
              ? `${skillGap.missingSkills.length} Steps`
              : "Not Generated"}
          </strong>

          <div style={{ marginTop: "15px" }}>
            <Link to="/roadmap">
              <button>
                View Roadmap
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}