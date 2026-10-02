
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, login } = useAuth();

  const [name, setName] = useState("");
  const [careerPath, setCareerPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        const profile = response.data.user;

        setName(profile.name || "");
        setCareerPath(profile.careerPath || "");

        const token = localStorage.getItem("elevateu_token");

        if (token) {
          login(
            {
              id: profile._id,
              _id: profile._id,
              name: profile.name,
              email: profile.email,
              role: profile.role,
              careerPath: profile.careerPath,
              skills: profile.skills || [],
              projects: profile.projects || [],
              certificates: profile.certificates || [],
            },
            token
          );
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await api.put("/users/profile", {
        name,
        careerPath,
      });

      const updatedUser = response.data.user;
      const token = localStorage.getItem("elevateu_token");

      if (token) {
        login(
          {
            id: updatedUser._id,
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            careerPath: updatedUser.careerPath,
            skills: updatedUser.skills || [],
            projects: updatedUser.projects || [],
            certificates: updatedUser.certificates || [],
          },
          token
        );
      }

      setName(updatedUser.name || "");
      setCareerPath(updatedUser.careerPath || "");
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleShareProfile = async () => {
    setShareMessage("");

    const userId = user?._id || user?.id;

    if (!userId) {
      setShareMessage("Unable to create public profile link.");
      return;
    }

    const profileUrl =
      window.location.origin + "/public-profile/" + userId;

    try {
      await navigator.clipboard.writeText(profileUrl);
      setShareMessage("Public profile link copied successfully!");
    } catch {
      setShareMessage(`Copy this link: ${profileUrl}`);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <span className="profile-spinner" />
          <p>Loading your profile...</p>
        </div>
      </main>
    );
  }

  const initial = (name || user?.name || "S")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div>
          <span className="profile-eyebrow">
            <span className="profile-eyebrow-dot" />
            STUDENT PROFILE
          </span>

          <h1>
            Your profile,
            <br />
            <span>your journey.</span>
          </h1>

          <p>
            Keep your personal details and career goals up to date
            as you grow with ElevateU.
          </p>
        </div>

        <div className="profile-hero-art">
          <div className="profile-art-circle profile-art-circle-one" />
          <div className="profile-art-circle profile-art-circle-two" />

          <div className="profile-art-card">
            <div className="profile-art-avatar">{initial}</div>
            <div className="profile-art-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="profile-art-check">✓</div>
          </div>

          <div className="profile-art-caption">
            <span>✦</span> Keep growing
          </div>
        </div>
      </section>

      <section className="profile-main-grid">
        <aside className="profile-summary-card">
          <div className="profile-summary-top">
            <span className="profile-summary-label">
              YOUR ACCOUNT
            </span>
            <span className="profile-summary-status">
              <span /> Active
            </span>
          </div>

          <div className="profile-avatar">
            {initial}
          </div>

          <h2>{name || "Student"}</h2>
          <p className="profile-summary-email">
            {user?.email || "No email available"}
          </p>

          <div className="profile-summary-divider" />

          <div className="profile-summary-detail">
            <span className="profile-detail-icon">✦</span>
            <div>
              <small>Career goal</small>
              <strong>{careerPath || "Not selected yet"}</strong>
            </div>
          </div>

          <div className="profile-summary-detail">
            <span className="profile-detail-icon">⌘</span>
            <div>
              <small>Account role</small>
              <strong>{user?.role || "Student"}</strong>
            </div>
          </div>

          <button
            type="button"
            className="profile-share-button"
            onClick={handleShareProfile}
          >
            <span>↗</span> Share Public Profile
          </button>

          {shareMessage && (
            <div className="profile-share-message" role="status">
              {shareMessage}
            </div>
          )}

          <p className="profile-share-hint">
            Share your profile link with others to showcase your journey.
          </p>
        </aside>

        <section className="profile-form-card">
          <div className="profile-form-heading">
            <div>
              <span className="profile-section-kicker">
                PERSONAL DETAILS
              </span>
              <h2>Edit your profile</h2>
              <p>
                Update your information and career preferences.
              </p>
            </div>
            <div className="profile-heading-icon">✎</div>
          </div>

          {error && (
            <div className="profile-alert profile-alert-error" role="alert">
              <span>!</span>
              {error}
            </div>
          )}

          {message && (
            <div className="profile-alert profile-alert-success" role="status">
              <span>✓</span>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-field">
              <label htmlFor="profile-name">Full name</label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
              <small>Your name will appear on your profile.</small>
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">Email address</label>
              <input
                id="profile-email"
                type="email"
                value={user?.email || ""}
                disabled
                autoComplete="email"
              />
              <small>Email address cannot be changed here.</small>
            </div>

            <div className="profile-field">
              <label htmlFor="profile-career">Career goal</label>
              <select
                id="profile-career"
                value={careerPath}
                onChange={(event) => setCareerPath(event.target.value)}
              >
                <option value="">Select your career goal</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="Frontend Developer">
                  Frontend Developer
                </option>
                <option value="Backend Developer">
                  Backend Developer
                </option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Mobile App Developer">
                  Mobile App Developer
                </option>
                <option value="Software Engineer">
                  Software Engineer
                </option>
              </select>
              <small>
                Choose a goal that matches the career you want to pursue.
              </small>
            </div>

            <div className="profile-form-footer">
              <p>
                <span>🔒</span> Your account information is managed securely.
              </p>

              <button
                type="submit"
                className="profile-save-button"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="profile-button-spinner" />
                    Saving...
                  </>
                ) : (
                  <>Save Changes <span>→</span></>
                )}
              </button>
            </div>
          </form>
        </section>
      </section>

      <section className="profile-bottom-banner">
        <div className="profile-banner-icon">✦</div>
        <div>
          <h3>Keep moving towards your goals.</h3>
          <p>
            Your next step is just around the corner. Continue building
            your skills and projects with ElevateU.
          </p>
        </div>
        <Link to="/dashboard" className="profile-dashboard-link">
          Go to Dashboard <span>→</span>
        </Link>
      </section>
    </main>
  );
}