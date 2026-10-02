import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const closeExplore = () => {
    setExploreOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeExplore();
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo"
        onClick={closeExplore}
      >
        ElevateU
      </Link>

      <div className="nav-main">
        <Link to="/" className="nav-item">
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-item">
              Login
            </Link>

            <Link to="/signup" className="nav-signup">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-item">
              Dashboard
            </Link>

            <Link to="/career-path" className="nav-item">
              Career
            </Link>

            <Link to="/ai-assistant" className="nav-item">
              AI Assistant
            </Link>

            <Link to="/resume-builder" className="nav-item">
              Resume
            </Link>

            <Link to="/github" className="nav-item">
              GitHub
            </Link>

            <div className="explore-wrapper">
              <button
                className="explore-button"
                onClick={() =>
                  setExploreOpen(!exploreOpen)
                }
              >
                Explore
                <span
                  className={
                    exploreOpen
                      ? "arrow rotate"
                      : "arrow"
                  }
                >
                  ▾
                </span>
              </button>

              {exploreOpen && (
                <div className="explore-menu">
                  <Link
                    to="/profile"
                    onClick={closeExplore}
                  >
                    👤 Profile
                  </Link>

                  <Link
                    to="/skills"
                    onClick={closeExplore}
                  >
                    🧠 Skills
                  </Link>

                  <Link
                    to="/projects"
                    onClick={closeExplore}
                  >
                    📁 Projects
                  </Link>

                  <Link
                    to="/certificates"
                    onClick={closeExplore}
                  >
                    🏆 Certificates
                  </Link>

                  <Link
                    to="/skill-gap"
                    onClick={closeExplore}
                  >
                    📊 Skill Gap
                  </Link>

                  <Link
                    to="/roadmap"
                    onClick={closeExplore}
                  >
                    🗺️ Roadmap
                  </Link>

                  <Link
                    to="/project-recommendations"
                    onClick={closeExplore}
                  >
                    💡 Recommendations
                  </Link>

                  <Link
                    to="/analytics"
                    onClick={closeExplore}
                  >
                    📈 Analytics
                  </Link>

                  <Link
                    to="/placement-lab"
                    onClick={closeExplore}
                  >
                    🎯 Placement Lab
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeExplore}
                    >
                      ⚙️ Admin
                    </Link>
                  )}
                </div>
              )}
            </div>

            <button
              className="nav-profile"
              onClick={handleLogout}
              title="Logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}