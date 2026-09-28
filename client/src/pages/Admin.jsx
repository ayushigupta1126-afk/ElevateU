import React, { useEffect, useState } from "react";
import api from "../services/api";

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

  if (loading) {
    return (
      <main className="page">
        <p>Loading admin dashboard...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <section className="card">
          <h2>Admin Dashboard</h2>

          <p
            style={{
              color: "#dc2626",
              marginTop: "12px",
            }}
          >
            {error}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">ADMIN PANEL</p>

          <h1>Admin Dashboard</h1>

          <p>
            Monitor users and overall ElevateU platform
            activity.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <span className="card-icon">👥</span>

          <h3>Total Users</h3>

          <p>
            Registered users on the platform.
          </p>

          <strong>
            {data.totalUsers}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">🎯</span>

          <h3>Career Paths</h3>

          <p>
            Available career paths.
          </p>

          <strong>
            {data.totalCareerPaths}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">🧠</span>

          <h3>Skills</h3>

          <p>
            Skills tracked across the platform.
          </p>

          <strong>
            {data.totalSkills}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">📁</span>

          <h3>Projects</h3>

          <p>
            Projects added by students.
          </p>

          <strong>
            {data.totalProjects}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="card-icon">🏆</span>

          <h3>Certificates</h3>

          <p>
            Certificates added by students.
          </p>

          <strong>
            {data.totalCertificates}
          </strong>
        </div>
      </section>
    </main>
  );
}