import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./SkillGap.css";

const getSkillName = (skill) => {
  if (typeof skill === "string") return skill;

  return (
    skill?.name ||
    skill?.skillName ||
    skill?.skill?.name ||
    skill?.skillId?.name ||
    "Unnamed skill"
  );
};

const getSkillLevel = (skill) =>
  skill?.proficiency || skill?.level || skill?.status || "To learn";

function SkillGap() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadAnalysis = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/career/skill-gap");
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "We couldn't load your skill analysis. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  const completedSkills = Array.isArray(data?.completedSkills)
    ? data.completedSkills
    : [];

  const missingSkills = Array.isArray(data?.missingSkills)
    ? data.missingSkills
    : [];

  const totalSkills = Number(
    data?.totalRequiredSkills ??
      completedSkills.length + missingSkills.length
  );

  const percentage = Math.max(
    0,
    Math.min(
      100,
      Number(data?.readinessPercentage) || 0
    )
  );

  const filteredSkills = useMemo(() => {
    const completed = completedSkills.map((skill) => ({
      ...((typeof skill === "object" && skill) || {}),
      name: getSkillName(skill),
      level: getSkillLevel(skill),
      status: "completed",
    }));

    const missing = missingSkills.map((skill) => ({
      ...((typeof skill === "object" && skill) || {}),
      name: getSkillName(skill),
      level: getSkillLevel(skill),
      status: "missing",
    }));

    let result = [...completed, ...missing];

    if (filter !== "all") {
      result = result.filter((skill) => skill.status === filter);
    }

    if (search.trim()) {
      result = result.filter((skill) =>
        skill.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [completedSkills, missingSkills, filter, search]);

  if (loading) {
    return (
      <main className="sg-page">
        <div className="sg-loading">
          <span className="sg-spinner" />
          <h2>Mapping your skills...</h2>
          <p>Preparing your personalized career analysis.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="sg-page">
        <section className="sg-error">
          <div className="sg-error-icon">!</div>
          <h2>Your analysis couldn't load</h2>
          <p>{error}</p>
          <button className="sg-primary-btn" onClick={loadAnalysis}>
            Try again ↻
          </button>
        </section>
      </main>
    );
  }

  const hasCareer = Boolean(data?.careerPath);
  const hasAnalysis = hasCareer || totalSkills > 0;

  return (
    <main className="sg-page">
      {/* INTRO */}
      <section className="sg-hero">
        <div className="sg-hero-copy">
          <span className="sg-eyebrow">
            <span className="sg-eyebrow-dot" />
            ELEVATEU / CAREER INTELLIGENCE
          </span>

          <h1>
            Discover your gaps.
            <br />
            <span>Unlock your potential.</span>
          </h1>

          <p>
            Understand where you stand today, identify the skills
            you need next, and build a clear path towards your
            career goals.
          </p>

          <div className="sg-hero-tags">
            <span>✦ Personalised insights</span>
            <span>↗ Career focused</span>
          </div>
        </div>

        <div className="sg-hero-art" aria-hidden="true">
          <div className="sg-orbit sg-orbit-one" />
          <div className="sg-orbit sg-orbit-two" />

          <div className="sg-floating-card sg-float-top">
            <span>✦</span> Keep growing
          </div>

          <div className="sg-growth-icon">
            <div className="sg-growth-bars">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="sg-growth-arrow">↗</span>
          </div>

          <div className="sg-floating-card sg-float-bottom">
            <span>✓</span> Your next step starts here
          </div>
        </div>
      </section>

      {!hasAnalysis ? (
        <section className="sg-empty">
          <div className="sg-empty-icon">◎</div>
          <h2>Your career journey starts here</h2>
          <p>
            Select or set up a career path in your profile to see
            the required skills, completed skills and areas to improve.
          </p>
          <Link to="/career-path" className="sg-primary-btn">
            Explore career paths <span>→</span>
          </Link>
        </section>
      ) : (
        <>
          {/* SUMMARY */}
          <section className="sg-summary-grid">
            <article className="sg-card sg-role-card">
              <div className="sg-card-heading">
                <span className="sg-icon sg-purple">⌘</span>
                <span>YOUR TARGET ROLE</span>
              </div>

              <h2>{data?.careerPath || "Career path not specified"}</h2>

              <p>
                Your current progress towards your selected career.
              </p>

              <Link to="/career-path" className="sg-text-link">
                Explore career paths <span>↗</span>
              </Link>
            </article>

            <article className="sg-card sg-match-card">
              <div className="sg-card-heading">
                <span className="sg-icon sg-green">✦</span>
                <span>CAREER READINESS</span>
              </div>

              <div className="sg-match-content">
                <div
                  className="sg-donut"
                  style={{
                    "--sg-progress": `${percentage}%`,
                  }}
                  role="img"
                  aria-label={`${percentage}% career readiness`}
                >
                  <div className="sg-donut-inner">
                    <strong>{percentage}%</strong>
                    <span>Readiness</span>
                  </div>
                </div>

                <div className="sg-match-details">
                  <span className="sg-match-label">Your progress</span>
                  <h3>
                    {percentage >= 80
                      ? "Great momentum!"
                      : percentage >= 50
                      ? "You're making progress"
                      : "Your journey is underway"}
                  </h3>
                  <p>
                    Every skill you develop brings you one step closer.
                  </p>
                </div>
              </div>
            </article>

            <article className="sg-card sg-stats-card">
              <div className="sg-card-heading">
                <span className="sg-icon sg-orange">◈</span>
                <span>SKILL SNAPSHOT</span>
              </div>

              <div className="sg-stat-row">
                <span className="sg-stat-dot sg-dot-green" />
                <span>Skills completed</span>
                <strong>{completedSkills.length}</strong>
              </div>

              <div className="sg-stat-row">
                <span className="sg-stat-dot sg-dot-orange" />
                <span>Skills to develop</span>
                <strong>{missingSkills.length}</strong>
              </div>

              <div className="sg-stat-row">
                <span className="sg-stat-dot sg-dot-purple" />
                <span>Total required</span>
                <strong>{totalSkills}</strong>
              </div>
            </article>
          </section>

          {/* SKILL ANALYSIS */}
          <section className="sg-card sg-analysis-card">
            <div className="sg-section-heading">
              <div>
                <span className="sg-section-kicker">
                  YOUR SKILL LANDSCAPE
                </span>
                <h2>Know what you bring to the table.</h2>
                <p>
                  Review your progress and find the skills that need
                  your attention.
                </p>
              </div>

              <button
                className="sg-refresh-btn"
                onClick={loadAnalysis}
                type="button"
              >
                ↻ Refresh
              </button>
            </div>

            <div className="sg-toolbar">
              <label className="sg-search">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search a skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search skills"
                />
              </label>

              <div className="sg-filters" aria-label="Filter skills">
                {[
                  ["all", "All skills"],
                  ["completed", "Completed"],
                  ["missing", "To develop"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={filter === value ? "active" : ""}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {filteredSkills.length === 0 ? (
              <div className="sg-no-results">
                <span>⌕</span>
                <h3>No matching skills</h3>
                <p>
                  Try another search or choose a different filter.
                </p>
              </div>
            ) : (
              <div className="sg-skill-list">
                {filteredSkills.map((skill, index) => (
                  <article
                    className="sg-skill-row"
                    key={`${skill.status}-${skill.name}-${index}`}
                  >
                    <div
                      className={`sg-skill-symbol ${
                        skill.status === "completed"
                          ? "sg-symbol-done"
                          : "sg-symbol-missing"
                      }`}
                    >
                      {skill.status === "completed" ? "✓" : "↗"}
                    </div>

                    <div className="sg-skill-info">
                      <strong>{skill.name}</strong>
                      <span>
                        {skill.status === "completed"
                          ? `Current level: ${skill.level}`
                          : "Add this skill to your learning plan"}
                      </span>
                    </div>

                    <span
                      className={`sg-status-pill ${
                        skill.status === "completed"
                          ? "sg-pill-done"
                          : "sg-pill-missing"
                      }`}
                    >
                      {skill.status === "completed"
                        ? "Completed"
                        : "To develop"}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* NEXT STEPS */}
          <section className="sg-bottom-grid">
            <article className="sg-roadmap-card">
              <div className="sg-roadmap-decoration" aria-hidden="true">
                <div className="sg-roadmap-line" />
                <span>01</span>
                <span>02</span>
                <span>03</span>
              </div>

              <div className="sg-roadmap-copy">
                <span className="sg-section-kicker">YOUR NEXT CHAPTER</span>
                <h2>Turn skill gaps into milestones.</h2>
                <p>
                  Follow a structured learning journey, focus on
                  important skills and track your progress as you grow.
                </p>
                <Link to="/roadmap" className="sg-primary-btn">
                  Explore my roadmap <span>→</span>
                </Link>
              </div>
            </article>

            <article className="sg-card sg-tip-card">
              <div className="sg-tip-icon">✧</div>
              <span className="sg-section-kicker">A LITTLE GUIDANCE</span>
              <h2>Learn by building.</h2>
              <p>
                Practise new concepts in small projects. Applying a
                skill is a useful way to strengthen your understanding
                and build evidence for your portfolio.
              </p>
              <Link to="/projects" className="sg-text-link">
                Explore your projects <span>↗</span>
              </Link>
            </article>
          </section>
        </>
      )}

      <footer className="sg-footer">
        <span>ElevateU</span>
        <span>Your skills. Your direction. Your future.</span>
      </footer>
    </main>
  );
}

export default SkillGap;