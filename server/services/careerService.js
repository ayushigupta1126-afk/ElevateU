const careerSkills = {
  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "REST API",
    "Git",
  ],

  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git",
  ],

  "Backend Developer": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST API",
    "Git",
  ],

  "Data Analyst": [
    "Python",
    "SQL",
    "Excel",
    "Pandas",
    "Data Visualization",
  ],

  "UI/UX Designer": [
    "Figma",
    "Wireframing",
    "Prototyping",
    "UI Design",
    "UX Research",
  ],

  "Mobile App Developer": [
    "JavaScript",
    "React Native",
    "APIs",
    "Git",
    "UI Design",
  ],
};

const getRequiredSkills = (careerPath) => {
  return careerSkills[careerPath] || [];
};

const getAllCareerPaths = () => {
  return Object.keys(careerSkills);
};

module.exports = {
  careerSkills,
  getRequiredSkills,
  getAllCareerPaths,
};