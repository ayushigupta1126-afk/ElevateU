import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const PublicProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `/public-profile/${id}`
        );

        setProfile(response.data.profile);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!profile) {
    return <h2>Profile not found</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>{profile.name}</h1>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>

      <p>
        <strong>Career Path:</strong>{" "}
        {profile.careerPath}
      </p>

      <hr />

      <h2>Skills</h2>

      {profile.skills?.length > 0 ? (
        <ul>
          {profile.skills.map((skill, index) => (
            <li key={index}>
              {skill.name} - {skill.proficiency}
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills added yet.</p>
      )}

      <h2>Projects</h2>

      {profile.projects?.length > 0 ? (
        profile.projects.map((project, index) => (
          <div key={index}>
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            {project.technologies && (
              <p>
                <strong>Technologies:</strong>{" "}
                {project.technologies}
              </p>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No projects added yet.</p>
      )}

      <h2>Certificates</h2>

      {profile.certificates?.length > 0 ? (
        profile.certificates.map(
          (certificate, index) => (
            <div key={index}>
              <h3>{certificate.name}</h3>

              <p>
                Issued by: {certificate.issuer}
              </p>

              {certificate.url && (
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Certificate
                </a>
              )}
            </div>
          )
        )
      ) : (
        <p>No certificates added yet.</p>
      )}
    </div>
  );
};

export default PublicProfile;