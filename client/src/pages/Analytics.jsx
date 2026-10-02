
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Analytics.css";

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

        setAnalytics(analyticsResponse.data.analytics);
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
      <main className="page analytics-page">
        <div className="analytics-state-card">
          <div className="analytics-spinner" />
          <h2>Preparing your analytics</h2>
          <p>Gathering your career progress...</p>
        </div>
      </main>
    );
  }

  if (error || !analytics) {
    return (
      <main className="page analytics-page">
        <div className="analytics-state-card analytics-error">
          <div className="analytics-state-icon">!</div>
          <h2>Analytics unavailable</h2>
          <p>{error || "No analytics data was returned."}</p>
          <button
            className="analytics-primary-button"
            onClick={() => window.location.reload()}
          >
            Try again ↻
          </button>
        </div>
      </main>
    );
  }

  const readinessScore = clamp(readiness?.score);
  const requiredSkills = Number(analytics.requiredSkillsCount) || 0;
  const completedSkills = Number(analytics.completedRequiredSkills) || 0;
  const skillCompletion = requiredSkills > 0
    ? clamp((completedSkills / requiredSkills) * 100)
    : 0;

  const stats = [
    {
      icon: "🧠",
      title: "Total Skills",
      value: analytics.totalSkills ?? 0,
      subtitle: "Skills added",
      color: "violet",
    },
    {
      icon: "📁",
      title: "Projects",
      value: analytics.totalProjects ?? 0,
      subtitle: "Projects recorded",
      color: "blue",
    },
    {
      icon: "🏆",
      title: "Certificates",
      value: analytics.totalCertificates ?? 0,
      subtitle: "Certificates earned",
      color: "amber",
    },
    {
      icon: "📈",
      title: "Overall Progress",
      value: `${clamp(analytics.overallProgress)}%`,
      subtitle: "Overall development",
      color: "green",
    },
  ];

  const progressItems = [
    { title: "Skills Progress", value: analytics.skillProgress, icon: "🧠" },
    { title: "Projects Progress", value: analytics.projectProgress, icon: "📁" },
    {
      title: "Certificate Progress",
      value: analytics.certificateProgress,
      icon: "🏆",
    },
  ];

  const scoreItems = [
    { title: "Career Path", score: readiness?.breakdown?.careerPath, max: 20, icon: "🎯" },
    { title: "Skills", score: readiness?.breakdown?.skills, max: 25, icon: "🧠" },
    { title: "Projects", score: readiness?.breakdown?.projects, max: 25, icon: "📁" },
    { title: "Certificates", score: readiness?.breakdown?.certificates, max: 15, icon: "🏆" },
    {
      title: "Advanced Skills",
      score: readiness?.breakdown?.advancedSkills,
      max: 15,
      icon: "⚡",
    },
  ];

  return (
    <main className="page analytics-page">
      <section className="analytics-hero">
        <div className="analytics-hero-content">
          <span className="analytics-eyebrow">
            <span className="analytics-live-dot" />
            YOUR PERSONAL DASHBOARD
          </span>

          <h1>
            Your progress.
            <br />
            <span>Your next milestone.</span>
          </h1>

          <p>
            See how your skills, projects and certificates contribute
            to your career development.
          </p>

          <div className="analytics-hero-tags">
            <span>✦ Skills</span>
            <span>✦ Projects</span>
            <span>✦ Career readiness</span>
          </div>
        </div>

        <div className="analytics-hero-art" aria-hidden="true">
          <div className="analytics-art-circle circle-one" />
          <div className="analytics-art-circle circle-two" />
          <div className="analytics-art-center">
            <span>↗</span>
            <small>GROW</small>
          </div>
          <span className="analytics-art-star star-one">✦</span>
          <span className="analytics-art-star star-two">✧</span>
        </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-section-heading">
          <div>
            <span className="analytics-section-label">YOUR OVERVIEW</span>
            <h2>Career at a glance</h2>
            <p>A snapshot of your current profile.</p>
          </div>
          <span className="analytics-profile-badge">✦ ElevateU</span>
        </div>

        <div className="analytics-profile-card">
          <div className="analytics-profile-avatar">
            {(analytics.userName || "U").trim().charAt(0).toUpperCase()}
          </div>
          <div className="analytics-profile-info">
            <span>Your profile</span>
            <h3>{analytics.userName || "Learner"}</h3>
            <p>
              Career path:{" "}
              <strong>{analytics.careerPath || "Not selected"}</strong>
            </p>
          </div>
          <div className="analytics-profile-status">
            <span className="analytics-live-dot" />
            Progress overview
          </div>
        </div>

        <div className="analytics-stats-grid">
          {stats.map((stat) => (
            <article
              className={`analytics-stat-card stat-${stat.color}`}
              key={stat.title}
            >
              <div className="analytics-stat-top">
                <span className="analytics-stat-icon">{stat.icon}</span>
                <span className="analytics-stat-mark">↗</span>
              </div>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
              <span className="analytics-stat-subtitle">{stat.subtitle}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="analytics-readiness-card">
        <div className="analytics-readiness-copy">
          <span className="analytics-section-label">CAREER READINESS</span>
          <h2>Keep building your future.</h2>
          <p>
            Your readiness score reflects the factors tracked by
            your ElevateU profile.
          </p>

          <div className="analytics-readiness-level">
            <span>Current level</span>
            <strong>{readiness?.level || "Getting Started"}</strong>
          </div>

          <div className="analytics-readiness-note">
            <span>✦</span>
            <p>Continue updating your skills and projects as you progress.</p>
          </div>
        </div>

        <div
          className="analytics-readiness-ring"
          style={{
            "--readiness-angle": `${readinessScore * 3.6}deg`,
          }}
          role="img"
          aria-label={`Career readiness ${readinessScore} percent`}
        >
          <div className="analytics-readiness-ring-inner">
            <strong>{readinessScore}%</strong>
            <span>Readiness</span>
          </div>
        </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-section-heading">
          <div>
            <span className="analytics-section-label">DEVELOPMENT TRACKER</span>
            <h2>Progress breakdown</h2>
            <p>Review the progress values returned by your account.</p>
          </div>
        </div>

        <div className="analytics-progress-card">
          {progressItems.map((item) => (
            <ProgressBar key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-section-heading">
          <div>
            <span className="analytics-section-label">CAREER SKILLS</span>
            <h2>Required skill completion</h2>
            <p>Track your completed required career skills.</p>
          </div>
        </div>

        <div className="analytics-completion-card">
          <div className="analytics-completion-top">
            <div className="analytics-completion-icon">🎯</div>
            <div className="analytics-completion-copy">
              <h3>Skills milestone</h3>
              <p>
                {completedSkills} of {requiredSkills} required skills completed
              </p>
            </div>
            <strong>{Math.round(skillCompletion)}%</strong>
          </div>

          <div
            className="analytics-progress-track analytics-completion-track"
            role="progressbar"
            aria-valuenow={Math.round(skillCompletion)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Required skill completion"
          >
            <div
              className="analytics-progress-fill fill-violet"
              style={{ width: `${skillCompletion}%` }}
            />
          </div>

          {requiredSkills === 0 && (
            <p className="analytics-small-note">
              No required skills are currently listed for this calculation.
            </p>
          )}
        </div>
      </section>

      {readiness?.breakdown && (
        <section className="analytics-section">
          <div className="analytics-section-heading">
            <div>
              <span className="analytics-section-label">SCORE DETAILS</span>
              <h2>Readiness breakdown</h2>
              <p>See how each category contributes to your score.</p>
            </div>
          </div>

          <div className="analytics-score-grid">
            {scoreItems.map((item) => (
              <ScoreItem key={item.title} {...item} />
            ))}
          </div>

          <p className="analytics-small-note">
            Category maximums are shown separately. Your overall score
            follows the value returned by the readiness API.
          </p>
        </section>
      )}
    </main>
  );
}

function clamp(value) {
  const number = Number(value) || 0;
  return Math.min(Math.max(number, 0), 100);
}

function ProgressBar({ title, value, icon }) {
  const safeValue = clamp(value);

  return (
    <div className="analytics-progress-item">
      <div className="analytics-progress-heading">
        <div className="analytics-progress-label">
          <span>{icon}</span>
          <strong>{title}</strong>
        </div>
        <strong>{safeValue}%</strong>
      </div>

      <div
        className="analytics-progress-track"
        role="progressbar"
        aria-label={title}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="analytics-progress-fill"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

function ScoreItem({ title, score, max, icon }) {
  const numericScore = Number(score) || 0;
  const percentage = max > 0
    ? Math.min(Math.max((numericScore / max) * 100, 0), 100)
    : 0;

  return (
    <article className="analytics-score-card">
      <div className="analytics-score-top">
        <span className="analytics-score-icon">{icon}</span>
        <span className="analytics-score-max">MAX {max}</span>
      </div>

      <h3>{title}</h3>
      <div className="analytics-score-number">
        <strong>{numericScore}</strong>
        <span> / {max}</span>
      </div>

      <div className="analytics-progress-track">
        <div
          className="analytics-progress-fill fill-violet"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </article>
  );
}