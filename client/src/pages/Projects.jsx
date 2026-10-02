
import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import "./Projects.css";
const initialForm = {
  title: "",
  description: "",
  technologies: "",
  githubUrl: "",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

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

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      githubUrl: form.githubUrl.trim(),
    };

    try {
      const response = editingId
        ? await api.put(`/projects/${editingId}`, payload)
        : await api.post("/projects", payload);

      setProjects(response.data.projects || []);
      setMessage(
        editingId
          ? "Project updated successfully."
          : "Project added successfully."
      );

      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (editingId
            ? "Unable to update project."
            : "Unable to add project.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      githubUrl: project.githubUrl || "",
    });

    setEditingId(project._id);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");
    setDeletingId(projectId);

    try {
      const response = await api.delete(
        `/projects/${projectId}`
      );

      setProjects(response.data.projects || []);

      if (editingId === projectId) {
        resetForm();
      }

      setMessage("Project deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return projects;

    return projects.filter((project) => {
      const title = (project.title || "").toLowerCase();
      const description = (
        project.description || ""
      ).toLowerCase();

      const technologies = Array.isArray(project.technologies)
        ? project.technologies.join(" ").toLowerCase()
        : "";

      return (
        title.includes(query) ||
        description.includes(query) ||
        technologies.includes(query)
      );
    });
  }, [projects, search]);

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">ELEVATEU / PORTFOLIO</p>
          <h1>My Projects</h1>
          <p>
            Showcase your work, technologies and practical
            experience in one place.
          </p>
        </div>

        <div className="project-count">
          <span>Total Projects</span>
          <strong>{projects.length}</strong>
        </div>
      </section>

      <section className="profile-card project-form-card">
        <div className="project-section-heading">
          <div>
            <p className="eyebrow">
              {editingId ? "EDIT PROJECT" : "BUILD YOUR PORTFOLIO"}
            </p>

            <h2>
              {editingId ? "Update your project" : "Add a project"}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              className="project-secondary-button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="project-form-grid">
            <div className="project-field project-field-full">
              <label htmlFor="project-title">Project title *</label>
              <input
                id="project-title"
                name="title"
                type="text"
                placeholder="e.g. Student Portfolio Tracker"
                value={form.title}
                onChange={updateField}
                maxLength={120}
                required
              />
            </div>

            <div className="project-field project-field-full">
              <label htmlFor="project-description">
                Description *
              </label>
              <textarea
                id="project-description"
                name="description"
                placeholder="What does your project do? What did you build?"
                value={form.description}
                onChange={updateField}
                rows={4}
                maxLength={2000}
                required
              />
              <small>
                {form.description.length}/2000 characters
              </small>
            </div>

            <div className="project-field">
              <label htmlFor="project-technologies">
                Technologies
              </label>
              <input
                id="project-technologies"
                name="technologies"
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={form.technologies}
                onChange={updateField}
              />
              <small>Separate technologies with commas.</small>
            </div>

            <div className="project-field">
              <label htmlFor="project-github">GitHub URL</label>
              <input
                id="project-github"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username/project"
                value={form.githubUrl}
                onChange={updateField}
              />
            </div>
          </div>

          {message && (
            <div className="project-alert project-success" role="status">
              {message}
            </div>
          )}

          {error && (
            <div className="project-alert project-error" role="alert">
              {error}
            </div>
          )}

          <div className="project-form-actions">
            <button
              type="submit"
              className="project-primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "+ Add Project"}
            </button>

            {editingId && (
              <span className="project-edit-hint">
                Editing an existing project
              </span>
            )}
          </div>
        </form>
      </section>

      <section className="projects-section">
        <div className="project-list-heading">
          <div>
            <p className="eyebrow">YOUR WORK</p>
            <h2>Added Projects</h2>
            <p>
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"} in your
              portfolio
            </p>
          </div>

          <div className="project-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search projects or technologies..."
              aria-label="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="project-empty-state">
            <p>Loading your projects...</p>
          </div>
        ) : error && projects.length === 0 ? (
          <div className="project-empty-state">
            <h3>Projects could not be loaded</h3>
            <p>{error}</p>
            <button
              type="button"
              className="project-secondary-button"
              onClick={fetchProjects}
            >
              Try again
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="project-empty-state">
            <div className="project-empty-icon">↗</div>
            <h3>
              {search
                ? "No matching projects"
                : "Your portfolio starts here"}
            </h3>
            <p>
              {search
                ? "Try another project title or technology."
                : "Add your first project using the form above."}
            </p>
          </div>
        ) : (
          <div className="project-cards-grid">
            {filteredProjects.map((project) => (
              <article
                className="project-card"
                key={project._id}
              >
                <div className="project-card-top">
                  <div className="project-card-icon">P</div>
                  <span className="project-status">
                    Portfolio Project
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                {project.technologies?.length > 0 && (
                  <div className="project-tech-list">
                    {project.technologies.map((technology, index) => (
                      <span key={`${technology}-${index}`}>
                        {technology}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-card-footer">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-link"
                    >
                      View on GitHub ↗
                    </a>
                  ) : (
                    <span className="project-no-link">
                      No GitHub link
                    </span>
                  )}

                  <div className="project-card-actions">
                    <button
                      type="button"
                      className="project-edit-button"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="project-delete-button"
                      onClick={() => handleDelete(project._id)}
                      disabled={deletingId === project._id}
                    >
                      {deletingId === project._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}