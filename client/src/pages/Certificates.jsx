import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certificates");

      setCertificates(response.data.certificates || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load certificates."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await api.post("/certificates", {
        title,
        issuer,
        issueDate,
        certificateUrl,
      });

      setCertificates(response.data.certificates || []);

      setTitle("");
      setIssuer("");
      setIssueDate("");
      setCertificateUrl("");

      setMessage("Certificate added successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add certificate."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (certificateId) => {
    setMessage("");
    setError("");

    try {
      const response = await api.delete(
        `/certificates/${certificateId}`
      );

      setCertificates(response.data.certificates || []);

      setMessage("Certificate deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete certificate."
      );
    }
  };

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">CERTIFICATION PORTFOLIO</p>

          <h1>My Certificates</h1>

          <p>
            Keep track of your certifications and
            achievements.
          </p>
        </div>
      </section>

      <section className="profile-card">
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <label>Certificate Title</label>

          <input
            type="text"
            placeholder="e.g. React Developer Certificate"
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

          <label>Issuing Organization</label>

          <input
            type="text"
            placeholder="e.g. Coursera"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
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

          <label>Issue Date</label>

          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "7px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "7px",
            }}
          />

          <label>Certificate URL</label>

          <input
            type="url"
            placeholder="https://example.com/certificate"
            value={certificateUrl}
            onChange={(e) =>
              setCertificateUrl(e.target.value)
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
            {saving ? "Adding..." : "Add Certificate"}
          </button>
        </form>
      </section>

      <section style={{ marginTop: "35px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          Added Certificates
        </h2>

        {loading ? (
          <p>Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <div className="card">
            <p>
              No certificates added yet. Add your first
              certificate above.
            </p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {certificates.map((certificate) => (
              <div
                className="dashboard-card"
                key={certificate._id}
              >
                <h3>{certificate.title}</h3>

                <p>
                  <strong>Issued by:</strong>{" "}
                  {certificate.issuer}
                </p>

                {certificate.issueDate && (
                  <p>
                    <strong>Issue Date:</strong>{" "}
                    {certificate.issueDate}
                  </p>
                )}

                {certificate.certificateUrl && (
                  <p>
                    <a
                      href={certificate.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#4f46e5",
                        fontWeight: "600",
                      }}
                    >
                      View Certificate
                    </a>
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(certificate._id)
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