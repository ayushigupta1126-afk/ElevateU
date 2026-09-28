import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ResumeBuilder() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState({
    summary: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");

        const user = response.data.user;

        setProfile(user);

        setResume({
          summary: "",
          phone: user.phone || "",
          location: user.location || "",
          linkedin: user.linkedin || "",
          github: user.github || "",
        });
      } catch (error) {
        console.error(
          "Unable to load profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResume((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="page">
        <p>Loading resume builder...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">RESUME BUILDER</p>

          <h1>Create Your Professional Resume</h1>

          <p>
            Build a clean resume using your ElevateU
            profile information.
          </p>
        </div>

        <button onClick={handlePrint}>
          Download / Print Resume
        </button>
      </section>

      {/* Resume Details */}

      <section
        className="dashboard-card"
        style={{
          maxWidth: "900px",
          margin: "30px auto",
        }}
      >
        <h2>Additional Resume Details</h2>

        <div
          style={{
            display: "grid",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          <div>
            <label>Professional Summary</label>

            <textarea
              name="summary"
              value={resume.summary}
              onChange={handleChange}
              rows={5}
              placeholder="Write a short professional summary..."
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              name="phone"
              value={resume.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label>Location</label>

            <input
              name="location"
              value={resume.location}
              onChange={handleChange}
              placeholder="City, Country"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label>LinkedIn</label>

            <input
              name="linkedin"
              value={resume.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn profile URL"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label>GitHub</label>

            <input
              name="github"
              value={resume.github}
              onChange={handleChange}
              placeholder="GitHub profile URL"
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </section>

      {/* Resume Preview */}

      <section
        className="dashboard-card resume-preview"
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          background: "white",
        }}
      >
        <div
          style={{
            borderBottom: "2px solid #111827",
            paddingBottom: "15px",
          }}
        >
          <h1 style={{ marginBottom: "5px" }}>
            {profile?.name || "Your Name"}
          </h1>

          <p>
            {profile?.email || "your@email.com"}
            {resume.phone &&
              ` | ${resume.phone}`}
          </p>

          <p>
            {resume.location}
          </p>

          <p>
            {resume.linkedin &&
              `LinkedIn: ${resume.linkedin}`}
          </p>

          <p>
            {resume.github &&
              `GitHub: ${resume.github}`}
          </p>
        </div>

        {/* Summary */}

        <div style={{ marginTop: "25px" }}>
          <h2>Professional Summary</h2>

          <p>
            {resume.summary ||
              "Add a professional summary using the form above."}
          </p>
        </div>

        {/* Career */}

        <div style={{ marginTop: "25px" }}>
          <h2>Career Path</h2>

          <p>
            {profile?.careerPath ||
              "Career path not selected"}
          </p>
        </div>

        {/* Skills */}

        <div style={{ marginTop: "25px" }}>
          <h2>Skills</h2>

          {profile?.skills?.length ? (
            <ul>
              {profile.skills.map(
                (skill, index) => (
                  <li key={index}>
                    {skill.name}
                    {skill.proficiency
                      ? ` — ${skill.proficiency}`
                      : ""}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>

        {/* Projects */}

        <div style={{ marginTop: "25px" }}>
          <h2>Projects</h2>

          {profile?.projects?.length ? (
            profile.projects.map(
              (project, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  {project.technologies && (
                    <p>
                      <strong>
                        Technologies:
                      </strong>{" "}
                      {Array.isArray(
                        project.technologies
                      )
                        ? project.technologies.join(
                            ", "
                          )
                        : project.technologies}
                    </p>
                  )}
                </div>
              )
            )
          ) : (
            <p>No projects added yet.</p>
          )}
        </div>

        {/* Certificates */}

        <div style={{ marginTop: "25px" }}>
          <h2>Certifications</h2>

          {profile?.certificates?.length ? (
            <ul>
              {profile.certificates.map(
                (certificate, index) => (
                  <li key={index}>
                    <strong>
                      {certificate.title}
                    </strong>

                    {certificate.issuer &&
                      ` — ${certificate.issuer}`}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No certificates added yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}