// Interview Types
export type InterviewType = "technical" | "behavioural" | "general";
export type Difficulty = "junior" | "mid" | "senior";
export type AvatarState = "idle" | "speaking" | "listening" | "thinking" | "happy" | "encouraging";

// Question
export interface Question {
  id: string;
  text: string;
  type: InterviewType;
  difficulty: Difficulty;
  category?: string;
}

// User Session
export interface UserSession {
  name: string;
  role: string;
  interviewType: InterviewType;
  difficulty: Difficulty;
}

// Answer
export interface Answer {
  questionId: string;
  text: string;
  duration: number; // in seconds
}

// Feedback
export interface Feedback {
  score: number; // 1-10
  strengths: string[];
  improvements: string[];
  suggestedAnswer: string;
}

// Question with Feedback
export interface QuestionWithFeedback {
  question: Question;
  answer: Answer;
  feedback: Feedback;
}

// Interview State
export interface InterviewState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
  feedbacks: Feedback[];
  startTime: number;
  endTime?: number;
}

// Results
export interface InterviewResults {
  userSession: UserSession;
  questions: QuestionWithFeedback[];
  overallScore: number;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  totalDuration: number;
}

// Screen Types
export type ScreenType = "landing" | "interview" | "results";
