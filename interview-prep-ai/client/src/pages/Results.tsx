import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateOverallScore } from "@/lib/feedback";
import { Feedback, Question } from "@/lib/types";
import { Award, BarChart3, CheckCircle, TrendingUp } from "lucide-react";
import React from "react";

interface ResultsProps {
  questions: Question[];
  answers: string[];
  feedbacks: Feedback[];
  userName: string;
  userRole: string;
  onTryAgain: () => void;
  onNewInterview: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  questions,
  answers,
  feedbacks,
  userName,
  userRole,
  onTryAgain,
  onNewInterview,
}) => {
  const scores = feedbacks.map((f) => f.score);
  const overallScore = calculateOverallScore(scores);

  // Generate session-level insights
  const allStrengths = new Map<string, number>();
  const allImprovements = new Map<string, number>();

  feedbacks.forEach((feedback) => {
    feedback.strengths.forEach((strength) => {
      allStrengths.set(strength, (allStrengths.get(strength) || 0) + 1);
    });
    feedback.improvements.forEach((improvement) => {
      allImprovements.set(
        improvement,
        (allImprovements.get(improvement) || 0) + 1
      );
    });
  });

  const topStrengths = Array.from(allStrengths.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([strength]) => strength);

  const topImprovements = Array.from(allImprovements.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([improvement]) => improvement);

  const nextSteps = [
    "Practice answering similar questions to build confidence",
    "Record yourself and review for clarity and pacing",
    "Research the company and role to prepare targeted responses",
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-blue-50";
    if (score >= 40) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Interview Complete!
          </h1>
          <p className="text-lg text-gray-600">
            Great effort, {userName}! Here's your performance summary.
          </p>
        </div>

        {/* Overall Score Card */}
        <Card
          className={`p-12 text-center mb-8 ${getScoreBgColor(overallScore)} border-2 shadow-lg slide-up`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className={`w-8 h-8 ${getScoreColor(overallScore)}`} />
            <h2 className="text-2xl font-bold text-gray-900">Overall Score</h2>
          </div>
          <div className={`text-7xl font-bold ${getScoreColor(overallScore)} mb-2`}>
            {overallScore}%
          </div>
          <p className="text-gray-600">
            {overallScore >= 80 && "Excellent performance! You're well-prepared."}
            {overallScore >= 60 &&
              overallScore < 80 &&
              "Good performance! Keep practicing to improve further."}
            {overallScore >= 40 &&
              overallScore < 60 &&
              "Fair performance. Focus on the improvement areas below."}
            {overallScore < 40 &&
              "Keep practicing! Review the feedback and try again."}
          </p>
        </Card>

        {/* Question Breakdown */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Question Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((question, idx) => {
              const feedback = feedbacks[idx];
              const score = feedback.score;
              return (
                <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900 flex-1">
                      Q{idx + 1}: {question.text.substring(0, 50)}...
                    </h4>
                    <span className="text-2xl font-bold text-blue-600 ml-2">
                      {score}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(score / 10) * 100}%` }}
                    ></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Strengths */}
        <Card className="p-8 mb-8 bg-green-50 border-2 border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Your Strengths
          </h3>
          <ul className="space-y-3">
            {topStrengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Improvements */}
        <Card className="p-8 mb-8 bg-blue-50 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Areas to Improve
          </h3>
          <ul className="space-y-3">
            {topImprovements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">→</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 mb-8 bg-purple-50 border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h3>
          <ol className="space-y-3">
            {nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">{idx + 1}.</span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={onTryAgain}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold"
          >
            Try Again
          </Button>
          <Button
            onClick={onNewInterview}
            className="flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          >
            New Interview
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>
            Keep practicing to improve your interview skills. Good luck with your
            upcoming interviews!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
