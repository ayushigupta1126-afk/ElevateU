import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ProjectRecommendations() {
  const [careerPath, setCareerPath] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get(
          "/project-recommendations/recommendations"
        );

        setCareerPath(response.data.careerPath);
        setRecommendations(
          response.data.recommendations || []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load project recommendations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Loading project recommendations...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">
            PROJECT RECOMMENDATIONS
          </p>

          <h1>Projects For Your Career</h1>

          <p>
            Get project ideas based on your selected
            career path and current skills.
          </p>
        </div>
      </section>

      {error && (
        <section
          className="dashboard-card"
          style={{
            maxWidth: "900px",
            margin: "30px auto",
            background: "#fee2e2",
            color: "#b91c1c",
          }}
        >
          {error}
        </section>
      )}

      {!error && (
        <section
          className="dashboard-card"
          style={{
            maxWidth: "1000px",
            margin: "30px auto",
          }}
        >
          <h2>{careerPath}</h2>

          <p style={{ marginTop: "8px" }}>
            These projects are selected according to your
            current skill profile.
          </p>

          <div
            style={{
              display: "grid",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            {recommendations.map(
              (project, index) => (
                <div
                  key={index}
                  style={{
                    padding: "22px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3>{project.title}</h3>

                      <p
                        style={{
                          marginTop: "8px",
                          color: "#4b5563",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: "20px",
                        background: "#f3f4f6",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <strong>Skills:</strong>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    >
                      {project.skills.map(
                        (skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            style={{
                              padding: "6px 10px",
                              borderRadius: "8px",
                              background:
                                "#f3f4f6",
                              fontSize: "13px",
                            }}
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "12px",
                      marginTop: "20px",
                    }}
                  >
                    <div>
                      <strong>
                        Matched Skills
                      </strong>

                      <p style={{ marginTop: "5px" }}>
                        {project.matchedSkills
                          .length > 0
                          ? project.matchedSkills.join(
                              ", "
                            )
                          : "None yet"}
                      </p>
                    </div>

                    <div>
                      <strong>
                        Missing Skills
                      </strong>

                      <p style={{ marginTop: "5px" }}>
                        {project.missingSkills
                          .length > 0
                          ? project.missingSkills.join(
                              ", "
                            )
                          : "None"}
                      </p>
                    </div>

                    <div>
                      <strong>
                        Relevance Score
                      </strong>

                      <p style={{ marginTop: "5px" }}>
                        {project.relevanceScore}%
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}