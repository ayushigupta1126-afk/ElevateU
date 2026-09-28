# ElevateU

ElevateU is a personalized career development platform designed to help students understand their career readiness, identify skill gaps, build projects, manage certificates, prepare resumes, and create a professional portfolio.

## Features

- User Authentication with JWT
- Student Profile Management
- Skills & Proficiency Tracking
- Career Path Selection
- Skill Gap Analysis
- Career Readiness Score
- Project Management
- Project-to-Skill Mapping
- Personalized Learning Roadmap
- Project Recommendations
- Certificate Management
- GitHub Integration
- AI Career Assistant
- Resume Builder
- Public Portfolio
- Analytics Dashboard
- Admin Dashboard

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs

### Database

- MongoDB
- Mongoose

## Project Structure

```text
ElevateU/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/ayushigupta1126-afk/ElevateU.git
cd ElevateU
```

### 2. Start the Backend

Open a terminal:

```bash
cd server
npm install
npm run dev
```

### 3. Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs using Vite and communicates with the Node.js/Express backend.

## Main Modules

### Career Intelligence

- Career Path Selection
- Career Readiness Score
- Skill Gap Analysis
- Personalized Learning Roadmap
- Project Recommendations

### Student Development

- Student Profile
- Skills & Proficiency
- Projects
- Certificates
- Resume Builder

### Professional Growth

- GitHub Integration
- Public Portfolio
- AI Career Assistant
- Analytics Dashboard

### Administration

- Admin Dashboard
- User Management
- Platform Management

## Purpose

ElevateU brings multiple career-development tools into one platform, helping students track their progress, identify missing skills, build practical projects, and prepare for professional opportunities.

## Authentication

ElevateU uses JWT-based authentication to protect user-specific features and API endpoints.

## Future Improvements

- Enhanced AI-powered career recommendations
- More detailed career analytics
- Additional GitHub-based project insights
- Expanded learning resources
- Improved portfolio customization

## Author

Ayushi Gupta