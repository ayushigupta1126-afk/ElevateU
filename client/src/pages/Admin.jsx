
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Admin.css";

export default function Admin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers,
      description: "Registered users on the platform",
      icon: "♧",
      style: "admin-purple",
    },
    {
      title: "Career Paths",
      value: data?.totalCareerPaths,
      description: "Available career paths",
      icon: "◎",
      style: "admin-blue",
    },
    {
      title: "Skills",
      value: data?.totalSkills,
      description: "Skills tracked across the platform",
      icon: "✳",
      style: "admin-pink",
    },
    {
      title: "Projects",
      value: data?.totalProjects,
      description: "Projects added by students",
      icon: "▧",
      style: "admin-orange",
    },
    {
      title: "Certificates",
      value: data?.totalCertificates,
      description: "Certificates added by students",
      icon: "✧",
      style: "admin-green",
    },
  ];

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-loading">
          <div className="admin-spinner" />
          <h2>Loading admin dashboard</h2>
          <p>Fetching the latest platform statistics...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="admin-page">
        <section className="admin-error-panel">
          <div className="admin-error-icon">!</div>
          <p className="admin-eyebrow">ADMIN PANEL</p>
          <h1>Dashboard unavailable</h1>
          <p>{error}</p>
          <button
            className="admin-retry-button"
            onClick={() => window.location.reload()}
            type="button"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="admin-hero-content">
          <span className="admin-eyebrow">ELEVATEU • ADMIN PANEL</span>
          <h1>Admin Dashboard</h1>
          <p>
            Monitor your platform at a glance and keep track of
            users, learning resources, and student activity.
          </p>
        </div>

        <div className="admin-hero-art" aria-hidden="true">
          <div className="admin-art-circle">
            <span>✦</span>
          </div>
          <div className="admin-art-label">Platform overview</div>
        </div>
      </section>

      <section className="admin-section-heading">
        <div>
          <span className="admin-eyebrow">OVERVIEW</span>
          <h2>Platform statistics</h2>
          <p>Current totals from your ElevateU dashboard API.</p>
        </div>
        <span className="admin-live-badge">
          <span />
          Dashboard loaded
        </span>
      </section>

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <article className="admin-stat-card" key={stat.title}>
            <div className="admin-stat-top">
              <div className={`admin-stat-icon ${stat.style}`}>
                {stat.icon}
              </div>
              <span className="admin-stat-dot" />
            </div>

            <h3>{stat.title}</h3>
            <strong className="admin-stat-value">
              {stat.value ?? "—"}
            </strong>
            <p>{stat.description}</p>
          </article>
        ))}
      </section>

      <section className="admin-bottom-panel">
        <div className="admin-bottom-icon">✓</div>
        <div>
          <h3>Platform overview is ready</h3>
          <p>
            Your dashboard statistics have loaded successfully.
            Use these totals to monitor activity across ElevateU.
          </p>
        </div>
      </section>
    </main>
  );
}