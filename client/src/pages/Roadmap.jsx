
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Roadmap.css";

export default function Roadmap() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoadmap = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/roadmap");
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to generate your career roadmap. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  const roadmap = Array.isArray(data?.roadmap) ? data.roadmap : [];
  const career = data?.careerPath || "Your selected career";

  if (loading) {
    return (
      <main className="rm-page">
        <section className="rm-state">
          <span className="rm-loader" />
          <h2>Building your learning journey</h2>
          <p>Organising your career milestones...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="rm-page">
        <section className="rm-state rm-error">
          <div className="rm-state-icon">!</div>
          <h2>Your roadmap needs another try</h2>
          <p>{error}</p>
          <button
            className="rm-primary-btn"
            onClick={fetchRoadmap}
            type="button"
          >
            Try again <span>↻</span>
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="rm-page">
      {/* HERO */}
      <section className="rm-hero">
        <div className="rm-hero-copy">
          <span className="rm-eyebrow">
            <span className="rm-live-dot" />
            ELEVATEU / YOUR GROWTH JOURNEY
          </span>

          <h1>
            Your future,
            <br />
            <span>one milestone at a time.</span>
          </h1>

          <p>
            A clearer direction for your career starts with a
            practical plan. Learn new skills, build real projects
            and move towards your goals step by step.
          </p>

          <div className="rm-hero-meta">
            <div className="rm-meta-icon">⌘</div>
            <div>
              <span>YOUR TARGET CAREER</span>
              <strong>{career}</strong>
            </div>
          </div>
        </div>

        <div className="rm-hero-visual" aria-hidden="true">
          <div className="rm-visual-ring rm-ring-one" />
          <div className="rm-visual-ring rm-ring-two" />

          <div className="rm-visual-center">
            <div className="rm-visual-spark">✦</div>
            <div className="rm-visual-route">
              <span />
              <i />
              <span />
              <i />
              <span />
            </div>
            <strong>GROW</strong>
            <small>AT YOUR PACE</small>
          </div>

          <div className="rm-float rm-float-top">
            <span>✧</span> Learn
          </div>
          <div className="rm-float rm-float-bottom">
            <span>↗</span> Build
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="rm-overview">
        <article className="rm-overview-card rm-overview-main">
          <div className="rm-overview-icon rm-icon-purple">◎</div>
          <div>
            <span>YOUR CAREER DIRECTION</span>
            <h3>{career}</h3>
            <p>Your roadmap is organised around this career goal.</p>
          </div>
        </article>

        <article className="rm-overview-card">
          <div className="rm-overview-icon rm-icon-green">✓</div>
          <div>
            <span>LEARNING MILESTONES</span>
            <h3>{roadmap.length}</h3>
            <p>
              {roadmap.length === 1
                ? "Step in your learning path"
                : "Steps in your learning path"}
            </p>
          </div>
        </article>

        <article className="rm-overview-card">
          <div className="rm-overview-icon rm-icon-orange">↗</div>
          <div>
            <span>YOUR NEXT MOVE</span>
            <h3>{roadmap.length ? "Keep building" : "Choose a goal"}</h3>
            <p>
              {roadmap.length
                ? "Turn knowledge into practical experience."
                : "Set up your career path to get started."}
            </p>
          </div>
        </article>
      </section>

      {/* ROADMAP */}
      <section className="rm-roadmap-section">
        <div className="rm-section-heading">
          <div>
            <span className="rm-section-kicker">THE GAME PLAN</span>
            <h2>Your learning journey</h2>
            <p>
              Follow each milestone in order, practise what you learn
              and build confidence along the way.
            </p>
          </div>

          <button
            className="rm-refresh-btn"
            onClick={fetchRoadmap}
            type="button"
          >
            ↻ Refresh roadmap
          </button>
        </div>

        {roadmap.length === 0 ? (
          <div className="rm-empty">
            <div className="rm-empty-symbol">✧</div>
            <h2>Your journey starts with a goal</h2>
            <p>
              There are no roadmap steps to display yet. Set up your
              career path and required skills to build your learning plan.
            </p>
            <Link to="/career-path" className="rm-primary-btn">
              Explore career paths <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="rm-timeline">
            <div className="rm-timeline-line" />

            {roadmap.map((step, index) => (
              <article
                className="rm-step"
                key={`${step.skill || "skill"}-${step.step ?? index}`}
              >
                <div className="rm-step-marker">
                  <span>
                    {String(step.step ?? index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="rm-step-card">
                  <div className="rm-step-top">
                    <div className="rm-step-title">
                      <span className="rm-step-label">
                        MILESTONE {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{step.skill || "Learning milestone"}</h3>
                    </div>

                    <span className="rm-level-pill">
                      {step.level || "Skill development"}
                    </span>
                  </div>

                  <div className="rm-step-details">
                    <div className="rm-detail-block">
                      <div className="rm-detail-icon rm-detail-learn">
                        ◈
                      </div>
                      <div>
                        <span>WHAT TO LEARN</span>
                        <p>
                          {step.resource ||
                            "Explore learning resources for this skill."}
                        </p>
                      </div>
                    </div>

                    <div className="rm-detail-block">
                      <div className="rm-detail-icon rm-detail-build">
                        ✳
                      </div>
                      <div>
                        <span>PUT IT INTO PRACTICE</span>
                        <p>
                          {step.project ||
                            "Create a small practical exercise using this skill."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < roadmap.length - 1 && (
                    <div className="rm-step-footer">
                      <span className="rm-footer-dot" />
                      Next up:{" "}
                      <strong>
                        {roadmap[index + 1]?.skill || "Next milestone"}
                      </strong>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="rm-bottom-cta">
        <div className="rm-cta-symbol">✦</div>
        <div className="rm-cta-copy">
          <span>SMALL STEPS. REAL PROGRESS.</span>
          <h2>Make your skills visible.</h2>
          <p>
            Apply what you learn through projects and keep your
            portfolio updated as you develop.
          </p>
        </div>
        <div className="rm-cta-actions">
          <Link to="/projects" className="rm-primary-btn">
            Explore projects <span>→</span>
          </Link>
          <Link to="/skill-gap" className="rm-secondary-btn">
            Review skill gaps
          </Link>
        </div>
      </section>

      <footer className="rm-footer">
        <strong>ElevateU</strong>
        <span>Learn with direction. Grow with purpose.</span>
      </footer>
    </main>
  );
}