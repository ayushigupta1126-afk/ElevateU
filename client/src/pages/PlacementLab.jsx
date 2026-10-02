import React, { useEffect, useMemo, useState } from "react";
import "./PlacementLab.css";
import {
  getPracticeQuestions,
  submitPracticeAnswer,
} from "../services/placement";
import api from "../services/api";

const FALLBACK_INTERVIEW_QUESTIONS = [
  {
    id: "int-1",
    category: "Introduction",
    question: "Tell me about yourself.",
    hint: "Keep it around 60–90 seconds: education, technical skills, project work and your current goal.",
  },
  {
    id: "int-2",
    category: "Project",
    question: "Explain your ElevateU project and the problem it solves.",
    hint: "Explain the problem, your solution, technologies used, your contribution and what you learned.",
  },
  {
    id: "int-3",
    category: "JavaScript",
    question: "What is the difference between let, const and var in JavaScript?",
    hint: "Talk about scope, redeclaration, reassignment and hoisting.",
  },
  {
    id: "int-4",
    category: "React",
    question: "What is the difference between props and state in React?",
    hint: "Explain who controls each one and how changes affect rendering.",
  },
  {
    id: "int-5",
    category: "Backend",
    question: "What is middleware in Express.js?",
    hint: "Explain where middleware runs and give an authentication example.",
  },
  {
    id: "int-6",
    category: "Database",
    question: "Why would you use MongoDB in a MERN application?",
    hint: "Connect your answer to documents, JSON-like data and application development.",
  },
];

const CAREERS = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Developer",
];

const TOPICS = [
  "All Topics",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "HTML",
  "CSS",
  "DBMS",
  "DSA",
  "SQL",
  "Software Engineering",
];

const DIFFICULTIES = ["All Levels", "Easy", "Medium", "Hard"];

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getQuestionId(question) {
  return question?._id || question?.id;
}

