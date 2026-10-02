
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./PublicProfile.css";

const PublicProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/public-profile/${id}`);

        if (active) {
          setProfile(response.data.profile || null);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load this public profile."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="public-profile-page">
        <div className="public-profile-state">
          <span className="public-profile-spinner" />
          <h2>Loading portfolio...</h2>
          <p>Getting the profile ready for you.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="public-profile-page">
        <div className="public-profile-state">
          <div className="public-profile-state-icon">!</div>
          <h2>Profile unavailable</h2>
          <p>{error}</p>
          <Link to="/" className="public-profile-primary-btn">
            Go to ElevateU
          </Link>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="public-profile-page">
        <div className="public-profile-state">
          <div className="public-profile-state-icon">⌕</div>
          <h2>Profile not found</h2>
          <p>This profile may be unavailable or the link may be incorrect.</p>
          <Link to="/" className="public-profile-primary-btn">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const projects = Array.isArray(profile.projects)
    ? profile.projects
    : [];
  const certificates = Array.isArray(profile.certificates)
    ? profile.certificates
    : [];

  const initials = (profile.name || "Student")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const getSkillName = (skill) => {
    if (typeof skill === "string") return skill;
    return skill?.name || skill?.title || "Skill";
  };

  const getSkillProficiency = (skill) => {
    if (typeof skill === "string") return "";
    return skill?.proficiency || "";
  };

  const getTechnologies = (technologies) => {
    if (Array.isArray(technologies)) return technologies;
    if (typeof technologies === "string") {
      return technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);
    }
    return [];
  };

  const isSafeExternalUrl = (url) => {
    if (typeof url !== "string" || !url.trim()) return false;

    try {
      const parsedUrl = new URL(url);
      return ["https:", "http:"].includes(parsedUrl.protocol);
    } catch {
      return false;
    }
  };

  const getExternalUrl = (url) => {
    if (!isSafeExternalUrl(url)) return undefined;
    return url;
  };

  return (
    <main className="public-profile-page">
      <nav className="public-profile-nav">
        <Link to="/" className="public-profile-brand">
          <span className="public-profile-brand-icon">E</span>
          <span>Elevate<span>U</span></span>
        </Link>

        <span className="public-profile-nav-label">
          STUDENT PORTFOLIO
        </span>
      </nav>

      <section className="public-profile-hero">
        <div className="public-profile-hero-decoration" />

        <div className="public-profile-avatar">
          {initials}
        </div>

        <div className="public-profile-hero-content">
          <span className="public-profile-verified-label">
            <span>✓</span> PUBLIC PORTFOLIO
          </span>

          <h1>{profile.name || "Student Profile"}</h1>

          <p className="public-profile-career">
            {profile.careerPath || "Career path not specified"}
          </p>

          <p className="public-profile-intro">
            Skills, projects, and achievements — all in one place.
          </p>
        </div>

        <div className="public-profile-hero-stats">
          <div>
            <strong>{skills.length}</strong>
            <span>Skills</span>
          </div>
          <div>
            <strong>{projects.length}</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>{certificates.length}</strong>
            <span>Certificates</span>
          </div>
        </div>
      </section>

      <section className="public-profile-content">
        <div className="public-profile-section-heading">
          <div>
            <span>WHAT I KNOW</span>
            <h2>Skills & Expertise</h2>
            <p>Technologies and skills included in this portfolio.</p>
          </div>
          <div className="public-profile-heading-icon">✳</div>
        </div>

        {skills.length > 0 ? (
          <div className="public-profile-skills-grid">
            {skills.map((skill, index) => {
              const name = getSkillName(skill);
              const proficiency = getSkillProficiency(skill);

              return (
                <article
                  className="public-profile-skill-card"
                  key={`${name}-${index}`}
                >
                  <div className="public-profile-skill-symbol">
                    {name.charAt(0).toUpperCase()}
                  </div>

                  <div className="public-profile-skill-details">
                    <h3>{name}</h3>
                    <p>{proficiency || "Skill added to profile"}</p>
                  </div>

                  <span className="public-profile-skill-check">✓</span>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="public-profile-empty">
            No skills have been added yet.
          </div>
        )}

        <div className="public-profile-section-heading public-profile-project-heading">
          <div>
            <span>BUILT WITH PURPOSE</span>
            <h2>Featured Projects</h2>
            <p>Practical work and projects from this portfolio.</p>
          </div>
          <div className="public-profile-heading-icon">⌘</div>
        </div>

        {projects.length > 0 ? (
          <div className="public-profile-projects-grid">
            {projects.map((project, index) => {
              const technologies = getTechnologies(
                project.technologies
              );

              const githubUrl = getExternalUrl(project.githubUrl);

              return (
                <article
                  className="public-profile-project-card"
                  key={project._id || project.id || `${project.title}-${index}`}
                >
                  <div className="public-profile-project-card-top">
                    <div className="public-profile-project-icon">⌘</div>
                    <span className="public-profile-project-number">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{project.title || "Untitled Project"}</h3>

                  <p className="public-profile-project-description">
                    {project.description ||
                      "A project showcasing practical learning and development."}
                  </p>

                  {technologies.length > 0 && (
                    <div className="public-profile-technologies">
                      <span>TECH STACK</span>
                      <div>
                        {technologies.map((technology, techIndex) => (
                          <span key={`${technology}-${techIndex}`}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="public-profile-project-footer">
                    <span>Hands-on experience</span>

                    {githubUrl ? (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on GitHub <span>↗</span>
                      </a>
                    ) : (
                      <span className="public-profile-no-link">
                        Portfolio project
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="public-profile-empty">
            No projects have been added yet.
          </div>
        )}

        <div className="public-profile-section-heading public-profile-certificate-heading">
          <div>
            <span>LEARNING & GROWTH</span>
            <h2>Certificates & Achievements</h2>
            <p>Courses and certificates listed in this portfolio.</p>
          </div>
          <div className="public-profile-heading-icon">✧</div>
        </div>

        {certificates.length > 0 ? (
          <div className="public-profile-certificates">
            {certificates.map((certificate, index) => {
              const certificateUrl = getExternalUrl(certificate.url);

              return (
                <article
                  className="public-profile-certificate-card"
                  key={
                    certificate._id ||
                    certificate.id ||
                    `${certificate.name}-${index}`
                  }
                >
                  <div className="public-profile-certificate-icon">
                    <span>✧</span>
                  </div>

                  <div className="public-profile-certificate-info">
                    <h3>{certificate.name || "Certificate"}</h3>
                    <p>
                      {certificate.issuer
                        ? `Issued by ${certificate.issuer}`
                        : "Professional learning achievement"}
                    </p>
                  </div>

                  {certificateUrl ? (
                    <a
                      href={certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="public-profile-certificate-link"
                    >
                      View Certificate <span>↗</span>
                    </a>
                  ) : (
                    <span className="public-profile-certificate-label">
                      Achievement
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="public-profile-empty">
            No certificates have been added yet.
          </div>
        )}
      </section>

      <footer className="public-profile-footer">
        <Link to="/" className="public-profile-brand">
          <span className="public-profile-brand-icon">E</span>
          <span>Elevate<span>U</span></span>
        </Link>

        <p>Keep learning. Keep building. Keep growing.</p>

        <span className="public-profile-footer-tag">
          STUDENT PORTFOLIO
        </span>
      </footer>
    </main>
  );
};

export default PublicProfile;