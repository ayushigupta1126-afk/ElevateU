const projectRecommendations = {
  "Full Stack Developer": [
    {
      title: "MERN Authentication System",
      description:
        "Build a full-stack authentication system with React, Node.js, Express and MongoDB.",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      difficulty: "Intermediate",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Build an e-commerce application with products, cart, authentication and orders.",
      skills: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API",
      ],
      difficulty: "Advanced",
    },
    {
      title: "Student Management System",
      description:
        "Create a student management application with CRUD operations and authentication.",
      skills: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      difficulty: "Intermediate",
    },
  ],

  "Frontend Developer": [
    {
      title: "Modern Portfolio Website",
      description:
        "Build a responsive portfolio website with projects, skills and contact sections.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
      ],
      difficulty: "Beginner",
    },
    {
      title: "React Task Manager",
      description:
        "Build a task management application using React with filtering and state management.",
      skills: [
        "JavaScript",
        "React",
        "CSS",
      ],
      difficulty: "Intermediate",
    },
    {
      title: "E-Commerce Frontend",
      description:
        "Create a responsive shopping interface with product listings, search and cart functionality.",
      skills: [
        "React",
        "JavaScript",
        "CSS",
      ],
      difficulty: "Intermediate",
    },
  ],

  "Backend Developer": [
    {
      title: "REST API Project",
      description:
        "Build a REST API with authentication, CRUD operations and database integration.",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API",
      ],
      difficulty: "Intermediate",
    },
    {
      title: "Authentication API",
      description:
        "Create a secure authentication backend using JWT and password hashing.",
      skills: [
        "Node.js",
        "Express.js",
        "JWT",
        "MongoDB",
      ],
      difficulty: "Intermediate",
    },
    {
      title: "Inventory Management API",
      description:
        "Build an API for managing products, stock levels and inventory operations.",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API",
      ],
      difficulty: "Advanced",
    },
  ],
};

const getProjectRecommendations = (
  careerPath,
  userSkills = []
) => {
  const recommendations =
    projectRecommendations[careerPath] || [];

  const normalizedSkills = userSkills.map((skill) =>
    skill.trim().toLowerCase()
  );

  return recommendations
    .map((project) => {
      const missingSkills = project.skills.filter(
        (skill) =>
          !normalizedSkills.includes(
            skill.toLowerCase()
          )
      );

      const matchedSkills = project.skills.filter(
        (skill) =>
          normalizedSkills.includes(
            skill.toLowerCase()
          )
      );

      return {
        ...project,
        matchedSkills,
        missingSkills,
        relevanceScore: Math.round(
          (matchedSkills.length /
            project.skills.length) *
            100
        ),
      };
    })
    .sort(
      (a, b) =>
        b.relevanceScore - a.relevanceScore
    );
};

module.exports = {
  getProjectRecommendations,
};