
import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import "./ResumeBuilder.css";

const emptyForm = {
  jobTitle: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",
  education: [],
  experience: [],
  achievements: [],
};

const templates = [
  { id: "modern", name: "Modern", description: "Purple accent" },
  { id: "classic", name: "Classic", description: "Traditional" },
  { id: "minimal", name: "Minimal", description: "Clean & simple" },
  { id: "executive", name: "Executive", description: "Bold headings" },
];

const makeId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const toText = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return "";
};

const getSkillName = (skill) => {
  if (typeof skill === "string") return skill;
  return skill?.name || skill?.skillName || skill?.title || "";
};

const getList = (value) => (Array.isArray(value) ? value : []);

function normaliseItems(value, type) {
  return getList(value).map((item) => {
    if (typeof item === "string") {
      if (type === "education") {
        return {
          id: makeId(),
          degree: item,
          institution: "",
          year: "",
          details: "",
        };
      }

      if (type === "experience") {
        return {
          id: makeId(),
          role: item,
          company: "",
          duration: "",
          details: "",
        };
      }

      return { id: makeId(), title: item, details: "" };
    }

    return { id: makeId(), ...item };
  });
}

function createInitialForm(user) {
  const saved = user?.resumeDetails || {};

  return {
    ...emptyForm,
    jobTitle: saved.jobTitle || user?.careerPath || "",
    phone: saved.phone || user?.phone || "",
    location: saved.location || user?.location || "",
    linkedin: saved.linkedin || user?.linkedin || "",
    github: saved.github || user?.github || "",
    summary: saved.summary || "",
    education: normaliseItems(
      saved.education || user?.education,
      "education"
    ),
    experience: normaliseItems(
      saved.experience || user?.experience,
      "experience"
    ),
    achievements: normaliseItems(
      saved.achievements || user?.achievements,
      "achievements"
    ),
  };
}

