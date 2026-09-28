import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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
  setShareMessage(
    "Unable to create public profile link."
  );
  return;
}

const profileUrl =
  window.location.origin +
  "/public-profile/" +
  userId;

try {
  await navigator.clipboard.writeText(profileUrl);

  setShareMessage(
    "Public profile link copied successfully!"
  );
} catch (err) {
  setShareMessage(
    "Public profile: " + profileUrl
  );
}


};

if (loading) {
return ( <main className="page"> <p>Loading profile...</p> </main>
);
}

return ( <main className="page"> <section className="dashboard-header"> <div> <p className="eyebrow">STUDENT PROFILE</p>

      <h1>{name || "Student"}</h1>

      <p>
        Manage your personal and career information.
      </p>
    </div>
  </section>

  <section className="profile-card">
    <div className="profile-avatar">
      {(name || "S").charAt(0).toUpperCase()}
    </div>

    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "550px",
      }}
    >
      <label>Full Name</label>

      <input
        type="text"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
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

      <label>Email</label>

      <input
        type="email"
        value={user?.email || ""}
        disabled
        style={{
          width: "100%",
          padding: "13px",
          marginTop: "7px",
          marginBottom: "20px",
          border: "1px solid #d1d5db",
          borderRadius: "7px",
          background: "#f3f4f6",
        }}
      />

      <label>Career Path</label>

      <input
        type="text"
        placeholder="e.g. Full Stack Developer"
        value={careerPath}
        onChange={(event) =>
          setCareerPath(event.target.value)
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
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  </section>

  <div
    className="profile-actions"
    style={{
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "20px",
    }}
  >
    <button
      type="button"
      onClick={handleShareProfile}
    >
      🔗 Share Public Profile
    </button>

    <Link to="/dashboard">
      <button type="button">
        Back to Dashboard
      </button>
    </Link>
  </div>

  {shareMessage && (
    <p
      style={{
        marginTop: "15px",
        color: "#16a34a",
        fontWeight: "600",
      }}
    >
      {shareMessage}
    </p>
  )}
</main>

);
}
