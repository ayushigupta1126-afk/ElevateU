
import React, { useState } from "react";
import api from "../services/api";
import "./GitHub.css";

export default function GitHub() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileUsername, setProfileUsername] = useState("");

  const handleFetchRepositories = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setRepositories([]);
    setProfileUsername("");

    try {
      const response = await api.get(
        `/github/repositories?username=${encodeURIComponent(
          username.trim()
        )}`
      );

      setRepositories(response.data.repositories || []);
      setProfileUsername(response.data.username);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to fetch GitHub repositories. Please check the username and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="github-page">
      <section className="github-hero">
        <div className="github-hero-content">
          <span className="github-eyebrow">
            <span className="github-status-dot" />
            GITHUB INTEGRATION
          </span>

          <h1>
            Your code.
            <br />
            <span>Your journey.</span>
          </h1>

          <p>
            Bring your GitHub projects into ElevateU.
            Explore your public repositories and showcase
            your development journey in one place.
          </p>

          <div className="github-hero-tags">
            <span>✦ Developer Portfolio</span>
            <span>✦ Public Repositories</span>
          </div>
        </div>

        <div className="github-hero-visual">
          <div className="github-orbit github-orbit-one" />
          <div className="github-orbit github-orbit-two" />

          <div className="github-code-card">
            <div className="github-code-top">
              <div className="github-window-dots">
                <span />
                <span />
                <span />
              </div>
              <span>developer.js</span>
            </div>

            <div className="github-code-body">
              <p>
                <span className="code-purple">const</span>{" "}
                developer = {"{"}
              </p>
              <p className="code-indent">
                name: <span className="code-green">"You"</span>,
              </p>
              <p className="code-indent">
                skills: <span className="code-blue">[]</span>,
              </p>
              <p className="code-indent">
                projects: <span className="code-blue">∞</span>,
              </p>
              <p className="code-indent">
                learning: <span className="code-green">true</span>
              </p>
              <p>{"}"}</p>
              <p className="code-comment">
                // keep building 🚀
              </p>
            </div>
          </div>

          <div className="github-floating-badge">
            <span className="github-floating-icon">✦</span>
            <div>
              <strong>Build & Grow</strong>
              <small>One project at a time</small>
            </div>
          </div>
        </div>
      </section>

      <section className="github-connect-card">
        <div className="github-section-heading">
          <div className="github-heading-icon">⌘</div>
          <div>
            <h2>Connect your GitHub</h2>
            <p>
              Enter your GitHub username to discover your public repositories.
            </p>
          </div>
        </div>

        <form onSubmit={handleFetchRepositories} className="github-search-form">
          <div className="github-input-wrap">
            <span className="github-input-prefix">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              aria-label="GitHub username"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="github-fetch-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="github-spinner" />
                Fetching...
              </>
            ) : (
              <>
                Fetch Repositories <span>→</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="github-error" role="alert">
            <span>!</span>
            {error}
          </div>
        )}

        <div className="github-privacy-note">
          <span>🔒</span>
          Only public repositories are displayed by this integration.
        </div>
      </section>

      {profileUsername && (
        <section className="github-repositories-section">
          <div className="github-repositories-header">
            <div>
              <span className="github-eyebrow">YOUR DEVELOPER SPACE</span>
              <h2>
                @{profileUsername}
                <span className="github-title-suffix">'s repositories</span>
              </h2>
              <p>Explore the projects behind your progress.</p>
            </div>

            <div className="github-repo-count">
              <strong>{repositories.length}</strong>
              <span>
                {repositories.length === 1
                  ? "Repository"
                  : "Repositories"}
              </span>
            </div>
          </div>

          {repositories.length === 0 ? (
            <div className="github-empty-state">
              <div className="github-empty-icon">⌘</div>
              <h3>No public repositories found</h3>
              <p>
                This profile has no public repositories to display.
                Try another username or check the profile on GitHub.
              </p>
              <a
                href={`https://github.com/${encodeURIComponent(profileUsername)}`}
                target="_blank"
                rel="noreferrer"
                className="github-outline-button"
              >
                Open GitHub Profile →
              </a>
            </div>
          ) : (
            <div className="github-repo-grid">
              {repositories.map((repo, index) => (
                <article
                  className="github-repo-card"
                  key={repo.id ?? repo.name}
                >
                  <div className="github-repo-card-top">
                    <div className="github-repo-icon">⌘</div>
                    <span className="github-repo-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{repo.name}</h3>

                  <p className="github-repo-description">
                    {repo.description || "No description provided for this repository."}
                  </p>

                  <div className="github-repo-meta">
                    <span className="github-language">
                      <span className="github-language-dot" />
                      {repo.language || "Not specified"}
                    </span>

                    <span title="Stars">
                      <span className="github-meta-symbol">★</span>{" "}
                      {repo.stars ?? 0}
                    </span>

                    <span title="Forks">
                      <span className="github-meta-symbol">⑂</span>{" "}
                      {repo.forks ?? 0}
                    </span>
                  </div>

                  <a
                    className="github-repo-link"
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repository <span>↗</span>
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {!profileUsername && !loading && (
        <section className="github-bottom-note">
          <div className="github-bottom-star">✦</div>
          <div>
            <h3>Your next project could be your best one.</h3>
            <p>
              Start by connecting your GitHub profile and bringing
              your work into your developer portfolio.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}