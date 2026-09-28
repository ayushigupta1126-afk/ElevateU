import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page">
      {/* Hero Section */}

      <section className="hero">
        <p className="eyebrow">
          PERSONALIZED CAREER DEVELOPMENT PLATFORM
        </p>

        <h1>
          Build Skills.
          <br />
          Build Projects.
          <br />
          Build Your Career.
        </h1>

        <p>
          ElevateU helps students choose a career path,
          identify skill gaps, manage projects and certificates,
          and follow a personalized learning roadmap.
        </p>

        <div className="hero-buttons">
          <Link to="/signup">
            <button>Get Started</button>
          </Link>

          <Link to="/career-path">
            <button className="secondary-btn">
              Explore Career Paths
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}

      <section className="features">
        <div className="card">
          <div className="card-icon">🧠</div>

          <h3>Skill Gap Analysis</h3>

          <p>
            Compare your current skills with the skills required
            for your target career.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">🗺️</div>

          <h3>Personalized Roadmap</h3>

          <p>
            Get a step-by-step learning path based on the skills
            you still need to develop.
          </p>
        </div>

        <div className="card">
          <div className="card-icon">📁</div>

          <h3>Student Portfolio</h3>

          <p>
            Organize your projects, skills and certificates in
            one professional profile.
          </p>
        </div>
      </section>

      {/* How it works */}

      <section
        style={{
          marginTop: "80px",
          maxWidth: "900px",
        }}
      >
        <p className="eyebrow">HOW ELEVATEU WORKS</p>

        <h2
          style={{
            fontSize: "32px",
            marginBottom: "30px",
          }}
        >
          From student profile to career roadmap
        </h2>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>01. Build Your Profile</h3>

            <p>
              Add your skills, projects and certificates to
              create your career profile.
            </p>
          </div>

          <div className="dashboard-card">
            <h3>02. Choose a Career</h3>

            <p>
              Select the career path you want to prepare for.
            </p>
          </div>

          <div className="dashboard-card">
            <h3>03. Find Your Skill Gap</h3>

            <p>
              ElevateU compares your skills with the required
              career skills.
            </p>
          </div>

          <div className="dashboard-card">
            <h3>04. Follow Your Roadmap</h3>

            <p>
              Learn missing skills and complete practical
              projects to improve your career readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}

      <section
        style={{
          marginTop: "80px",
          padding: "45px",
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "14px",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">START YOUR JOURNEY</p>

        <h2
          style={{
            fontSize: "34px",
            marginBottom: "15px",
          }}
        >
          Know where you are.
          <br />
          Know where to go next.
        </h2>

        <p
          style={{
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Create your ElevateU profile and start building a
          clear path toward your career goal.
        </p>

        <div style={{ marginTop: "25px" }}>
          <Link to="/signup">
            <button>Create Your Profile</button>
          </Link>
        </div>
      </section>
    </main>
  );
}