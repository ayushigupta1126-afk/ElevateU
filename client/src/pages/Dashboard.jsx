
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const clampPercent = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(100, Math.max(0, number));
};

function ProgressRow({ label, value, max, color = "indigo" }) {
  const current = clampPercent(
    max > 0 ? (Number(value || 0) / max) * 100 : 0
  );

  return (
    <div className="dbx-progress-row">
      <div className="dbx-progress-label">
        <span>{label}</span>
        <strong>
          {value ?? 0}/{max}
        </strong>
      </div>

      <div
        className="dbx-progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.min(max, Math.max(0, Number(value) || 0))}
      >
        <div
          className={`dbx-progress-fill dbx-${color}`}
          style={{ width: `${current}%` }}
        />
      </div>
    </div>
  );
}

function ScoreRing({ value, size = 118 }) {
  const score = clampPercent(value);

  return (
    <div
      className="dbx-score-ring"
      style={{
        "--score": `${score * 3.6}deg`,
        "--ring-size": `${size}px`,
      }}
      role="img"
      aria-label={`Score: ${score}%`}
    >
      <div className="dbx-score-ring-inner">
        <strong>{score}%</strong>
        <span>Complete</span>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="dbx-section-heading">
      <div>
        <span className="dbx-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  value,
  valueLabel,
  to,
  action,
  accent = "indigo",
}) {
  return (
    <article className={`dbx-feature-card dbx-accent-${accent}`}>
      <div className="dbx-feature-top">
        <span className="dbx-feature-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="dbx-feature-arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="dbx-feature-value">
        <strong>{value}</strong>
        <span>{valueLabel}</span>
      </div>

      <Link className="dbx-card-link" to={to}>
        {action} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(user);
  const [skillGap, setSkillGap] = useState(null);
  const [readiness, setReadiness] = useState(null);

  const [loading, setLoading] = useState(true);
  const [skillGapLoading, setSkillGapLoading] = useState(true);
  const [readinessLoading, setReadinessLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/users/profile");
        if (active) {
          setProfile(response.data.user);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load your profile. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }

      try {
        const response = await api.get("/career/skill-gap");
        if (active) setSkillGap(response.data);
      } catch {
        if (active) setSkillGap(null);
      } finally {
        if (active) setSkillGapLoading(false);
      }

      try {
        const response = await api.get("/readiness");
        if (active) setReadiness(response.data);
      } catch (err) {
        console.error(
          "Readiness score error:",
          err.response?.data || err.message
        );
        if (active) setReadiness(null);
      } finally {
        if (active) setReadinessLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const skillsCount = profile?.skills?.length || 0;
  const projectsCount = profile?.projects?.length || 0;
  const certificatesCount = profile?.certificates?.length || 0;

  const readinessScore = clampPercent(readiness?.score);
  const skillGapScore = clampPercent(
    skillGap?.readinessPercentage
  );

  const completedSkills = skillGap?.completedSkills?.length || 0;
  const totalRequiredSkills = Number(
    skillGap?.totalRequiredSkills || 0
  );
  const missingSkillsCount = skillGap?.missingSkills?.length || 0;

  if (loading) {
    return (
      <main className="page dbx-page">
        <div className="dbx-loading-card" role="status" aria-live="polite">
          <span className="dbx-spinner" />
          <h2>Preparing your dashboard</h2>
          <p>Loading your profile and career progress...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page dbx-page">
      {/* Dashboard header */}
      <section className="dbx-welcome">
        <div className="dbx-welcome-content">
          <span className="dbx-eyebrow">
            <span className="dbx-status-dot" />
            YOUR PERSONAL DASHBOARD
          </span>

          <h1>
            Welcome back,{" "}
            <span>{profile?.name || user?.name || "Student"}</span>
            <span aria-hidden="true"> 👋</span>
          </h1>

          <p>
            Your next opportunity starts here. Track your skills,
            build projects and keep moving towards your career goals.
          </p>

          <div className="dbx-welcome-actions">
            <Link className="dbx-btn dbx-btn-primary" to="/profile">
              Complete your profile <span aria-hidden="true">→</span>
            </Link>
            <Link className="dbx-btn dbx-btn-light" to="/projects">
              Explore projects
            </Link>
          </div>
        </div>

        <div className="dbx-welcome-decoration" aria-hidden="true">
          <div className="dbx-decoration-orbit dbx-orbit-one" />
          <div className="dbx-decoration-orbit dbx-orbit-two" />
          <div className="dbx-decoration-center">E</div>
          <span className="dbx-decoration-star">✦</span>
          <span className="dbx-decoration-spark">✧</span>
        </div>
      </section>

      {error && (
        <div className="dbx-alert" role="alert">
          <span aria-hidden="true">!</span>
          <div>
            <strong>Profile could not be loaded</strong>
            <p>{error}</p>
          </div>
          <button
            type="button"
            className="dbx-alert-link"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {/* Overview statistics */}
      <section className="dbx-stats-grid" aria-label="Your progress overview">
        <article className="dbx-stat-card">
          <div className="dbx-stat-icon dbx-stat-purple">◎</div>
          <div>
            <span>Career readiness</span>
            <strong>
              {readinessLoading ? "—" : readiness ? `${readinessScore}%` : "—"}
            </strong>
            <small>
              {readinessLoading
                ? "Calculating score..."
                : readiness?.level || "Complete your career details"}
            </small>
          </div>
        </article>

        <article className="dbx-stat-card">
          <div className="dbx-stat-icon dbx-stat-blue">⌘</div>
          <div>
            <span>Skills added</span>
            <strong>{skillsCount}</strong>
            <small>Skills in your profile</small>
          </div>
        </article>

        <article className="dbx-stat-card">
          <div className="dbx-stat-icon dbx-stat-green">▧</div>
          <div>
            <span>Projects</span>
            <strong>{projectsCount}</strong>
            <small>Projects in your portfolio</small>
          </div>
        </article>

        <article className="dbx-stat-card">
          <div className="dbx-stat-icon dbx-stat-orange">✧</div>
          <div>
            <span>Certificates</span>
            <strong>{certificatesCount}</strong>
            <small>Certificates in your profile</small>
          </div>
        </article>
      </section>

      {/* Main score panels */}
      <section className="dbx-score-grid">
        <article className="dbx-panel dbx-readiness-panel">
          <SectionHeading
            eyebrow="YOUR PROGRESS"
            title="Career readiness"
            description="See how prepared your profile is for your chosen career."
          />

          {readinessLoading ? (
            <div className="dbx-inline-loading">
              <span className="dbx-spinner" /> Calculating your score...
            </div>
          ) : readiness ? (
            <>
              <div className="dbx-score-summary">
                <div>
                  <span className="dbx-score-caption">Overall score</span>
                  <div className="dbx-big-score">
                    {readinessScore}<span>%</span>
                  </div>
                  <span className="dbx-level-badge">
                    {readiness.level || "In progress"}
                  </span>
                </div>
                <ScoreRing value={readinessScore} />
              </div>

              {readiness.breakdown && (
                <div className="dbx-breakdown">
                  <h3>Score breakdown</h3>
                  <ProgressRow
                    label="Career path"
                    value={readiness.breakdown.careerPath}
                    max={20}
                    color="indigo"
                  />
                  <ProgressRow
                    label="Skills"
                    value={readiness.breakdown.skills}
                    max={25}
                    color="green"
                  />
                  <ProgressRow
                    label="Projects"
                    value={readiness.breakdown.projects}
                    max={25}
                    color="orange"
                  />
                  <ProgressRow
                    label="Certificates"
                    value={readiness.breakdown.certificates}
                    max={15}
                    color="pink"
                  />
                  <ProgressRow
                    label="Advanced skills"
                    value={readiness.breakdown.advancedSkills}
                    max={15}
                    color="purple"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="dbx-empty-state">
              <span aria-hidden="true">◎</span>
              <h3>Your career score starts here</h3>
              <p>
                Add your career information, skills and projects to
                calculate your readiness score.
              </p>
              <Link className="dbx-btn dbx-btn-primary" to="/profile">
                Improve your profile
              </Link>
            </div>
          )}

          {readiness && (
            <Link className="dbx-text-link" to="/profile">
              Improve your profile <span aria-hidden="true">→</span>
            </Link>
          )}
        </article>

        <article className="dbx-panel dbx-skill-panel">
          <SectionHeading
            eyebrow="CAREER PLANNING"
            title="Skill gap analysis"
            description="Understand your progress towards your target role."
          />

          {skillGapLoading ? (
            <div className="dbx-inline-loading">
              <span className="dbx-spinner" /> Analysing your skills...
            </div>
          ) : skillGap ? (
            <>
              <div className="dbx-skill-summary">
                <div>
                  <span className="dbx-score-caption">Skills readiness</span>
                  <div className="dbx-big-score">
                    {skillGapScore}<span>%</span>
                  </div>
                  <strong className="dbx-career-name">
                    {skillGap.careerPath || "Selected career"}
                  </strong>
                </div>
                <ScoreRing value={skillGapScore} size={104} />
              </div>

              <div className="dbx-skill-counts">
                <div>
                  <span className="dbx-count-indicator dbx-count-green" />
                  <strong>{completedSkills}</strong>
                  <span>Skills completed</span>
                </div>
                <div>
                  <span className="dbx-count-indicator dbx-count-orange" />
                  <strong>{missingSkillsCount}</strong>
                  <span>Skills to learn</span>
                </div>
              </div>

              {skillGap.scoreBreakdown && (
                <div className="dbx-breakdown">
                  <h3>Readiness breakdown</h3>
                  <ProgressRow
                    label="Skills"
                    value={skillGap.scoreBreakdown.skillScore}
                    max={100}
                    color="indigo"
                  />
                  <ProgressRow
                    label="Projects"
                    value={skillGap.scoreBreakdown.projectScore}
                    max={100}
                    color="green"
                  />
                  <ProgressRow
                    label="Certificates"
                    value={skillGap.scoreBreakdown.certificateScore}
                    max={100}
                    color="orange"
                  />
                </div>
              )}

              {totalRequiredSkills > 0 && (
                <p className="dbx-supporting-text">
                  {completedSkills} of {totalRequiredSkills} required
                  skills completed.
                </p>
              )}

              <div className="dbx-panel-actions">
                <Link className="dbx-btn dbx-btn-primary" to="/skill-gap">
                  View skill gaps
                </Link>
                <Link className="dbx-btn dbx-btn-outline" to="/roadmap">
                  View roadmap
                </Link>
              </div>
            </>
          ) : (
            <div className="dbx-empty-state">
              <span aria-hidden="true">⌁</span>
              <h3>Choose your career direction</h3>
              <p>
                Select a career path to see required skills and your
                learning progress.
              </p>
              <Link className="dbx-btn dbx-btn-primary" to="/career-path">
                Choose career path
              </Link>
            </div>
          )}
        </article>
      </section>

      {/* Feature navigation */}
      <section className="dbx-features-section">
        <SectionHeading
          eyebrow="YOUR WORKSPACE"
          title="Build your career profile"
          description="Everything you need to organise your learning and showcase your work."
        />

        <div className="dbx-features-grid">
          <FeatureCard
            icon="◎"
            title="Career path"
            description="Choose and manage your target career direction."
            value={profile?.careerPath || "Not selected"}
            valueLabel="Current direction"
            to="/career-path"
            action={profile?.careerPath ? "Change career" : "Choose career"}
            accent="indigo"
          />

          <FeatureCard
            icon="⌘"
            title="My skills"
            description="Record your skills and proficiency levels."
            value={skillsCount}
            valueLabel={skillsCount === 1 ? "Skill added" : "Skills added"}
            to="/skills"
            action="Manage skills"
            accent="blue"
          />

          <FeatureCard
            icon="▧"
            title="My projects"
            description="Showcase the projects you have built."
            value={projectsCount}
            valueLabel={projectsCount === 1 ? "Project added" : "Projects added"}
            to="/projects"
            action="Manage projects"
            accent="green"
          />

          <FeatureCard
            icon="✧"
            title="Certificates"
            description="Keep your course and achievement records together."
            value={certificatesCount}
            valueLabel={
              certificatesCount === 1 ? "Certificate added" : "Certificates added"
            }
            to="/certificates"
            action="Manage certificates"
            accent="orange"
          />

          <FeatureCard
            icon="⌁"
            title="Skill gap"
            description="Identify the skills required for your target role."
            value={skillGapLoading ? "—" : skillGap ? missingSkillsCount : "—"}
            valueLabel="Skills to learn"
            to="/skill-gap"
            action="Analyse skills"
            accent="pink"
          />

          <FeatureCard
            icon="↗"
            title="Career roadmap"
            description="Explore the next steps in your learning journey."
            value={skillGap ? `${missingSkillsCount}` : "Ready when you are"}
            valueLabel={skillGap ? "Skills to work on" : "Choose a career first"}
            to="/roadmap"
            action="View roadmap"
            accent="purple"
          />
        </div>
      </section>

      {/* Bottom call to action */}
      <section className="dbx-bottom-cta">
        <div>
          <span className="dbx-eyebrow">ONE STEP AT A TIME</span>
          <h2>Your next milestone is waiting.</h2>
          <p>
            Keep your profile updated and turn what you learn into
            projects you can showcase.
          </p>
        </div>

        <Link className="dbx-btn dbx-btn-white" to="/profile">
          Update my profile <span aria-hidden="true">→</span>
        </Link>
      </section>

      <footer className="dbx-footer">
        <span>ElevateU</span>
        <span>Build skills. Track progress. Shape your future.</span>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </footer>
    </main>
  );
}