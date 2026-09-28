import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const user = response.data.user;
      const token = response.data.token;

      login(user, token);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page auth-page">
      <div className="auth-card">
        <p className="eyebrow">
          ELEVATEU ACCOUNT
        </p>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue your career development journey.
        </p>

        {error && (
          <p
            style={{
              color: "#dc2626",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="full-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}