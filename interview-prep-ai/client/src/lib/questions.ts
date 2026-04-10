import { Question } from "./types";

export const QUESTIONS: Question[] = [
  // Technical - Junior
  {
    id: "t-j-1",
    text: "What is the difference between let, const, and var in JavaScript?",
    type: "technical",
    difficulty: "junior",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-j-2",
    text: "Explain what a callback function is and provide an example.",
    type: "technical",
    difficulty: "junior",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-j-3",
    text: "What is the DOM and how do you interact with it?",
    type: "technical",
    difficulty: "junior",
    category: "Web Development",
  },
  {
    id: "t-j-4",
    text: "Explain the concept of async/await in JavaScript.",
    type: "technical",
    difficulty: "junior",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-j-5",
    text: "What is a REST API and how does it work?",
    type: "technical",
    difficulty: "junior",
    category: "Web Development",
  },
  {
    id: "t-j-6",
    text: "Explain the difference between == and === in JavaScript.",
    type: "technical",
    difficulty: "junior",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-j-7",
    text: "What is CSS Flexbox and how do you use it?",
    type: "technical",
    difficulty: "junior",
    category: "CSS",
  },
  {
    id: "t-j-8",
    text: "Explain what React hooks are and give an example.",
    type: "technical",
    difficulty: "junior",
    category: "React",
  },

  // Technical - Mid
  {
    id: "t-m-1",
    text: "Explain the event loop in JavaScript and how it works.",
    type: "technical",
    difficulty: "mid",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-m-2",
    text: "What is closure in JavaScript? Provide a practical example.",
    type: "technical",
    difficulty: "mid",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-m-3",
    text: "Explain the difference between synchronous and asynchronous programming.",
    type: "technical",
    difficulty: "mid",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-m-4",
    text: "What is the difference between React class components and functional components?",
    type: "technical",
    difficulty: "mid",
    category: "React",
  },
  {
    id: "t-m-5",
    text: "Explain what state management is and why it's important in React.",
    type: "technical",
    difficulty: "mid",
    category: "React",
  },
  {
    id: "t-m-6",
    text: "What is a promise and how does it differ from a callback?",
    type: "technical",
    difficulty: "mid",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-m-7",
    text: "Explain the concept of higher-order components in React.",
    type: "technical",
    difficulty: "mid",
    category: "React",
  },
  {
    id: "t-m-8",
    text: "What is the difference between shallow and deep copying in JavaScript?",
    type: "technical",
    difficulty: "mid",
    category: "JavaScript Fundamentals",
  },

  // Technical - Senior
  {
    id: "t-s-1",
    text: "Explain the concept of memoization and its performance implications.",
    type: "technical",
    difficulty: "senior",
    category: "Performance",
  },
  {
    id: "t-s-2",
    text: "How would you optimize a React application for performance?",
    type: "technical",
    difficulty: "senior",
    category: "React",
  },
  {
    id: "t-s-3",
    text: "Explain the difference between microtasks and macrotasks in the event loop.",
    type: "technical",
    difficulty: "senior",
    category: "JavaScript Fundamentals",
  },
  {
    id: "t-s-4",
    text: "What are the best practices for error handling in a Node.js application?",
    type: "technical",
    difficulty: "senior",
    category: "Backend",
  },
  {
    id: "t-s-5",
    text: "Explain the concept of dependency injection and its benefits.",
    type: "technical",
    difficulty: "senior",
    category: "Architecture",
  },
  {
    id: "t-s-6",
    text: "How would you design a scalable microservices architecture?",
    type: "technical",
    difficulty: "senior",
    category: "Architecture",
  },

  // Behavioural - Junior
  {
    id: "b-j-1",
    text: "Tell me about a time when you had to learn something new quickly.",
    type: "behavioural",
    difficulty: "junior",
    category: "Learning",
  },
  {
    id: "b-j-2",
    text: "Describe a situation where you had to work with a difficult team member.",
    type: "behavioural",
    difficulty: "junior",
    category: "Teamwork",
  },
  {
    id: "b-j-3",
    text: "Tell me about your greatest weakness and how you're working to improve it.",
    type: "behavioural",
    difficulty: "junior",
    category: "Self-Awareness",
  },
  {
    id: "b-j-4",
    text: "Give an example of when you failed and what you learned from it.",
    type: "behavioural",
    difficulty: "junior",
    category: "Resilience",
  },
  {
    id: "b-j-5",
    text: "Why do you want to work for our company?",
    type: "behavioural",
    difficulty: "junior",
    category: "Motivation",
  },

  // Behavioural - Mid
  {
    id: "b-m-1",
    text: "Tell me about a time when you led a project or initiative.",
    type: "behavioural",
    difficulty: "mid",
    category: "Leadership",
  },
  {
    id: "b-m-2",
    text: "Describe a situation where you had to handle conflicting priorities.",
    type: "behavioural",
    difficulty: "mid",
    category: "Problem-Solving",
  },
  {
    id: "b-m-3",
    text: "Tell me about a time when you received critical feedback. How did you handle it?",
    type: "behavioural",
    difficulty: "mid",
    category: "Growth Mindset",
  },
  {
    id: "b-m-4",
    text: "Give an example of when you had to make a difficult decision.",
    type: "behavioural",
    difficulty: "mid",
    category: "Decision Making",
  },

  // Behavioural - Senior
  {
    id: "b-s-1",
    text: "Tell me about your most significant career achievement.",
    type: "behavioural",
    difficulty: "senior",
    category: "Achievement",
  },
  {
    id: "b-s-2",
    text: "Describe your approach to mentoring and developing junior team members.",
    type: "behavioural",
    difficulty: "senior",
    category: "Leadership",
  },
  {
    id: "b-s-3",
    text: "Tell me about a time when you had to influence a decision at a higher level.",
    type: "behavioural",
    difficulty: "senior",
    category: "Influence",
  },

  // General - Junior
  {
    id: "g-j-1",
    text: "Tell me about yourself and your background.",
    type: "general",
    difficulty: "junior",
    category: "Introduction",
  },
  {
    id: "g-j-2",
    text: "What are your career goals for the next five years?",
    type: "general",
    difficulty: "junior",
    category: "Goals",
  },
  {
    id: "g-j-3",
    text: "What are your strengths?",
    type: "general",
    difficulty: "junior",
    category: "Self-Assessment",
  },

  // General - Mid
  {
    id: "g-m-1",
    text: "How do you stay updated with industry trends and new technologies?",
    type: "general",
    difficulty: "mid",
    category: "Continuous Learning",
  },
  {
    id: "g-m-2",
    text: "What is your approach to problem-solving?",
    type: "general",
    difficulty: "mid",
    category: "Problem-Solving",
  },

  // General - Senior
  {
    id: "g-s-1",
    text: "How do you approach building and maintaining a high-performing team?",
    type: "general",
    difficulty: "senior",
    category: "Team Management",
  },
  {
    id: "g-s-2",
    text: "What is your vision for your career in the next ten years?",
    type: "general",
    difficulty: "senior",
    category: "Vision",
  },
];

export function getQuestionsByTypeAndDifficulty(
  type: string,
  difficulty: string
): Question[] {
  return QUESTIONS.filter(
    (q) => q.type === type && q.difficulty === difficulty
  );
}

export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