function SectionTitle({ number, title, description }) {
  return (
    <div className="rb-section-title">
      <span className="rb-section-number">{number}</span>
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="rb-field">
      <span>{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default function ResumeBuilder() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [template, setTemplate] = useState("modern");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/users/profile");
        const user = response.data?.user || response.data?.profile ||
          response.data;

        if (cancelled) return;

        setProfile(user);
        setForm(createInitialForm(user));
        setTemplate(user?.resumeDetails?.template || "modern");
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Profile load nahi ho paya. Please login karke dobara try karo."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setNotice("");
  };

  const updateItem = (section, id, field, value) => {
    setForm((previous) => ({
      ...previous,
      [section]: previous[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
    setNotice("");
  };

  const addItem = (section) => {
    const item =
      section === "education"
        ? {
            id: makeId(),
            degree: "",
            institution: "",
            year: "",
            details: "",
          }
        : section === "experience"
        ? {
            id: makeId(),
            role: "",
            company: "",
            duration: "",
            details: "",
          }
        : { id: makeId(), title: "", details: "" };

    setForm((previous) => ({
      ...previous,
      [section]: [...previous[section], item],
    }));
  };

  const removeItem = (section, id) => {
    setForm((previous) => ({
      ...previous,
      [section]: previous[section].filter((item) => item.id !== id),
    }));
  };

  const skills = getList(profile?.skills);
  const projects = getList(profile?.projects);
  const certificates = getList(profile?.certificates);

  const completion = useMemo(() => {
    const checks = [
      Boolean(profile?.name),
      Boolean(profile?.email),
      Boolean(form.jobTitle.trim()),
      Boolean(form.phone.trim()),
      Boolean(form.location.trim()),
      Boolean(form.summary.trim()),
      form.education.some((item) =>
        Boolean((item.degree || "").trim() || (item.institution || "").trim())
      ),
      skills.length > 0,
      projects.length > 0,
      form.achievements.some((item) =>
        Boolean((item.title || "").trim())
      ),
    ];

    return Math.round(
      (checks.filter(Boolean).length / checks.length) * 100
    );
  }, [profile, form, skills.length, projects.length]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setNotice("");

      const resumeDetails = {
        ...form,
        template,
      };

      // Requires a backend PUT /users/profile handler that saves resumeDetails.
      await api.put("/users/profile", { resumeDetails });

      setProfile((previous) => ({
        ...previous,
        resumeDetails,
      }));

      setNotice("Resume details successfully save ho gayi! 💜");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Save nahi hua. Check karo ki backend mein PUT /users/profile aur resumeDetails support available hai."
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    setError("");
    window.print();
  };

  const displayName = profile?.name || profile?.fullName || "Your Name";
  const email = profile?.email || "";
  const career = form.jobTitle || profile?.careerPath || "Your Career Title";

  if (loading) {
    return (
      <main className="rb-page">
        <div className="rb-state-card">
          <span className="rb-spinner" />
          <h2>Preparing your resume...</h2>
          <p>Profile details load ho rahi hain.</p>
        </div>
      </main>
    );
  }

  if (!profile && error) {
    return (
      <main className="rb-page">
        <div className="rb-state-card">
          <span className="rb-state-icon">!</span>
          <h2>Profile load nahi hui</h2>
          <p>{error}</p>
          <button
            className="rb-button rb-button-primary"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="rb-page">
      <header className="rb-hero">
        <div className="rb-hero-copy">
          <div className="rb-eyebrow">
            <span className="rb-eyebrow-dot" />
            ELEVATEU CAREER STUDIO
          </div>

          <h1>
            Your next chapter,
            <span> beautifully presented.</span>
          </h1>

          <p>
            Build a polished, placement-ready resume using your skills,
            projects and achievements.
          </p>
        </div>

        <div className="rb-hero-actions rb-editor-only">
          <button
            className="rb-button rb-button-secondary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            className="rb-button rb-button-primary"
            onClick={handlePrint}
          >
            <span>↓</span> Export PDF
          </button>
        </div>
      </header>

      <section className="rb-progress-card rb-editor-only">
        <div className="rb-progress-top">
          <div>
            <span className="rb-small-label">RESUME READINESS</span>
            <h2>{completion}% complete</h2>
            <p>
              Fill in your details to create a more complete resume.
            </p>
          </div>
          <div
            className="rb-progress-ring"
            style={{ "--rb-progress": `${completion}%` }}
            aria-label={`${completion}% complete`}
          >
            <div>{completion}%</div>
          </div>
        </div>
        <div
          className="rb-progress-track"
          role="progressbar"
          aria-valuenow={completion}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span style={{ width: `${completion}%` }} />
        </div>
      </section>

      {error && (
        <div className="rb-alert rb-alert-error" role="alert">
          <span>!</span>
          <div>{error}</div>
          <button onClick={() => setError("")} aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}

      {notice && (
        <div className="rb-alert rb-alert-success" role="status">
          <span>✓</span>
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}

      <div className="rb-workspace">
        <section className="rb-editor rb-editor-only">
          <div className="rb-panel-heading">
            <div>
              <span className="rb-small-label">RESUME WORKSPACE</span>
              <h2>Build your resume</h2>
            </div>
            <span className="rb-live-badge">
              <span /> Live preview
            </span>
          </div>

          <nav className="rb-section-nav" aria-label="Resume sections">
            {[
              ["personal", "01", "Personal"],
              ["summary", "02", "Summary"],
              ["education", "03", "Education"],
              ["experience", "04", "Experience"],
              ["achievements", "05", "Achievements"],
            ].map(([id, number, label]) => (
              <button
                key={id}
                className={activeSection === id ? "active" : ""}
                onClick={() => setActiveSection(id)}
              >
                <span>{number}</span> {label}
              </button>
            ))}
          </nav>

          {activeSection === "personal" && (
            <div className="rb-form-section">
              <SectionTitle
                number="01"
                title="Personal information"
                description="Make it easy for recruiters to contact you."
              />

              <div className="rb-form-grid">
                <Field
                  label="Full name"
                  value={displayName}
                  onChange={(value) =>
                    setProfile((previous) => ({
                      ...previous,
                      name: value,
                    }))
                  }
                  placeholder="Your full name"
                />
                <Field
                  label="Email address"
                  value={email}
                  onChange={(value) =>
                    setProfile((previous) => ({
                      ...previous,
                      email: value,
                    }))
                  }
                  placeholder="you@example.com"
                  type="email"
                />
                <Field
                  label="Phone number"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                  placeholder="+91 98765 43210"
                />
                <Field
                  label="City / Location"
                  value={form.location}
                  onChange={(value) => updateField("location", value)}
                  placeholder="Chandigarh, India"
                />
                <Field
                  label="LinkedIn profile"
                  value={form.linkedin}
                  onChange={(value) => updateField("linkedin", value)}
                  placeholder="linkedin.com/in/yourname"
                />
                <Field
                  label="GitHub profile"
                  value={form.github}
                  onChange={(value) => updateField("github", value)}
                  placeholder="github.com/yourname"
                />
                <div className="rb-field rb-field-full">
                  <Field
                    label="Target role / Job title"
                    value={form.jobTitle}
                    onChange={(value) => updateField("jobTitle", value)}
                    placeholder="MERN Stack Developer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "summary" && (
            <div className="rb-form-section">
              <SectionTitle
                number="02"
                title="Professional summary"
                description="A short introduction to your professional profile."
              />
              <label className="rb-field">
                <span>About you</span>
                <textarea
                  rows="6"
                  maxLength="1200"
                  value={form.summary}
                  onChange={(event) =>
                    updateField("summary", event.target.value)
                  }
                  placeholder="Write 2–4 sentences about your skills, projects, strengths and career goals..."
                />
                <small>{form.summary.length}/1200 characters</small>
              </label>

              <div className="rb-tip">
                <span>✦</span>
                <p>
                  Tip: Focus on your technical skills, projects and the
                  value you can bring to a team. Avoid unsupported claims.
                </p>
              </div>
            </div>
          )}

          {activeSection === "education" && (
            <div className="rb-form-section">
              <SectionTitle
                number="03"
                title="Education"
                description="Add your degree, college and expected graduation."
              />

              {form.education.map((item, index) => (
                <div className="rb-repeat-card" key={item.id}>
                  <div className="rb-repeat-heading">
                    <strong>Education {index + 1}</strong>
                    <button
                      className="rb-remove-button"
                      onClick={() => removeItem("education", item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="rb-form-grid">
                    <Field
                      label="Degree / Course"
                      value={item.degree}
                      onChange={(value) =>
                        updateItem("education", item.id, "degree", value)
                      }
                      placeholder="B.Tech in Computer Science"
                    />
                    <Field
                      label="College / Institution"
                      value={item.institution}
                      onChange={(value) =>
                        updateItem(
                          "education",
                          item.id,
                          "institution",
                          value
                        )
                      }
                      placeholder="College name"
                    />
                    <Field
                      label="Year / Duration"
                      value={item.year}
                      onChange={(value) =>
                        updateItem("education", item.id, "year", value)
                      }
                      placeholder="2024 – 2028"
                    />
                    <Field
                      label="CGPA / Relevant details"
                      value={item.details}
                      onChange={(value) =>
                        updateItem("education", item.id, "details", value)
                      }
                      placeholder="CGPA, coursework, honors"
                    />
                  </div>
                </div>
              ))}

              <button
                className="rb-add-button"
                onClick={() => addItem("education")}
              >
                + Add education
              </button>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="rb-form-section">
              <SectionTitle
                number="04"
                title="Experience & training"
                description="Internships, training, volunteering or work experience."
              />

              {form.experience.map((item, index) => (
                <div className="rb-repeat-card" key={item.id}>
                  <div className="rb-repeat-heading">
                    <strong>Experience {index + 1}</strong>
                    <button
                      className="rb-remove-button"
                      onClick={() => removeItem("experience", item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="rb-form-grid">
                    <Field
                      label="Role / Position"
                      value={item.role}
                      onChange={(value) =>
                        updateItem("experience", item.id, "role", value)
                      }
                      placeholder="Full Stack Development Trainee"
                    />
                    <Field
                      label="Company / Organization"
                      value={item.company}
                      onChange={(value) =>
                        updateItem("experience", item.id, "company", value)
                      }
                      placeholder="Organization name"
                    />
                    <div className="rb-field rb-field-full">
                      <Field
                        label="Duration"
                        value={item.duration}
                        onChange={(value) =>
                          updateItem(
                            "experience",
                            item.id,
                            "duration",
                            value
                          )
                        }
                        placeholder="Jun 2026 – Jul 2026"
                      />
                    </div>
                    <label className="rb-field rb-field-full">
                      <span>Responsibilities & outcomes</span>
                      <textarea
                        rows="3"
                        value={item.details || ""}
                        onChange={(event) =>
                          updateItem(
                            "experience",
                            item.id,
                            "details",
                            event.target.value
                          )
                        }
                        placeholder="What did you learn, build or contribute?"
                      />
                    </label>
                  </div>
                </div>
              ))}

              <button
                className="rb-add-button"
                onClick={() => addItem("experience")}
              >
                + Add experience
              </button>
            </div>
          )}

          {activeSection === "achievements" && (
            <div className="rb-form-section">
              <SectionTitle
                number="05"
                title="Achievements"
                description="Highlight certifications, awards and milestones."
              />

              {form.achievements.map((item, index) => (
                <div className="rb-repeat-card" key={item.id}>
                  <div className="rb-repeat-heading">
                    <strong>Achievement {index + 1}</strong>
                    <button
                      className="rb-remove-button"
                      onClick={() => removeItem("achievements", item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <label className="rb-field">
                    <span>Title</span>
                    <input
                      value={item.title || ""}
                      onChange={(event) =>
                        updateItem(
                          "achievements",
                          item.id,
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="Hackathon participation / Award"
                    />
                  </label>
                  <label className="rb-field">
                    <span>Description</span>
                    <textarea
                      rows="2"
                      value={item.details || ""}
                      onChange={(event) =>
                        updateItem(
                          "achievements",
                          item.id,
                          "details",
                          event.target.value
                        )
                      }
                      placeholder="Briefly describe the achievement"
                    />
                  </label>
                </div>
              ))}

              <button
                className="rb-add-button"
                onClick={() => addItem("achievements")}
              >
                + Add achievement
              </button>
            </div>
          )}

          <div className="rb-editor-footer">
            <span>Changes appear in your preview automatically.</span>
            <button
              className="rb-button rb-button-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save resume"}
            </button>
          </div>
        </section>

        <section className="rb-preview-column">
          <div className="rb-preview-toolbar rb-editor-only">
            <div>
              <span className="rb-small-label">LIVE PREVIEW</span>
              <h2>Your resume</h2>
            </div>
            <span className="rb-a4-badge">A4 DOCUMENT</span>
          </div>

          <div className="rb-template-picker rb-editor-only">
            {templates.map((item) => (
              <button
                key={item.id}
                className={
                  template === item.id
                    ? "rb-template-option selected"
                    : "rb-template-option"
                }
                onClick={() => setTemplate(item.id)}
              >
                <span className={`rb-template-swatch ${item.id}`}>
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </span>
                {template === item.id && (
                  <span className="rb-template-check">✓</span>
                )}
              </button>
            ))}
          </div>

          <article className={`rb-paper rb-template-${template}`}>
            <header className="rb-resume-header">
              <div className="rb-resume-heading">
                <h1>{displayName}</h1>
                <p className="rb-resume-role">{career}</p>
              </div>
              <div className="rb-resume-contact">
                {email && <span>{email}</span>}
                {form.phone && <span>{form.phone}</span>}
                {form.location && <span>{form.location}</span>}
                {form.linkedin && <span>{form.linkedin}</span>}
                {form.github && <span>{form.github}</span>}
              </div>
            </header>

            {form.summary.trim() && (
              <section className="rb-resume-section">
                <h2>Professional Summary</h2>
                <p className="rb-resume-body">{form.summary}</p>
              </section>
            )}

            {form.education.some(
              (item) => item.degree || item.institution || item.details
            ) && (
              <section className="rb-resume-section">
                <h2>Education</h2>
                {form.education
                  .filter(
                    (item) =>
                      item.degree || item.institution || item.details
                  )
                  .map((item) => (
                    <div className="rb-resume-entry" key={item.id}>
                      <div className="rb-resume-entry-top">
                        <strong>
                          {item.degree || "Degree / Course"}
                        </strong>
                        {item.year && <span>{item.year}</span>}
                      </div>
                      {item.institution && <p>{item.institution}</p>}
                      {item.details && (
                        <p className="rb-resume-body">{item.details}</p>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {form.experience.some(
              (item) => item.role || item.company || item.details
            ) && (
              <section className="rb-resume-section">
                <h2>Experience & Training</h2>
                {form.experience
                  .filter(
                    (item) => item.role || item.company || item.details
                  )
                  .map((item) => (
                    <div className="rb-resume-entry" key={item.id}>
                      <div className="rb-resume-entry-top">
                        <strong>{item.role || "Position"}</strong>
                        {item.duration && <span>{item.duration}</span>}
                      </div>
                      {item.company && <p>{item.company}</p>}
                      {item.details && (
                        <p className="rb-resume-body">{item.details}</p>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {skills.length > 0 && (
              <section className="rb-resume-section">
                <h2>Technical Skills</h2>
                <p className="rb-resume-body">
                  {skills.map(getSkillName).filter(Boolean).join(" • ")}
                </p>
              </section>
            )}

            {projects.length > 0 && (
              <section className="rb-resume-section">
                <h2>Projects</h2>
                {projects.map((project, index) => (
                  <div
                    className="rb-resume-entry"
                    key={project._id || project.id || index}
                  >
                    <strong>
                      {project.title || project.name || "Project"}
                    </strong>
                    {(project.description || project.details) && (
                      <p className="rb-resume-body">
                        {project.description || project.details}
                      </p>
                    )}
                    {project.technologies && (
                      <p className="rb-resume-muted">
                        {Array.isArray(project.technologies)
                          ? project.technologies.join(", ")
                          : project.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {certificates.length > 0 && (
              <section className="rb-resume-section">
                <h2>Certifications</h2>
                {certificates.map((certificate, index) => (
                  <div
                    className="rb-resume-entry"
                    key={certificate._id || certificate.id || index}
                  >
                    <strong>
                      {certificate.title ||
                        certificate.name ||
                        certificate.certificateName ||
                        "Certification"}
                    </strong>
                    {certificate.issuer && (
                      <p>{certificate.issuer}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {form.achievements.some(
              (item) => item.title || item.details
            ) && (
              <section className="rb-resume-section">
                <h2>Achievements</h2>
                {form.achievements
                  .filter((item) => item.title || item.details)
                  .map((item) => (
                    <div className="rb-resume-entry" key={item.id}>
                      <strong>{item.title || "Achievement"}</strong>
                      {item.details && (
                        <p className="rb-resume-body">{item.details}</p>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {!form.summary &&
              !form.education.length &&
              !form.experience.length &&
              !skills.length &&
              !projects.length &&
              !certificates.length &&
              !form.achievements.length && (
                <div className="rb-resume-empty rb-editor-only">
                  <span>✦</span>
                  <h3>Your story starts here</h3>
                  <p>Add education, skills and projects to build your resume.</p>
                </div>
              )}

            <footer className="rb-resume-footer">
              {email && <span>{email}</span>}
              <span>Created with ElevateU</span>
            </footer>
          </article>

          <div className="rb-preview-note rb-editor-only">
            <span>ⓘ</span>
            <p>
              PDF export opens your browser's print dialog. Choose
              <strong> Save as PDF </strong> as the destination.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}