import api from "./api";

/*
  Placement Practice Lab API service
  ----------------------------------
  All placement-related API calls are kept here
  so the pages/components remain clean.
*/

// Get available practice questions
export const getPracticeQuestions = async (params = {}) => {
  const response = await api.get("/placement/questions", {
    params,
  });

  return response.data;
};

// Get a single practice question
export const getPracticeQuestion = async (questionId) => {
  const response = await api.get(
    `/placement/questions/${questionId}`
  );

  return response.data;
};

// Submit an answer
export const submitPracticeAnswer = async (
  questionId,
  selectedAnswer
) => {
  const response = await api.post(
    `/placement/questions/${questionId}/answer`,
    {
      selectedAnswer,
    }
  );

  return response.data;
};

// Get user's placement practice progress
export const getPlacementProgress = async () => {
  const response = await api.get("/placement/progress");

  return response.data;
};

// Get user's placement readiness
export const getPlacementReadiness = async () => {
  const response = await api.get("/placement/readiness");

  return response.data;
};