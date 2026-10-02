
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const user = response.data.user;
      const token = response.data.token;

      login(user, token);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page login-page">
      <div className="login-shell">
        <section className="login-welcome">
          <div className="login-brand">
            <span className="login-brand-icon">E</span>
            <span>ElevateU</span>
          </div>

          <div className="login-welcome-content">
            <span className="login-pill">
              YOUR CAREER. YOUR FUTURE.
            </span>

            <h1>
              Small steps.
              <br />
              <span>Big achievements.</span>
            </h1>

            <p>
              Build your skills, track your progress and
              bring your career goals closer — one step at a time.
            </p>

            <div className="login-feature-list">
              <div>
                <span className="login-feature-check">✓</span>
                <span>Track your skills and learning roadmap</span>
              </div>
              <div>
                <span className="login-feature-check">✓</span>
                <span>Showcase projects and certificates</span>
              </div>
              <div>
                <span className="login-feature-check">✓</span>
                <span>Keep your career journey organized</span>
              </div>
            </div>
          </div>

          <p className="login-side-footer">
            Made for your next big step.
          </p>
        </section>

        <section className="login-form-panel">
          <div className="login-form-inner">
            <div className="login-mobile-brand">
              <span className="login-brand-icon">E</span>
              <span>ElevateU</span>
            </div>

            <div className="login-heading">
              <span className="login-heading-icon">✦</span>
              <p className="eyebrow">WELCOME BACK</p>
              <h2>Login to your account</h2>
              <p>
                Continue where you left off.
              </p>
            </div>

            {error && (
              <div className="login-error" role="alert">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <div className="login-password-label">
                  <label htmlFor="login-password">Password</label>
                </div>

                <div className="login-password-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="login-show-password"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? "Signing you in..." : "Login to ElevateU"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <div className="login-divider">
              <span>YOUR JOURNEY CONTINUES HERE</span>
            </div>

            <p className="login-signup">
              New to ElevateU?{" "}
              <Link to="/signup">Create an account →</Link>
            </p>

            <p className="login-privacy-note">
              Your next chapter starts with one step.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}