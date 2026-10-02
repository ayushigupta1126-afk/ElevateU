
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      login(response.data.user, response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-shell">
        <section className="signup-welcome">
          <div className="signup-brand">
            <span className="signup-brand-icon">E</span>
            <span>ElevateU</span>
          </div>

          <div className="signup-welcome-content">
            <span className="signup-tag">YOUR FUTURE STARTS HERE</span>

            <h1>
              Build your skills.
              <br />
              Shape your <span>future.</span>
            </h1>

            <p>
              Create your account and take the next step toward your
              career goals with ElevateU.
            </p>

            <div className="signup-benefits">
              <div className="signup-benefit">
                <span className="signup-check">✓</span>
                <div>
                  <strong>Track your skills</strong>
                  <p>Keep your learning journey organized.</p>
                </div>
              </div>

              <div className="signup-benefit">
                <span className="signup-check">✓</span>
                <div>
                  <strong>Build your portfolio</strong>
                  <p>Showcase your projects and certificates.</p>
                </div>
              </div>

              <div className="signup-benefit">
                <span className="signup-check">✓</span>
                <div>
                  <strong>Plan your career</strong>
                  <p>Stay focused on your next milestone.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="signup-side-footer">
            Learn today. Grow every day.
          </p>
        </section>

        <section className="signup-form-panel">
          <div className="signup-form-content">
            <div className="signup-mobile-brand">
              <span className="signup-brand-icon">E</span>
              <span>ElevateU</span>
            </div>

            <span className="signup-form-tag">GET STARTED FOR FREE</span>
            <h2>Create your account</h2>
            <p className="signup-description">
              Join ElevateU and start building your future.
            </p>

            {error && (
              <div className="signup-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-field">
                <label htmlFor="signup-name">Full name</label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="signup-email">Email address</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="signup-password">Password</label>
                <div className="signup-password-wrap">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="signup-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <span aria-hidden="true"> →</span>}
              </button>
            </form>

            <p className="signup-login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <p className="signup-terms">
              Your journey to a brighter future starts with one step.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}