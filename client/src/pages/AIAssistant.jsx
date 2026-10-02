
import React, { useState } from "react";
import api from "../services/api";
import "./AIAssistant.css";

const suggestions = [
  {
    icon: "💻",
    title: "Full Stack Development",
    text: "Create a learning roadmap for becoming a Full Stack Developer."
  },
  {
    icon: "🎯",
    title: "Placement Preparation",
    text: "How should I prepare for technical interviews and campus placements?"
  },
  {
    icon: "📚",
    title: "Learn New Skills",
    text: "Which technical skills should I learn next as a computer science student?"
  },
  {
    icon: "🚀",
    title: "Project Ideas",
    text: "Suggest some unique MERN stack projects for my portfolio."
  }
];

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    setLoading(true);
    setError("");
    setReply("");

    try {
      const response = await api.post("/ai/career-advice", {
        message: message.trim()
      });

      setReply(response.data.reply);
      setMessage("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to connect with AI assistant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectSuggestion = (text) => {
    setMessage(text);
    setError("");
  };

  return (
    <main className="page ai-page">
      <section className="ai-hero">
        <div className="ai-hero-content">
          <span className="ai-eyebrow">
            <span className="ai-status-dot" />
            ELEVATEU INTELLIGENCE
          </span>

          <h1>
            Your Career,
            <br />
            <span>Powered by AI.</span>
          </h1>

          <p>
            Get personalized guidance for your skills, projects,
            technical interviews and career journey — all in one place.
          </p>

          <div className="ai-hero-tags">
            <span>✦ Career Guidance</span>
            <span>✦ Skill Development</span>
            <span>✦ Project Ideas</span>
          </div>
        </div>

        <div className="ai-orb" aria-hidden="true">
          <div className="ai-orb-ring ai-ring-one" />
          <div className="ai-orb-ring ai-ring-two" />
          <div className="ai-orb-core">✦</div>
          <span className="ai-orb-spark ai-spark-one">✧</span>
          <span className="ai-orb-spark ai-spark-two">✦</span>
          <span className="ai-orb-spark ai-spark-three">✧</span>
        </div>
      </section>

      <section className="ai-workspace">
        <div className="ai-section-heading">
          <div>
            <span className="ai-section-label">YOUR PERSONAL GUIDE</span>
            <h2>Ask ElevateU AI</h2>
            <p>What would you like help with today?</p>
          </div>

          <div className="ai-online-badge">
            <span className="ai-status-dot" />
            Ready to help
          </div>
        </div>

        <div className="ai-suggestions">
          {suggestions.map((item) => (
            <button
              className="ai-suggestion-card"
              type="button"
              key={item.title}
              onClick={() => selectSuggestion(item.text)}
              disabled={loading}
            >
              <span className="ai-suggestion-icon">{item.icon}</span>
              <span className="ai-suggestion-title">{item.title}</span>
              <span className="ai-suggestion-text">{item.text}</span>
              <span className="ai-suggestion-arrow">↗</span>
            </button>
          ))}
        </div>

        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-avatar">✦</div>
            <div>
              <h3>ElevateU Assistant</h3>
              <p>Your learning and career companion</p>
            </div>
            <span className="ai-chat-badge">AI</span>
          </div>

          <div className="ai-chat-body">
            {!reply && !loading && !error && (
              <div className="ai-welcome">
                <div className="ai-welcome-icon">✧</div>
                <h3>Let's build your future.</h3>
                <p>
                  Ask a question or choose a suggestion above to get
                  started with your career journey.
                </p>
              </div>
            )}

            {loading && (
              <div className="ai-loading-message">
                <div className="ai-avatar ai-small-avatar">✦</div>
                <div className="ai-loading-content">
                  <strong>ElevateU AI is thinking</strong>
                  <div className="ai-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="ai-error-message" role="alert">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {reply && (
              <div className="ai-response">
                <div className="ai-response-heading">
                  <div className="ai-avatar ai-small-avatar">✦</div>
                  <div>
                    <strong>ElevateU AI</strong>
                    <span>Career guidance</span>
                  </div>
                </div>

                <div className="ai-response-text">{reply}</div>
              </div>
            )}
          </div>

          <form className="ai-input-form" onSubmit={handleAskAI}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your career, skills, projects..."
              rows={3}
              aria-label="Ask ElevateU AI a question"
              disabled={loading}
            />

            <div className="ai-input-footer">
              <span className="ai-input-hint">
                ✦ Be specific to get more relevant guidance.
              </span>

              <button
                type="submit"
                className="ai-send-button"
                disabled={loading || !message.trim()}
              >
                {loading ? "Thinking..." : "Ask AI"}
                <span>↗</span>
              </button>
            </div>
          </form>
        </div>

        <p className="ai-disclaimer">
          AI-generated guidance may not always be accurate. Review
          important career decisions using your own judgment.
        </p>
      </section>
    </main>
  );
}