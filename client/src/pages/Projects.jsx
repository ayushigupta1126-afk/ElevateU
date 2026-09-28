import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      setProjects(response.data.projects || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await api.post("/projects", {
        title,
        description,
        technologies: technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        githubUrl,
      });

      setProjects(response.data.projects || []);

      setTitle("");
      setDescription("");
      setTechnologies("");
      setGithubUrl("");

      setMessage("Project added successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add project."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (projectId) => {
    setMessage("");
    setError("");

    try {
      const response = await api.delete(
        `/projects/${projectId}`
      );

      setProjects(response.data.projects || []);

      setMessage("Project deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete project."
      );
    }
  };

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">PROJECT PORTFOLIO</p>

          <h1>My Projects</h1>

          <p>
            Add projects that demonstrate your skills and
            practical experience.
          </p>
        </div>
      </section>

      <section className="profile-card">
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <label>Project Title</label>

          <input
            type="text"
            placeholder="e.g. E-Commerce Website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "7px",
            }}
          />

          <label>Description</label>

          <textarea
            placeholder="Describe your project..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
            rows="4"
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "7px",
              resize: "vertical",
            }}
          />

          <label>Technologies</label>

          <input
            type="text"
            placeholder="React, Node.js, MongoDB"
            value={technologies}
            onChange={(e) =>
              setTechnologies(e.target.value)
            }
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "7px",
            }}
          />

          <label>GitHub URL</label>

          <input
            type="url"
            placeholder="https://github.com/username/project"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(e.target.value)
            }
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "7px",
            }}
          />

          {message && (
            <p
              style={{
                color: "#16a34a",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#dc2626",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "Add Project"}
          </button>
        </form>
      </section>

      <section style={{ marginTop: "35px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          Added Projects
        </h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="card">
            <p>
              No projects added yet. Add your first
              project above.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {projects.map((project) => (
              <div
                className="dashboard-card"
                key={project._id}
              >
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                {project.technologies?.length > 0 && (
                  <p>
                    <strong>Technologies:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>
                )}

                {project.githubUrl && (
                  <p>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#4f46e5",
                        fontWeight: "600",
                      }}
                    >
                      View on GitHub
                    </a>
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(project._id)
                  }
                  style={{
                    background: "#dc2626",
                    marginTop: "10px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}