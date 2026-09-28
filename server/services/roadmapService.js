const roadmapResources = {
  HTML: {
    level: "Beginner",
    resource: "Learn HTML fundamentals and semantic web structure",
    project: "Build a personal portfolio webpage",
  },

  CSS: {
    level: "Beginner",
    resource: "Learn responsive design, Flexbox and Grid",
    project: "Build a responsive landing page",
  },

  JavaScript: {
    level: "Beginner",
    resource: "Learn JavaScript fundamentals, DOM and ES6",
    project: "Build an interactive JavaScript application",
  },

  React: {
    level: "Intermediate",
    resource: "Learn React components, hooks and state management",
    project: "Build a React dashboard",
  },

  "Node.js": {
    level: "Intermediate",
    resource: "Learn Node.js, Express and REST APIs",
    project: "Build a REST API",
  },

  "Express.js": {
    level: "Intermediate",
    resource: "Learn Express routing, middleware and APIs",
    project: "Build an authentication API",
  },

  MongoDB: {
    level: "Intermediate",
    resource: "Learn MongoDB collections, queries and Mongoose",
    project: "Build a MongoDB-backed application",
  },

  "REST API": {
    level: "Intermediate",
    resource: "Learn REST architecture and API design",
    project: "Build a complete CRUD API",
  },

  Git: {
    level: "Beginner",
    resource: "Learn Git, GitHub and version control",
    project: "Publish a project on GitHub",
  },

  Python: {
    level: "Beginner",
    resource: "Learn Python programming fundamentals",
    project: "Build a Python data analysis project",
  },

  SQL: {
    level: "Beginner",
    resource: "Learn SQL queries, joins and database concepts",
    project: "Create and analyze a relational database",
  },

  Excel: {
    level: "Beginner",
    resource: "Learn Excel formulas, charts and data analysis",
    project: "Create an Excel data dashboard",
  },

  Pandas: {
    level: "Intermediate",
    resource: "Learn Pandas for data manipulation and analysis",
    project: "Analyze a real-world dataset",
  },

  "Data Visualization": {
    level: "Intermediate",
    resource: "Learn charts, dashboards and data storytelling",
    project: "Create a data visualization dashboard",
  },

  Figma: {
    level: "Beginner",
    resource: "Learn Figma tools and interface design",
    project: "Design a complete website in Figma",
  },

  Wireframing: {
    level: "Beginner",
    resource: "Learn wireframe and layout design techniques",
    project: "Create wireframes for a web application",
  },

  Prototyping: {
    level: "Intermediate",
    resource: "Learn interactive prototyping in Figma",
    project: "Create an interactive application prototype",
  },

  "UI Design": {
    level: "Intermediate",
    resource: "Learn modern UI design principles",
    project: "Design a complete responsive interface",
  },

  "UX Research": {
    level: "Beginner",
    resource: "Learn user research and usability techniques",
    project: "Conduct a small UX research case study",
  },

  "React Native": {
    level: "Intermediate",
    resource: "Learn React Native and mobile UI development",
    project: "Build a cross-platform mobile app",
  },

  APIs: {
    level: "Intermediate",
    resource: "Learn API integration and authentication",
    project: "Integrate a third-party API into an app",
  },
};

const generateRoadmap = (missingSkills) => {
  return missingSkills.map((skill, index) => {
    const resource = roadmapResources[skill];

    return {
      step: index + 1,
      skill,
      level: resource?.level || "Beginner",
      resource:
        resource?.resource ||
        `Learn the fundamentals of ${skill}`,
      project:
        resource?.project ||
        `Build a project using ${skill}`,
    };
  });
};

module.exports = {
  roadmapResources,
  generateRoadmap,
};