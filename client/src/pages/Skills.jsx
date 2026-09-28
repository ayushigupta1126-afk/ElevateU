import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Skills() {
const [skills, setSkills] = useState([]);
const [skillName, setSkillName] = useState("");
const [proficiency, setProficiency] = useState("Beginner");

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

const [message, setMessage] = useState("");
const [error, setError] = useState("");

useEffect(() => {
loadSkills();
}, []);

const loadSkills = async () => {
try {
const response = await api.get("/users/profile");


  const userSkills = response.data?.user?.skills || [];

  setSkills(userSkills);
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Unable to load skills."
  );
} finally {
  setLoading(false);
}


};

const handleAddSkill = async (event) => {
event.preventDefault();


setMessage("");
setError("");

const trimmedName = skillName.trim();

if (!trimmedName) {
  setError("Please enter a skill name.");
  return;
}

const alreadyExists = skills.some(
  (skill) =>
    skill.name?.toLowerCase() ===
    trimmedName.toLowerCase()
);

if (alreadyExists) {
  setError("This skill has already been added.");
  return;
}

setSaving(true);

try {
  const updatedSkills = [
    ...skills,
    {
      name: trimmedName,
      proficiency: proficiency,
    },
  ];

  const response = await api.put("/users/profile", {
    skills: updatedSkills,
  });

  const savedSkills =
    response.data?.user?.skills || updatedSkills;

  setSkills(savedSkills);
  setSkillName("");
  setProficiency("Beginner");
  setMessage("Skill added successfully.");
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Unable to add skill."
  );
} finally {
  setSaving(false);
}


};

const handleDeleteSkill = async (index) => {
setMessage("");
setError("");


try {
  const updatedSkills = skills.filter(
    (_, skillIndex) => skillIndex !== index
  );

  const response = await api.put("/users/profile", {
    skills: updatedSkills,
  });

  const savedSkills =
    response.data?.user?.skills || updatedSkills;

  setSkills(savedSkills);
  setMessage("Skill removed successfully.");
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Unable to remove skill."
  );
}


};

if (loading) {
return ( <main className="page"> <p>Loading skills...</p> </main>
);
}

return ( <main className="page"> <section className="dashboard-header"> <div> <p className="eyebrow">SKILL MANAGEMENT</p>


      <h1>Your Skills</h1>

      <p>
        Add your technical and professional skills
        and track your proficiency level.
      </p>
    </div>
  </section>

  <section
    className="dashboard-card"
    style={{
      maxWidth: "850px",
      marginBottom: "25px",
    }}
  >
    <h2>Add a Skill</h2>

    <form
      onSubmit={handleAddSkill}
      style={{
        marginTop: "25px",
      }}
    >
      <label>Skill Name</label>

      <input
        type="text"
        placeholder="e.g. React.js"
        value={skillName}
        onChange={(event) =>
          setSkillName(event.target.value)
        }
        style={{
          width: "100%",
          padding: "13px",
          marginTop: "7px",
          marginBottom: "18px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          outline: "none",
        }}
      />

      <label>Proficiency</label>

      <select
        value={proficiency}
        onChange={(event) =>
          setProficiency(event.target.value)
        }
        style={{
          width: "100%",
          padding: "13px",
          marginTop: "7px",
          marginBottom: "20px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          background: "white",
          outline: "none",
        }}
      >
        <option value="Beginner">
          Beginner
        </option>

        <option value="Intermediate">
          Intermediate
        </option>

        <option value="Advanced">
          Advanced
        </option>
      </select>

      {message && (
        <p
          style={{
            color: "#16a34a",
            marginBottom: "15px",
            fontWeight: "600",
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
            fontWeight: "600",
          }}
        >
          {error}
        </p>
      )}

      <button type="submit" disabled={saving}>
        {saving ? "Adding..." : "Add Skill"}
      </button>
    </form>
  </section>

  <section
    className="dashboard-card"
    style={{
      maxWidth: "850px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2>Your Skill Set</h2>

        <p style={{ marginTop: "5px" }}>
          {skills.length} skill
          {skills.length === 1 ? "" : "s"} added
        </p>
      </div>
    </div>

    {skills.length === 0 ? (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          background: "#f8fafc",
          borderRadius: "10px",
          border: "1px dashed #cbd5e1",
        }}
      >
        <h3>No skills added yet</h3>

        <p>
          Add your first skill above to start
          building your career profile.
        </p>
      </div>
    ) : (
      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {skills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
              padding: "18px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              background: "white",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ marginBottom: "6px" }}>
                {skill.name}
              </h3>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color:
                    skill.proficiency === "Advanced"
                      ? "#15803d"
                      : skill.proficiency ===
                        "Intermediate"
                      ? "#2563eb"
                      : "#64748b",
                }}
              >
                {skill.proficiency}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                handleDeleteSkill(index)
              }
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "9px 14px",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
</main>


);
}
