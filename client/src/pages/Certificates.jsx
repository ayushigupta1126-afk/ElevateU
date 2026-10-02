
import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import "./Certificates.css";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setCertificateUrl("");
    setEditingId(null);
  };

  const fetchCertificates = async () => {
    try {
      setError("");
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

    const payload = {
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate,
      certificateUrl: certificateUrl.trim(),
    };

    try {
      let response;

      if (editingId) {
        response = await api.put(
          `/certificates/${editingId}`,
          payload
        );
      } else {
        response = await api.post("/certificates", payload);
      }

      if (response.data.certificates) {
        setCertificates(response.data.certificates);
      } else {
        await fetchCertificates();
      }

      resetForm();
      setMessage(
        editingId
          ? "Certificate updated successfully."
          : "Certificate added successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (editingId
            ? "Unable to update certificate. Check that the update API is available."
            : "Unable to add certificate.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate._id);
    setTitle(certificate.title || "");
    setIssuer(certificate.issuer || "");
    setIssueDate(
      certificate.issueDate
        ? String(certificate.issueDate).slice(0, 10)
        : ""
    );
    setCertificateUrl(certificate.certificateUrl || "");
    setMessage("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (certificateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");
    setDeletingId(certificateId);

    try {
      const response = await api.delete(
        `/certificates/${certificateId}`
      );

      if (response.data.certificates) {
        setCertificates(response.data.certificates);
      } else {
        setCertificates((current) =>
          current.filter((item) => item._id !== certificateId)
        );
      }

      if (editingId === certificateId) resetForm();

      setMessage("Certificate deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete certificate."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCertificates = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return certificates;

    return certificates.filter((certificate) =>
      [
        certificate.title,
        certificate.issuer,
        certificate.issueDate,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(query)
        )
    );
  }, [certificates, search]);

  return (
    <main className="page certificates-page">
      <section className="dashboard-header certificates-header">
        <div>
          <p className="eyebrow">YOUR ACHIEVEMENTS</p>
          <h1>Certificates & Credentials</h1>
          <p>
            Keep your learning achievements organized and
            showcase the skills you have earned.
          </p>
        </div>

        <div className="certificate-total">
          <span>Total Certificates</span>
          <strong>{certificates.length}</strong>
        </div>
      </section>

      {message && (
        <div className="certificate-alert success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="certificate-alert error" role="alert">
          {error}
        </div>
      )}

      <section className="profile-card certificate-form-card">
        <div className="certificate-section-heading">
          <div>
            <p className="eyebrow">
              {editingId ? "UPDATE DETAILS" : "BUILD YOUR PORTFOLIO"}
            </p>
            <h2>
              {editingId ? "Edit Certificate" : "Add a Certificate"}
            </h2>
            <p>
              Enter your certificate details below.
            </p>
          </div>

          <span className="certificate-icon" aria-hidden="true">
            ✦
          </span>
        </div>

        <form className="certificate-form" onSubmit={handleSubmit}>
          <div className="certificate-field">
            <label htmlFor="certificate-title">
              Certificate Title *
            </label>
            <input
              id="certificate-title"
              type="text"
              placeholder="e.g. Full Stack Web Development"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              required
            />
          </div>

          <div className="certificate-field">
            <label htmlFor="certificate-issuer">
              Issuing Organization *
            </label>
            <input
              id="certificate-issuer"
              type="text"
              placeholder="e.g. Coursera, Infosys, NPTEL"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              maxLength={150}
              required
            />
          </div>

          <div className="certificate-field">
            <label htmlFor="certificate-date">
              Issue Date
            </label>
            <input
              id="certificate-date"
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>

          <div className="certificate-field">
            <label htmlFor="certificate-url">
              Certificate URL
            </label>
            <input
              id="certificate-url"
              type="url"
              placeholder="https://example.com/certificate"
              value={certificateUrl}
              onChange={(e) => setCertificateUrl(e.target.value)}
            />
          </div>

          <div className="certificate-form-actions">
            <button
              className="certificate-primary-btn"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Please wait..."
                : editingId
                ? "Save Changes"
                : "+ Add Certificate"}
            </button>

            {editingId && (
              <button
                className="certificate-secondary-btn"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="certificates-list-section">
        <div className="certificates-list-header">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>
            <h2>My Certificates</h2>
            <p>
              {certificates.length === 1
                ? "1 achievement saved"
                : `${certificates.length} achievements saved`}
            </p>
          </div>

          <div className="certificate-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              aria-label="Search certificates"
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="certificate-empty-state">
            Loading your certificates...
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="certificate-empty-state">
            <span className="certificate-empty-icon" aria-hidden="true">
              ✧
            </span>
            <h3>
              {search
                ? "No matching certificates"
                : "Your achievements start here"}
            </h3>
            <p>
              {search
                ? "Try another title or organization name."
                : "Add your first certificate using the form above."}
            </p>
          </div>
        ) : (
          <div className="certificates-grid">
            {filteredCertificates.map((certificate) => (
              <article
                className="certificate-card"
                key={certificate._id}
              >
                <div className="certificate-card-top">
                  <span className="certificate-card-icon" aria-hidden="true">
                    ✦
                  </span>
                  <span className="certificate-badge">
                    Achievement
                  </span>
                </div>

                <h3>{certificate.title}</h3>

                <p className="certificate-issuer">
                  {certificate.issuer}
                </p>

                {certificate.issueDate && (
                  <p className="certificate-date">
                    <span aria-hidden="true">▦</span>{" "}
                    Issued:{" "}
                    {new Date(
                      `${String(certificate.issueDate).slice(0, 10)}T00:00:00`
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}

                <div className="certificate-card-actions">
                  {certificate.certificateUrl ? (
                    <a
                      className="certificate-view-btn"
                      href={certificate.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate ↗
                    </a>
                  ) : (
                    <span className="certificate-no-link">
                      No certificate link
                    </span>
                  )}

                  <div className="certificate-manage-actions">
                    <button
                      className="certificate-edit-btn"
                      type="button"
                      onClick={() => handleEdit(certificate)}
                    >
                      Edit
                    </button>

                    <button
                      className="certificate-delete-btn"
                      type="button"
                      disabled={deletingId === certificate._id}
                      onClick={() => handleDelete(certificate._id)}
                    >
                      {deletingId === certificate._id
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