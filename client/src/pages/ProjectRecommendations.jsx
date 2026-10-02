
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./ProjectRecommendations.css";

export default function ProjectRecommendations() {
  const [careerPath, setCareerPath] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get(
          "/project-recommendations/recommendations"
        );

        setCareerPath(response.data.careerPath || "");
        setRecommendations(
          Array.isArray(response.data.recommendations)
            ? response.data.recommendations
            : []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load project recommendations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const getDifficultyClass = (difficulty) => {
    const value = (difficulty || "").toLowerCase();

    if (value.includes("beginner")) return "difficulty-beginner";
    if (value.includes("easy")) return "difficulty-easy";
    if (value.includes("intermediate")) return "difficulty-intermediate";
    if (value.includes("advanced")) return "difficulty-advanced";

    return "difficulty-default";
  };

  const getScore = (score) => {
    const number = Number(score);
    if (!Number.isFinite(number)) return 0;
    return Math.min(100, Math.max(0, number));
  };

  if (loading) {
    return (
      <main className="recommendations-page">
        <div className="recommendations-loading">
          <span className="recommendations-spinner" />
          <h2>Finding projects for you...</h2>
          <p>Matching your career goals with project ideas.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="recommendations-page">
      <section className="recommendations-hero">
        <div className="recommendations-hero-content">
          <span className="recommendations-eyebrow">
            <span className="recommendations-eyebrow-dot" />
            PERSONALIZED PROJECT IDEAS
          </span>

          <h1>
            Turn your skills
            <br />
            into <span>real projects.</span>
          </h1>

          <p>
            Explore hands-on projects tailored to your career path.
            Discover your skill gaps and build a portfolio that
            demonstrates what you can do.
          </p>

          <div className="recommendations-hero-tags">
            <span>✦ Career focused</span>
            <span>⌘ Skill matching</span>
            <span>↗ Portfolio building</span>
          </div>
        </div>

        <div className="recommendations-hero-visual">
          <div className="recommendations-orbit orbit-one" />
          <div className="recommendations-orbit orbit-two" />

          <div className="recommendations-visual-card">
            <div className="recommendations-visual-top">
              <span className="visual-window-dot" />
              <span className="visual-window-dot" />
              <span className="visual-window-dot" />
              <span className="visual-window-label">PROJECT LAB</span>
            </div>

            <div className="visual-code-line visual-code-wide" />
            <div className="visual-code-line visual-code-short" />
            <div className="visual-code-line visual-code-medium" />

            <div className="visual-project-result">
              <div className="visual-result-icon">✦</div>
              <div>
                <strong>Build something great</strong>
                <small>One project at a time</small>
              </div>
              <span className="visual-result-check">✓</span>
            </div>
          </div>

          <div className="recommendations-floating-badge">
            <span>↗</span> Keep building
          </div>
        </div>
      </section>

      <section className="recommendations-section-heading">
        <div>
          <span className="recommendations-section-kicker">
            YOUR NEXT STEPS
          </span>
          <h2>Recommended projects</h2>
          <p>
            Project ideas selected for your current skills and career goal.
          </p>
        </div>

        <div className="recommendations-count">
          <span>{recommendations.length}</span>
          <small>
            {recommendations.length === 1 ? "PROJECT IDEA" : "PROJECT IDEAS"}
          </small>
        </div>
      </section>

      {error && (
        <section className="recommendations-error" role="alert">
          <div className="recommendations-error-icon">!</div>
          <div>
            <h3>Couldn't load recommendations</h3>
            <p>{error}</p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </section>
      )}

      {!error && (
        <>
          <section className="recommendations-career-banner">
            <div className="recommendations-career-icon">✦</div>
            <div className="recommendations-career-copy">
              <small>YOUR SELECTED CAREER PATH</small>
              <h3>{careerPath || "Career path not selected"}</h3>
              <p>
                {careerPath
                  ? "Use these project ideas to practise relevant skills and strengthen your portfolio."
                  : "Choose a career path in your profile to personalize your project recommendations."}
              </p>
            </div>
            <div className="recommendations-career-action">
              <a href="/profile">View Profile <span>→</span></a>
            </div>
          </section>

          {recommendations.length === 0 ? (
            <section className="recommendations-empty">
              <div className="recommendations-empty-icon">⌘</div>
              <h3>No project recommendations yet</h3>
              <p>
                Set your career path and add your current skills to your
                profile to help personalize your project ideas.
              </p>
              <a href="/profile">Update Your Profile <span>→</span></a>
            </section>
          ) : (
            <section className="recommendations-grid">
              {recommendations.map((project, index) => {
                const skills = Array.isArray(project.skills)
                  ? project.skills
                  : [];

                const matchedSkills = Array.isArray(project.matchedSkills)
                  ? project.matchedSkills
                  : [];

                const missingSkills = Array.isArray(project.missingSkills)
                  ? project.missingSkills
                  : [];

                const score = getScore(project.relevanceScore);

                return (
                  <article
                    className="recommendation-card"
                    key={project._id || project.id || `${project.title}-${index}`}
                  >
                    <div className="recommendation-card-top">
                      <div className="recommendation-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <span
                        className={`recommendation-difficulty ${getDifficultyClass(
                          project.difficulty
                        )}`}
                      >
                        <span className="difficulty-dot" />
                        {project.difficulty || "Not specified"}
                      </span>
                    </div>

                    <h3>{project.title || "Untitled Project"}</h3>

                    <p className="recommendation-description">
                      {project.description ||
                        "Build this project to practise your skills and gain hands-on experience."}
                    </p>

                    <div className="recommendation-divider" />

                    <div className="recommendation-skills-heading">
                      <span>SKILLS TO PRACTISE</span>
                      <small>{skills.length} skills</small>
                    </div>

                    <div className="recommendation-skill-tags">
                      {skills.length > 0 ? (
                        skills.map((skill, skillIndex) => (
                          <span key={`${skill}-${skillIndex}`}>
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span>No skills listed</span>
                      )}
                    </div>

                    <div className="recommendation-match-grid">
                      <div className="recommendation-match-box matched-box">
                        <div className="recommendation-match-title">
                          <span>✓</span> Matched
                        </div>
                        <strong>{matchedSkills.length}</strong>
                        <small>
                          {matchedSkills.length > 0
                            ? matchedSkills.join(", ")
                            : "Keep learning"}
                        </small>
                      </div>

                      <div className="recommendation-match-box missing-box">
                        <div className="recommendation-match-title">
                          <span>↗</span> To learn
                        </div>
                        <strong>{missingSkills.length}</strong>
                        <small>
                          {missingSkills.length > 0
                            ? missingSkills.join(", ")
                            : "No gaps listed"}
                        </small>
                      </div>
                    </div>

                    <div className="recommendation-score">
                      <div className="recommendation-score-heading">
                        <span>Skill relevance</span>
                        <strong>{score}%</strong>
                      </div>

                      <div
                        className="recommendation-score-track"
                        role="progressbar"
                        aria-label={`Skill relevance for ${project.title || "project"}`}
                        aria-valuenow={score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="recommendation-score-fill"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>

                    <div className="recommendation-card-footer">
                      <span>✦</span>
                      <p>Learn, build, and add it to your portfolio.</p>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </>
      )}

      <section className="recommendations-bottom-banner">
        <div className="recommendations-bottom-icon">✧</div>
        <div>
          <h3>Small projects. Real progress.</h3>
          <p>
            Practise consistently, strengthen your skills, and keep track
            of what you build.
          </p>
        </div>
        <a href="/projects">My Projects <span>→</span></a>
      </section>
    </main>
  );
}