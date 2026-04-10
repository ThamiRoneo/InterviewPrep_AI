import { Feedback } from "./types";

const STRENGTH_KEYWORDS = [
  "because",
  "example",
  "specifically",
  "demonstrated",
  "achieved",
  "implemented",
  "learned",
  "improved",
  "collaborated",
  "resulted",
  "successfully",
];

const IMPROVEMENT_KEYWORDS = [
  "could",
  "might",
  "perhaps",
  "consider",
  "try",
  "explore",
];

function calculateScore(answer: string): number {
  let score = 5; // Base score

  // Length-based scoring
  const wordCount = answer.trim().split(/\s+/).length;
  if (wordCount < 20) {
    score -= 2;
  } else if (wordCount < 50) {
    score -= 1;
  } else if (wordCount > 200) {
    score += 1;
  }

  // Structure-based scoring
  const hasStructure = STRENGTH_KEYWORDS.some((keyword) =>
    answer.toLowerCase().includes(keyword)
  );
  if (hasStructure) {
    score += 2;
  }

  // Specificity check
  const hasNumbers = /\d+/.test(answer);
  const hasMetrics = /percent|%|time|year|month|day/.test(answer.toLowerCase());
  if (hasNumbers || hasMetrics) {
    score += 1;
  }

  // Ensure score is between 1-10
  return Math.max(1, Math.min(10, score));
}

function generateStrengths(answer: string, score: number): string[] {
  const strengths: string[] = [];

  if (answer.length > 100) {
    strengths.push("Provided a detailed and comprehensive response");
  }

  if (STRENGTH_KEYWORDS.some((kw) => answer.toLowerCase().includes(kw))) {
    strengths.push("Used specific examples and structured thinking");
  }

  if (/\d+/.test(answer) || /percent|%/.test(answer.toLowerCase())) {
    strengths.push("Included quantifiable metrics and data");
  }

  if (score >= 7) {
    strengths.push("Demonstrated clear communication and clarity");
  }

  if (strengths.length === 0) {
    strengths.push("Attempted to provide a thoughtful response");
  }

  return strengths.slice(0, 5);
}

function generateImprovements(answer: string, score: number): string[] {
  const improvements: string[] = [];

  if (answer.length < 50) {
    improvements.push("Expand your answer with more specific examples");
  }

  if (!STRENGTH_KEYWORDS.some((kw) => answer.toLowerCase().includes(kw))) {
    improvements.push("Use concrete examples to support your points");
  }

  if (!/\d+/.test(answer) && !/percent|%/.test(answer.toLowerCase())) {
    improvements.push("Include metrics or quantifiable results when applicable");
  }

  if (score <= 4) {
    improvements.push("Consider structuring your response more clearly");
  }

  if (score <= 5) {
    improvements.push("Add more depth to demonstrate your expertise");
  }

  return improvements.slice(0, 5);
}

function generateSuggestedAnswer(answer: string, score: number): string {
  if (score >= 8) {
    return "Your answer was excellent! You provided a well-structured response with specific examples and clear communication. Keep this approach in future interviews.";
  }

  if (score >= 6) {
    return "Your answer was good, but consider adding more specific examples or metrics to strengthen it. Structure your response with a clear introduction, supporting details, and conclusion.";
  }

  return "Consider expanding your answer with concrete examples, specific metrics, and a more structured approach. Use the STAR method (Situation, Task, Action, Result) for behavioral questions.";
}

export function generateFeedback(answer: string): Feedback {
  const score = calculateScore(answer);
  const strengths = generateStrengths(answer, score);
  const improvements = generateImprovements(answer, score);
  const suggestedAnswer = generateSuggestedAnswer(answer, score);

  return {
    score,
    strengths,
    improvements,
    suggestedAnswer,
  };
}

export function calculateOverallScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round((average / 10) * 100);
}

export function generateSessionStrengths(feedbacks: Feedback[]): string[] {
  const strengthCounts: Record<string, number> = {};

  feedbacks.forEach((feedback) => {
    feedback.strengths.forEach((strength) => {
      strengthCounts[strength] = (strengthCounts[strength] || 0) + 1;
    });
  });

  return Object.entries(strengthCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([strength]) => strength);
}

export function generateSessionImprovements(feedbacks: Feedback[]): string[] {
  const improvementCounts: Record<string, number> = {};

  feedbacks.forEach((feedback) => {
    feedback.improvements.forEach((improvement) => {
      improvementCounts[improvement] =
        (improvementCounts[improvement] || 0) + 1;
    });
  });

  return Object.entries(improvementCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([improvement]) => improvement);
}

export function generateNextSteps(): string[] {
  return [
    "Practice answering similar questions to build confidence",
    "Record yourself and review for clarity and pacing",
    "Research the company and role to prepare targeted responses",
  ];
}
