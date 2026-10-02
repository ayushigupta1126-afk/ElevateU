
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Skills.css";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] = useState("Beginner");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await api.get("/users/profile");
      const userSkills = response.data?.user?.skills || [];
      setSkills(userSkills);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const trimmedName = skillName.trim();

    if (!trimmedName) {
      setError("Please enter a skill name.");
      return;
    }

    const alreadyExists = skills.some(
      (skill) =>
        skill.name?.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      setError("This skill has already been added.");
      return;
    }

    setSaving(true);

    try {
      const updatedSkills = [
        ...skills,
        { name: trimmedName, proficiency },
      ];

      const response = await api.put("/users/profile", {
        skills: updatedSkills,
      });

      const savedSkills =
        response.data?.user?.skills || updatedSkills;

      setSkills(savedSkills);
      setSkillName("");
      setProficiency("Beginner");
      setMessage("Skill added successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to add skill."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (index) => {
    setMessage("");
    setError("");
    setDeletingIndex(index);

    try {
      const updatedSkills = skills.filter(
        (_, skillIndex) => skillIndex !== index
      );

      const response = await api.put("/users/profile", {
        skills: updatedSkills,
      });

      const savedSkills =
        response.data?.user?.skills || updatedSkills;

      setSkills(savedSkills);
      setMessage("Skill removed successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to remove skill."
      );
    } finally {
      setDeletingIndex(null);
    }
  };

  const getProficiencyClass = (level) => {
    if (level === "Advanced") return "skill-level-advanced";
    if (level === "Intermediate") return "skill-level-intermediate";
    return "skill-level-beginner";
  };

  if (loading) {
    return (
      <main className="skills-page">
        <div className="skills-loading">
          <div className="skills-spinner" />
          <p>Loading your skills...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="skills-page">
      <section className="skills-hero">
        <div>
          <span className="skills-eyebrow">YOUR DEVELOPMENT</span>
          <h1>My Skills</h1>
          <p>
            Build your professional profile, track your proficiency,
            and keep growing one skill at a time.
          </p>
        </div>

        <div className="skills-hero-icon" aria-hidden="true">
          <span>✦</span>
        </div>
      </section>

      <section className="skills-summary">
        <div className="skills-summary-icon">✧</div>
        <div>
          <span>Total skills</span>
          <strong>{skills.length}</strong>
        </div>
        <p>Your skills, all in one place.</p>
      </section>

      <div className="skills-content-grid">
        <section className="skills-panel skills-add-panel">
          <div className="skills-panel-heading">
            <div className="skills-panel-icon">＋</div>
            <div>
              <h2>Add a skill</h2>
              <p>What have you learned recently?</p>
            </div>
          </div>

          <form onSubmit={handleAddSkill} className="skills-form">
            <div className="skills-field">
              <label htmlFor="skill-name">Skill name</label>
              <input
                id="skill-name"
                type="text"
                placeholder="e.g. React.js, C++, SQL"
                value={skillName}
                onChange={(event) => setSkillName(event.target.value)}
                required
              />
            </div>

            <div className="skills-field">
              <label htmlFor="skill-proficiency">Proficiency level</label>
              <select
                id="skill-proficiency"
                value={proficiency}
                onChange={(event) => setProficiency(event.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {message && (
              <div className="skills-message" role="status">
                {message}
              </div>
            )}

            {error && (
              <div className="skills-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="skills-submit"
              type="submit"
              disabled={saving}
            >
              {saving ? "Adding skill..." : "＋ Add skill"}
            </button>
          </form>

          <div className="skills-tip">
            <span>✦</span>
            <p>
              <strong>Keep learning!</strong>
              Update your skills as you gain experience.
            </p>
          </div>
        </section>

        <section className="skills-panel skills-list-panel">
          <div className="skills-list-heading">
            <div>
              <h2>Your skill set</h2>
              <p>Manage your current skills and proficiency.</p>
            </div>
            <span className="skills-count">{skills.length}</span>
          </div>

          {skills.length === 0 ? (
            <div className="skills-empty">
              <div className="skills-empty-icon">✧</div>
              <h3>Your journey starts here</h3>
              <p>
                You haven't added any skills yet. Add your first skill
                using the form to build your profile.
              </p>
            </div>
          ) : (
            <div className="skills-list">
              {skills.map((skill, index) => (
                <article
                  className="skill-item"
                  key={`${skill.name}-${index}`}
                >
                  <div className="skill-item-icon">
                    {skill.name?.trim()?.charAt(0)?.toUpperCase() || "S"}
                  </div>

                  <div className="skill-item-info">
                    <h3>{skill.name}</h3>
                    <span
                      className={`skill-level ${getProficiencyClass(
                        skill.proficiency
                      )}`}
                    >
                      <span className="skill-level-dot" />
                      {skill.proficiency || "Beginner"}
                    </span>
                  </div>

                  <button
                    className="skill-remove"
                    type="button"
                    onClick={() => handleDeleteSkill(index)}
                    disabled={deletingIndex !== null}
                    aria-label={`Remove ${skill.name}`}
                  >
                    {deletingIndex === index ? "Removing..." : "Remove"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}