export default function PlacementLab() {
  const [activeTab, setActiveTab] = useState("mcq");

  const [career, setCareer] = useState("Full Stack Developer");
  const [topic, setTopic] = useState("All Topics");
  const [difficulty, setDifficulty] = useState("All Levels");

  const [mcqs, setMcqs] = useState([]);
  const [codingQuestions, setCodingQuestions] = useState([]);
  const [interviewQuestions] = useState(FALLBACK_INTERVIEW_QUESTIONS);

  const [loadingMCQ, setLoadingMCQ] = useState(false);
  const [loadingCoding, setLoadingCoding] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [mcqIndex, setMcqIndex] = useState(0);

  const [codingIndex, setCodingIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const [interviewIndex, setInterviewIndex] = useState(0);
  const [showInterviewHint, setShowInterviewHint] = useState(false);

  const [message, setMessage] = useState("");

  const loadMCQs = async () => {
    try {
      setLoadingMCQ(true);
      setMessage("");

      /*
       * IMPORTANT:
       * First request questions without strict filters.
       * This prevents the UI becoming blank when the database uses
       * slightly different career/topic names.
       */
      const response = await getPracticeQuestions({
        limit: 50,
      });

      const questions = Array.isArray(response)
        ? response
        : response?.questions || [];

      setMcqs(questions);

      setSelectedAnswers({});
      setSubmittedAnswers({});
      setMcqIndex(0);

      if (!questions.length) {
        setMessage(
          "No MCQs are available in the database yet. Your Placement Lab is connected, but the question bank is empty."
        );
      }
    } catch (error) {
      console.error("MCQ loading error:", error);
      setMcqs([]);
      setMessage(
        error?.response?.data?.message ||
          "Unable to load MCQs. Please make sure the backend server is running."
      );
    } finally {
      setLoadingMCQ(false);
    }
  };

  const loadCodingQuestions = async () => {
    try {
      setLoadingCoding(true);

      const response = await api.get("/coding/questions", {
        params: {
          limit: 50,
        },
      });

      const questions = response?.data?.questions || [];

      setCodingQuestions(questions);
      setCodingIndex(0);

      if (questions.length) {
        const first = questions[0];

        setSelectedLanguage("javascript");
        setCode(
          first?.starterCode?.javascript ||
            "// Write your solution here\n"
        );
      }
    } catch (error) {
      console.error("Coding question loading error:", error);

      setCodingQuestions([]);
      setMessage(
        error?.response?.data?.message ||
          "Unable to load coding questions. Please make sure the backend is running."
      );
    } finally {
      setLoadingCoding(false);
    }
  };

  useEffect(() => {
    loadMCQs();
  }, []);

  useEffect(() => {
    if (activeTab === "coding" && codingQuestions.length === 0) {
      loadCodingQuestions();
    }
  }, [activeTab]);

  const filteredMCQs = useMemo(() => {
    return mcqs.filter((question) => {
      const questionCareer = normalize(question.career);
      const questionTopic = normalize(question.topic);
      const questionDifficulty = normalize(question.difficulty);

      const careerMatch =
        !career ||
        questionCareer === normalize(career) ||
        questionCareer.includes(normalize(career)) ||
        normalize(career).includes(questionCareer);

      const topicMatch =
        topic === "All Topics" ||
        questionTopic === normalize(topic) ||
        questionTopic.includes(normalize(topic)) ||
        normalize(topic).includes(questionTopic);

      const difficultyMatch =
        difficulty === "All Levels" ||
        questionDifficulty === normalize(difficulty);

      return careerMatch && topicMatch && difficultyMatch;
    });
  }, [mcqs, career, topic, difficulty]);

  const currentMCQ = filteredMCQs[mcqIndex];

  const currentCoding = codingQuestions[codingIndex];

  const currentInterview = interviewQuestions[interviewIndex];

  useEffect(() => {
    setMcqIndex(0);
  }, [career, topic, difficulty]);

  useEffect(() => {
    if (!currentCoding) return;

    setCode(
      currentCoding?.starterCode?.[selectedLanguage] ||
        "// Write your solution here\n"
    );
  }, [codingIndex, selectedLanguage, currentCoding]);

  const handleMCQAnswer = async (option) => {
    if (!currentMCQ) return;

    const id = getQuestionId(currentMCQ);

    setSelectedAnswers((previous) => ({
      ...previous,
      [id]: option,
    }));

    if (submittedAnswers[id]) return;

    try {
      const result = await submitPracticeAnswer(id, option);

      setSubmittedAnswers((previous) => ({
        ...previous,
        [id]: result,
      }));
    } catch (error) {
      console.error("Answer submission error:", error);

      /*
       * If backend answer submission is unavailable,
       * keep the selected option visible rather than breaking the UI.
       */
      setSubmittedAnswers((previous) => ({
        ...previous,
        [id]: {
          isCorrect: false,
          explanation:
            "Answer selected. The answer-checking service is currently unavailable.",
        },
      }));
    }
  };

  const nextMCQ = () => {
    if (mcqIndex < filteredMCQs.length - 1) {
      setMcqIndex((previous) => previous + 1);
    }
  };

  const previousMCQ = () => {
    if (mcqIndex > 0) {
      setMcqIndex((previous) => previous - 1);
    }
  };

  const nextCoding = () => {
    if (codingIndex < codingQuestions.length - 1) {
      setCodingIndex((previous) => previous + 1);
    }
  };

  const previousCoding = () => {
    if (codingIndex > 0) {
      setCodingIndex((previous) => previous - 1);
    }
  };

  const nextInterview = () => {
    if (interviewIndex < interviewQuestions.length - 1) {
      setInterviewIndex((previous) => previous + 1);
      setShowInterviewHint(false);
    }
  };

  const previousInterview = () => {
    if (interviewIndex > 0) {
      setInterviewIndex((previous) => previous - 1);
      setShowInterviewHint(false);
    }
  };

  const filteredCodingQuestions = useMemo(() => {
    return codingQuestions.filter((question) => {
      const questionCareer = normalize(question.career);
      const questionTopic = normalize(question.topic);
      const questionDifficulty = normalize(question.difficulty);

      const careerMatch =
        questionCareer === normalize(career) ||
        questionCareer.includes(normalize(career)) ||
        normalize(career).includes(questionCareer);

      const topicMatch =
        topic === "All Topics" ||
        questionTopic === normalize(topic) ||
        questionTopic.includes(normalize(topic)) ||
        normalize(topic).includes(questionTopic);

      const difficultyMatch =
        difficulty === "All Levels" ||
        questionDifficulty === normalize(difficulty);

      return careerMatch && topicMatch && difficultyMatch;
    });
  }, [codingQuestions, career, topic, difficulty]);

  useEffect(() => {
    setCodingIndex(0);
  }, [career, topic, difficulty]);

  const displayedCodingQuestions =
    filteredCodingQuestions.length > 0
      ? filteredCodingQuestions
      : codingQuestions;

  const displayedCoding = displayedCodingQuestions[codingIndex];

  useEffect(() => {
    if (displayedCoding) {
      setCode(
        displayedCoding?.starterCode?.[selectedLanguage] ||
          "// Write your solution here\n"
      );
    }
  }, [displayedCoding, selectedLanguage]);

  return (
    <main className="placement-page">
      <section className="placement-hero">
        <div className="placement-hero-copy">
          <div className="placement-eyebrow">
            ELEVATEU / PLACEMENT LAB
          </div>

          <h1>
            Practice with purpose.
            <span>Prepare with confidence.</span>
          </h1>

          <p>
            Strengthen your technical fundamentals, solve coding problems,
            and prepare for the conversations that happen after the test.
          </p>

          <div className="placement-meta">
            <span>
              <strong>{mcqs.length}</strong> MCQs loaded
            </span>

            <span>
              <strong>{codingQuestions.length}</strong> coding challenges
            </span>

            <span>
              <strong>{interviewQuestions.length}</strong> interview prompts
            </span>
          </div>
        </div>

        <div className="placement-hero-art">
          <div className="placement-orbit orbit-one" />
          <div className="placement-orbit orbit-two" />
          <div className="placement-orbit orbit-three" />

          <div className="placement-core">
            <span>YOUR</span>
            <strong>LAB</strong>
            <small>BUILD • TEST • GROW</small>
          </div>
        </div>
      </section>

      <section className="placement-workspace">
        <div className="placement-topbar">
          <div className="placement-tabs">
            <button
              type="button"
              className={activeTab === "mcq" ? "active" : ""}
              onClick={() => setActiveTab("mcq")}
            >
              <span>01</span>
              MCQ Practice
            </button>

            <button
              type="button"
              className={activeTab === "coding" ? "active" : ""}
              onClick={() => setActiveTab("coding")}
            >
              <span>02</span>
              Coding Practice
            </button>

            <button
              type="button"
              className={activeTab === "interview" ? "active" : ""}
              onClick={() => setActiveTab("interview")}
            >
              <span>03</span>
              Interview Practice
            </button>
          </div>

          <div className="placement-status">
            <i />
            Practice environment ready
          </div>
        </div>

        <div className="placement-filters">
          <label>
            <span>CAREER</span>
            <select
              value={career}
              onChange={(event) => setCareer(event.target.value)}
            >
              {CAREERS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            <span>TOPIC</span>
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            >
              {TOPICS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            <span>DIFFICULTY</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              {DIFFICULTIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          {activeTab === "mcq" && (
            <button
              type="button"
              className="refresh-button"
              onClick={loadMCQs}
            >
              Refresh questions
            </button>
          )}

          {activeTab === "coding" && (
            <button
              type="button"
              className="refresh-button"
              onClick={loadCodingQuestions}
            >
              Refresh challenges
            </button>
          )}
        </div>

        {message && (
          <div className="placement-message">
            <strong>Placement Lab</strong>
            <span>{message}</span>
          </div>
        )}

        {activeTab === "mcq" && (
          <section className="practice-area">
            <div className="practice-heading">
              <div>
                <span className="section-label">KNOWLEDGE CHECK</span>
                <h2>Test what you know.</h2>
              </div>

              <div className="question-counter">
                {filteredMCQs.length > 0
                  ? `${String(mcqIndex + 1).padStart(2, "0")} / ${String(
                      filteredMCQs.length
                    ).padStart(2, "0")}`
                  : "00 / 00"}
              </div>
            </div>

            {loadingMCQ ? (
              <div className="empty-state">
                <div className="loader" />
                <h3>Loading your questions...</h3>
                <p>Connecting to your Placement Lab question bank.</p>
              </div>
            ) : currentMCQ ? (
              <div className="question-layout">
                <article className="question-card">
                  <div className="question-card-top">
                    <div className="question-tags">
                      <span>{currentMCQ.topic}</span>
                      <span>{currentMCQ.difficulty}</span>
                    </div>

                    <span className="question-marks">
                      {currentMCQ.marks || 1} mark
                    </span>
                  </div>

                  <h3>{currentMCQ.question}</h3>

                  <div className="options-list">
                    {(currentMCQ.options || []).map((option, index) => {
                      const id = getQuestionId(currentMCQ);
                      const selected = selectedAnswers[id] === option;
                      const result = submittedAnswers[id];

                      let className = "answer-option";

                      if (selected) className += " selected";

                      if (
                        result &&
                        result.isCorrect &&
                        selected
                      ) {
                        className += " correct";
                      }

                      if (
                        result &&
                        !result.isCorrect &&
                        selected
                      ) {
                        className += " incorrect";
                      }

                      return (
                        <button
                          type="button"
                          key={`${option}-${index}`}
                          className={className}
                          onClick={() => handleMCQAnswer(option)}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </span>

                          <span>{option}</span>

                          <span className="option-check">
                            {selected
                              ? result?.isCorrect
                                ? "✓"
                                : result
                                ? "×"
                                : "•"
                              : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {submittedAnswers[getQuestionId(currentMCQ)] && (
                    <div
                      className={`answer-feedback ${
                        submittedAnswers[getQuestionId(currentMCQ)]
                          .isCorrect
                          ? "feedback-correct"
                          : "feedback-wrong"
                      }`}
                    >
                      <strong>
                        {submittedAnswers[getQuestionId(currentMCQ)]
                          .isCorrect
                          ? "Correct answer"
                          : "Review this one"}
                      </strong>

                      <p>
                        {
                          submittedAnswers[getQuestionId(currentMCQ)]
                            .explanation
                        }
                      </p>

                      {!submittedAnswers[getQuestionId(currentMCQ)]
                        .isCorrect &&
                        submittedAnswers[getQuestionId(currentMCQ)]
                          .correctAnswer && (
                          <small>
                            Correct answer:{" "}
                            {
                              submittedAnswers[getQuestionId(currentMCQ)]
                                .correctAnswer
                            }
                          </small>
                        )}
                    </div>
                  )}

                  <div className="question-actions">
                    <button
                      type="button"
                      onClick={previousMCQ}
                      disabled={mcqIndex === 0}
                    >
                      ← Previous
                    </button>

                    <button
                      type="button"
                      className="next-button"
                      onClick={nextMCQ}
                      disabled={mcqIndex === filteredMCQs.length - 1}
                    >
                      Next question →
                    </button>
                  </div>
                </article>

                <aside className="practice-side-note">
                  <span className="section-label">HOW TO USE IT</span>

                  <h3>Think first. Then choose.</h3>

                  <p>
                    Each answer is checked against the question bank.
                    You’ll see an explanation after answering so you can
                    understand the concept instead of just memorising it.
                  </p>

                  <div className="side-stat">
                    <strong>{filteredMCQs.length}</strong>
                    <span>questions in this session</span>
                  </div>
                </aside>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-number">01</div>
                <h3>No questions match these filters.</h3>
                <p>
                  Your question bank is connected. Try “All Topics” and
                  “All Levels” to see the available questions.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setTopic("All Topics");
                    setDifficulty("All Levels");
                  }}
                >
                  Show all questions
                </button>
              </div>
            )}
          </section>
        )}

        {activeTab === "coding" && (
          <section className="practice-area coding-area">
            <div className="practice-heading">
              <div>
                <span className="section-label">CODING CHALLENGE</span>
                <h2>Build the solution.</h2>
              </div>

              <div className="question-counter">
                {displayedCodingQuestions.length > 0
                  ? `${String(codingIndex + 1).padStart(2, "0")} / ${String(
                      displayedCodingQuestions.length
                    ).padStart(2, "0")}`
                  : "00 / 00"}
              </div>
            </div>

            {loadingCoding ? (
              <div className="empty-state">
                <div className="loader" />
                <h3>Loading coding challenges...</h3>
              </div>
            ) : displayedCoding ? (
              <div className="coding-layout">
                <article className="coding-problem">
                  <div className="coding-problem-top">
                    <div>
                      <span className="section-label">
                        {displayedCoding.topic}
                      </span>

                      <h3>{displayedCoding.title}</h3>
                    </div>

                    <span className="difficulty-pill">
                      {displayedCoding.difficulty}
                    </span>
                  </div>

                  <p className="coding-description">
                    {displayedCoding.description}
                  </p>

                  {displayedCoding.constraints?.length > 0 && (
                    <div className="coding-info-block">
                      <span>CONSTRAINTS</span>

                      <ul>
                        {displayedCoding.constraints.map(
                          (constraint, index) => (
                            <li key={index}>{constraint}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {displayedCoding.examples?.length > 0 && (
                    <div className="coding-info-block">
                      <span>EXAMPLE</span>

                      <div className="example-box">
                        <div>
                          <small>INPUT</small>
                          <code>
                            {displayedCoding.examples[0].input}
                          </code>
                        </div>

                        <div>
                          <small>OUTPUT</small>
                          <code>
                            {displayedCoding.examples[0].output}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="coding-navigation">
                    <button
                      type="button"
                      onClick={previousCoding}
                      disabled={codingIndex === 0}
                    >
                      ← Previous
                    </button>

                    <button
                      type="button"
                      className="next-button"
                      onClick={nextCoding}
                      disabled={
                        codingIndex === displayedCodingQuestions.length - 1
                      }
                    >
                      Next challenge →
                    </button>
                  </div>
                </article>

                <article className="editor-panel">
                  <div className="editor-toolbar">
                    <div className="language-tabs">
                      {["javascript", "cpp", "python", "java"].map(
                        (language) => (
                          <button
                            type="button"
                            key={language}
                            className={
                              selectedLanguage === language
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              setSelectedLanguage(language)
                            }
                          >
                            {language === "javascript"
                              ? "JavaScript"
                              : language === "cpp"
                              ? "C++"
                              : language === "python"
                              ? "Python"
                              : "Java"}
                          </button>
                        )
                      )}
                    </div>

                    <span>EDITOR</span>
                  </div>

                  <textarea
                    className="code-editor"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    spellCheck="false"
                    placeholder="Write your solution here..."
                  />

                  <div className="editor-footer">
                    <span>
                      Execution will be connected to the secure judge
                      next.
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setMessage(
                          "Code editor is ready. Secure Run/Submit execution will be connected next."
                        )
                      }
                    >
                      Run code
                    </button>
                  </div>
                </article>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-number">02</div>
                <h3>No coding challenge found.</h3>
                <p>
                  Refresh the challenge bank or make sure the backend is
                  running.
                </p>

                <button type="button" onClick={loadCodingQuestions}>
                  Load coding challenges
                </button>
              </div>
            )}
          </section>
        )}

        {activeTab === "interview" && (
          <section className="practice-area interview-area">
            <div className="practice-heading">
              <div>
                <span className="section-label">INTERVIEW ROOM</span>
                <h2>Prepare your answers.</h2>
              </div>

              <div className="question-counter">
                {String(interviewIndex + 1).padStart(2, "0")} /{" "}
                {String(interviewQuestions.length).padStart(2, "0")}
              </div>
            </div>

            <div className="interview-layout">
              <article className="interview-card">
                <div className="interview-number">
                  {String(interviewIndex + 1).padStart(2, "0")}
                </div>

                <div className="interview-content">
                  <span className="section-label">
                    {currentInterview.category}
                  </span>

                  <h3>{currentInterview.question}</h3>

                  <p>
                    Take a moment to structure your answer before
                    revealing the preparation hint.
                  </p>

                  {showInterviewHint && (
                    <div className="interview-hint">
                      <span>PREPARATION HINT</span>
                      <p>{currentInterview.hint}</p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="hint-button"
                    onClick={() =>
                      setShowInterviewHint((previous) => !previous)
                    }
                  >
                    {showInterviewHint
                      ? "Hide preparation hint"
                      : "Show preparation hint"}
                  </button>
                </div>
              </article>

              <aside className="interview-side">
                <span className="section-label">INTERVIEW TIP</span>

                <h3>Structure beats memorisation.</h3>

                <p>
                  Start with the direct answer, explain your reasoning,
                  and use a project example whenever possible.
                </p>

                <div className="interview-progress">
                  <span
                    style={{
                      width: `${
                        ((interviewIndex + 1) /
                          interviewQuestions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <small>
                  {interviewIndex + 1} of {interviewQuestions.length}
                </small>
              </aside>
            </div>

            <div className="question-actions interview-actions">
              <button
                type="button"
                onClick={previousInterview}
                disabled={interviewIndex === 0}
              >
                ← Previous
              </button>

              <button
                type="button"
                className="next-button"
                onClick={nextInterview}
                disabled={
                  interviewIndex === interviewQuestions.length - 1
                }
              >
                Next question →
              </button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}