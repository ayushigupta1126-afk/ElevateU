const generateCareerAdvice = async (req, res) => {
  try {
    const {
      message,
      careerPath,
      skills,
      projects,
      certificates,
    } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const question = message.toLowerCase();

    let reply = "";

    // Career-specific guidance
    if (
      question.includes("full stack") ||
      careerPath === "Full Stack Developer"
    ) {
      reply = `
For a Full Stack Developer career, focus on these areas:

1. Frontend
• HTML
• CSS
• JavaScript
• React

2. Backend
• Node.js
• Express.js
• REST APIs

3. Database
• MongoDB
• Basic database design

4. Development Tools
• Git
• GitHub

Based on your current profile, keep improving the skills you
have already started and then move toward backend development.

Recommended project:
Build a complete MERN application with authentication,
CRUD operations, MongoDB and REST APIs.

Your next goal should be to combine your frontend and backend
skills into one complete project.
`;
    }

    // Skill-related questions
    else if (
      question.includes("skill") ||
      question.includes("learn") ||
      question.includes("improve")
    ) {
      reply = `
Your next learning step should be based on your selected
career path and the skills you already have.

A good approach is:

1. Identify the skills required for your career.
2. Compare them with your current skills.
3. Pick one missing skill at a time.
4. Practice it using a small project.
5. Add the completed project to your portfolio.

Do not try to learn too many technologies at once.
Focus on strong fundamentals first.
`;
    }

    // Project-related questions
    else if (
      question.includes("project") ||
      question.includes("portfolio")
    ) {
      reply = `
For career growth, practical projects are very important.

Try building projects that demonstrate:

• Real-world problem solving
• Authentication
• Database usage
• REST APIs
• Responsive frontend
• Clean UI
• GitHub version control

For your portfolio, prefer 2–4 strong projects instead of
many very small projects.

A full-stack project with a real use case can demonstrate
multiple skills at the same time.
`;
    }

    // Resume-related questions
    else if (
      question.includes("resume") ||
      question.includes("cv")
    ) {
      reply = `
A strong student resume should include:

• Short professional summary
• Technical skills
• Projects
• Certifications
• Education
• GitHub profile
• Portfolio link

For projects, mention what you built, which technologies
you used and what problem the project solves.

Keep the resume concise and focused on relevant skills.
`;
    }

    // Interview-related questions
    else if (
      question.includes("interview") ||
      question.includes("job")
    ) {
      reply = `
For technical interview preparation, focus on:

• Programming fundamentals
• Data structures and algorithms
• Your main technologies
• Database concepts
• REST APIs
• Git and GitHub
• Projects from your resume

You should also be able to explain every major feature
of the projects you have listed on your resume.
`;
    }

    // Default response
    else {
      reply = `
I can help you with your career development.

You can ask me things like:

• What skills should I learn next?
• Which project should I build?
• How can I improve my resume?
• How should I prepare for interviews?
• What should I learn for Full Stack Development?
• How can I improve my portfolio?

Try asking a specific career-related question for
more useful guidance.
`;
    }

    res.status(200).json({
      success: true,
      reply: reply.trim(),
    });
  } catch (error) {
    console.error(
      "AI career assistant error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to generate career advice",
    });
  }
};

module.exports = {
  generateCareerAdvice,
};