
import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "◎",
    title: "Skill Gap Analysis",
    description:
      "Compare your current abilities with your target career and discover which skills to develop next.",
    tag: "Know your gaps",
  },
  {
    icon: "↗",
    title: "Personalized Roadmap",
    description:
      "Turn your career goal into manageable learning steps and track your progress along the way.",
    tag: "Plan your growth",
  },
  {
    icon: "▤",
    title: "Project Portfolio",
    description:
      "Organize your projects, technical skills and certificates in one professional profile.",
    tag: "Show your work",
  },
];

const steps = [
  {
    number: "01",
    title: "Build your profile",
    description: "Add your skills, projects and certificates.",
  },
  {
    number: "02",
    title: "Choose your direction",
    description: "Explore a career path that matches your goals.",
  },
  {
    number: "03",
    title: "Understand your gaps",
    description: "Identify the skills you still need to develop.",
  },
  {
    number: "04",
    title: "Follow your roadmap",
    description: "Turn your next steps into achievable goals.",
  },
];

function DashboardPreview() {
  return (
    <div
      className="eu-preview"
      aria-label="Illustrative preview of the ElevateU dashboard"
    >
      <div className="eu-preview-top">
        <div className="eu-preview-brand">
          <span className="eu-brand-mark">E</span>
          <span>ElevateU</span>
        </div>
        <span className="eu-preview-label">DASHBOARD PREVIEW</span>
      </div>

      <div className="eu-preview-content">
        <p className="eu-preview-muted">YOUR CAREER JOURNEY</p>
        <h3>Your next step starts here.</h3>
        <p className="eu-preview-subtitle">
          Build skills with a clear direction.
        </p>

        <div className="eu-preview-stats">
          <div className="eu-stat">
            <span className="eu-stat-icon purple">✳</span>
            <span className="eu-stat-label">Skills</span>
            <strong>Track</strong>
            <small>Your skill profile</small>
          </div>

          <div className="eu-stat">
            <span className="eu-stat-icon green">↗</span>
            <span className="eu-stat-label">Projects</span>
            <strong>Build</strong>
            <small>Show what you know</small>
          </div>
        </div>

        <div className="eu-roadmap-card">
          <div className="eu-roadmap-heading">
            <div>
              <span className="eu-preview-muted">
                YOUR LEARNING PLAN
              </span>
              <h4>Career roadmap</h4>
            </div>
            <span className="eu-roadmap-icon">→</span>
          </div>

          <div className="eu-roadmap-line">
            <span className="eu-roadmap-dot active">1</span>
            <div>
              <strong>Identify your skills</strong>
              <small>Understand your starting point</small>
            </div>
          </div>

          <div className="eu-roadmap-line">
            <span className="eu-roadmap-dot">2</span>
            <div>
              <strong>Learn and practice</strong>
              <small>Build skills through projects</small>
            </div>
          </div>

          <div className="eu-roadmap-line">
            <span className="eu-roadmap-dot">3</span>
            <div>
              <strong>Show your progress</strong>
              <small>Grow your professional portfolio</small>
            </div>
          </div>
        </div>
      </div>

      <div className="eu-preview-footer">
        <span className="eu-footer-dot" />
        Your career. Your next step.
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="page eu-home">
      <section className="eu-hero">
        <div className="eu-hero-copy">
          <div className="eu-announcement">
            <span>✦</span> YOUR CAREER, WITH DIRECTION
          </div>

          <h1>
            Your potential.
            <br />
            <span>Your next level.</span>
          </h1>

          <p className="eu-hero-description">
            Build meaningful skills, work on real projects and
            create a clearer path towards the career you want.
            Keep your progress in one place with ElevateU.
          </p>

          <div className="eu-hero-actions">
            <Link to="/signup" className="eu-btn eu-btn-primary">
              Get started <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/login"
              className="eu-btn eu-btn-secondary"
            >
              Explore your dashboard
            </Link>
          </div>

          <div className="eu-trust-note">
            <span aria-hidden="true">✓</span>
            Skills · Projects · Career planning
          </div>
        </div>

        <div className="eu-hero-visual">
          <div className="eu-orb eu-orb-one" />
          <div className="eu-orb eu-orb-two" />
          <DashboardPreview />
          <div className="eu-floating-note">
            <span className="eu-floating-icon">✦</span>
            <span>
              <strong>Keep growing</strong>
              <small>One step at a time</small>
            </span>
          </div>
        </div>
      </section>

      <section className="eu-features-section">
        <div className="eu-section-heading">
          <p className="eyebrow">EVERYTHING IN ONE PLACE</p>
          <h2>Make your next move a clear one.</h2>
          <p>
            Turn your career ambitions into skills, projects
            and progress you can actually demonstrate.
          </p>
        </div>

        <div className="eu-features">
          {features.map((feature) => (
            <article className="eu-feature-card" key={feature.title}>
              <div className="eu-feature-icon">{feature.icon}</div>
              <span className="eu-feature-tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="eu-process-section">
        <div className="eu-process-intro">
          <p className="eyebrow">HOW ELEVATEU WORKS</p>
          <h2>From where you are to where you want to be.</h2>
          <p>
            A practical process to help you understand your
            strengths, identify opportunities and keep moving.
          </p>
          <Link to="/signup" className="eu-text-link">
            Start building your profile <span>→</span>
          </Link>
        </div>

        <div className="eu-steps">
          {steps.map((step) => (
            <article className="eu-step" key={step.number}>
              <span className="eu-step-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <span className="eu-step-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="eu-final-cta">
        <div className="eu-cta-decoration" aria-hidden="true">
          ✳
        </div>
        <p className="eu-cta-label">YOUR JOURNEY STARTS HERE</p>
        <h2>
          Make progress.
          <br />
          Build your future.
        </h2>
        <p>
          Create your profile and start turning your career
          goals into practical next steps.
        </p>
        <Link to="/signup" className="eu-btn eu-btn-light">
          Create your profile <span>→</span>
        </Link>
      </section>

      <footer className="eu-footer">
        <Link to="/" className="eu-footer-brand">
          <span className="eu-brand-mark">E</span>
          ElevateU
        </Link>
        <span>Build skills. Build projects. Build your career.</span>
      </footer>
    </main>
  );
}