import React, { useState } from "react";
import api from "../services/api";

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
          "Unable to fetch GitHub repositories."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">GITHUB INTEGRATION</p>

          <h1>GitHub Projects</h1>

          <p>
            Connect your public GitHub profile and showcase
            your repositories in ElevateU.
          </p>
        </div>
      </section>

      <section
        className="dashboard-card"
        style={{
          maxWidth: "900px",
          margin: "30px auto",
        }}
      >
        <h2>Connect GitHub</h2>

        <p>
          Enter your GitHub username to fetch your public
          repositories.
        </p>

        <form onSubmit={handleFetchRepositories}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter GitHub username"
              style={{
                flex: "1",
                minWidth: "250px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : "Fetch Repositories"}
            </button>
          </div>
        </form>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background: "#fee2e2",
              color: "#b91c1c",
            }}
          >
            {error}
          </div>
        )}
      </section>

      {profileUsername && (
        <section
          className="dashboard-card"
          style={{
            maxWidth: "900px",
            margin: "30px auto",
          }}
        >
          <h2>
            @{profileUsername}'s Repositories
          </h2>

          {repositories.length === 0 ? (
            <p style={{ marginTop: "15px" }}>
              No public repositories found.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "18px",
                marginTop: "20px",
              }}
            >
              {repositories.map((repo) => (
                <div
                  key={repo.name}
                  style={{
                    padding: "20px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    background: "#ffffff",
                  }}
                >
                  <h3>{repo.name}</h3>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#4b5563",
                    }}
                  >
                    {repo.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "18px",
                      flexWrap: "wrap",
                      marginTop: "12px",
                      fontSize: "14px",
                    }}
                  >
                    <span>
                      <strong>Language:</strong>{" "}
                      {repo.language}
                    </span>

                    <span>
                      ⭐ {repo.stars}
                    </span>

                    <span>
                      🍴 {repo.forks}
                    </span>
                  </div>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "15px",
                    }}
                  >
                    View on GitHub →
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}