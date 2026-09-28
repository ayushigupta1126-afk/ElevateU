import React, { useState } from "react";
import api from "../services/api";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const response = await api.post(
        "/ai/career-advice",
        {
          message,
        }
      );

      setReply(response.data.reply);
      setMessage("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to connect with AI assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">ELEVATEU AI</p>

          <h1>AI Career Assistant 🤖</h1>

          <p>
            Get personalized guidance for your career,
            skills, projects and learning journey.
          </p>
        </div>
      </section>

      <section
        className="dashboard-card"
        style={{
          maxWidth: "850px",
          margin: "30px auto",
        }}
      >
        <h2>Ask ElevateU AI</h2>

        <p>
          Ask anything related to your career development.
        </p>

        <form onSubmit={handleAskAI}>
          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Example: What skills should I learn next to become a Full Stack Developer?"
            rows={6}
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              resize: "vertical",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "15px",
            }}
          >
            {loading
              ? "Thinking..."
              : "Ask AI"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background: "#fee2e2",
              color: "#b91c1c",
            }}
          >
            {error}
          </div>
        )}

        {reply && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "12px",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              lineHeight: "1.7",
              whiteSpace: "pre-wrap",
            }}
          >
            <h3>🤖 ElevateU AI</h3>

            <p>{reply}</p>
          </div>
        )}
      </section>
    </main>
  );
}