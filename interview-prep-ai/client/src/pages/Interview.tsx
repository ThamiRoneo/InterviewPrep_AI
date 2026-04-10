import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateFeedback } from "@/lib/feedback";
import {
  AvatarState,
  Difficulty,
  Feedback,
  InterviewType,
  Question,
} from "@/lib/types";
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  speakText,
  startListening,
  stopSpeaking,
} from "@/lib/voice";
import { Mic, MicOff, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface InterviewProps {
  questions: Question[];
  userType: InterviewType;
  userDifficulty: Difficulty;
  onComplete: (answers: string[], feedbacks: Feedback[]) => void;
}

export const Interview: React.FC<InterviewProps> = ({
  questions,
  userType,
  userDifficulty,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const hasRecognition = isSpeechRecognitionSupported();
  const hasSynthesis = isSpeechSynthesisSupported();

  // Read question aloud on load
  useEffect(() => {
    if (hasSynthesis && currentQuestion) {
      setAvatarState("speaking");
      speakText(currentQuestion.text)
        .then(() => {
          setAvatarState("listening");
        })
        .catch(() => {
          setAvatarState("idle");
        });
    }
  }, [currentQuestion, hasSynthesis]);

  // Timer countdown
  useEffect(() => {
    if (showFeedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFeedback]);

  const handleMicClick = async () => {
    if (!hasRecognition) {
      setMicError("Speech recognition is not supported in your browser. Please type your answer instead.");
      return;
    }

    try {
      setMicError(null);
      setIsListening(true);
      setAvatarState("listening");
      const transcript = await startListening();
      if (transcript) {
        setAnswer(transcript);
      }
      setAvatarState("idle");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to recognize speech";
      setMicError(errorMessage);
      console.error("Mic error:", error);
      setAvatarState("idle");
    } finally {
      setIsListening(false);
    }
  }

  const handleSubmit = async () => {
    if (answer.trim().length === 0) {
      alert("Please provide an answer before submitting");
      return;
    }

    setIsSubmitting(true);
    setAvatarState("thinking");
    stopSpeaking();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedFeedback = generateFeedback(answer);
    setFeedback(generatedFeedback);
    setShowFeedback(true);
    setAvatarState(generatedFeedback.score >= 7 ? "happy" : "encouraging");
    setIsSubmitting(false);
  };

  const handleNext = () => {
    const newAnswers = [...answers, answer];
    const newFeedbacks = [...feedbacks, feedback!];
    setAnswers(newAnswers);
    setFeedbacks(newFeedbacks);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
      setTimeLeft(120);
      setShowFeedback(false);
      setFeedback(null);
      setAvatarState("idle");
    } else {
      onComplete(newAnswers, newFeedbacks);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent =
    ((currentQuestionIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <span
              className={`text-2xl font-bold ${
                timeLeft <= 30 ? "text-red-600" : "text-blue-600"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Avatar */}
          <div className="flex justify-center lg:justify-start">
            <Avatar state={avatarState} />
          </div>

          {/* Right: Interview Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <Card className="p-8 bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 fade-in">
                {currentQuestion.text}
              </h3>
              <p className="text-sm text-gray-500">
                Category: {currentQuestion.category}
              </p>
            </Card>

            {!showFeedback ? (
              <>
                {/* Answer Input */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Your Answer
                  </label>
                  <Textarea
                    placeholder="Type your answer or use the microphone button..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-32 text-base p-4 resize-none"
                    disabled={isSubmitting || isListening}
                  />
                  {micError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">
                        <span className="font-semibold">⚠️ Microphone Error:</span> {micError}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 flex-wrap">
                  {hasRecognition && (
                    <Button
                      onClick={handleMicClick}
                      disabled={isSubmitting || isListening}
                      variant={isListening ? "default" : "outline"}
                      className="flex items-center gap-2"
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4" />
                          Listening...
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          Use Microphone
                        </>
                      )}
                    </Button>
                  )}

                  {hasSynthesis && (
                    <Button
                      onClick={() => {
                        setAvatarState("speaking");
                        speakText(currentQuestion.text)
                          .then(() => setAvatarState("listening"))
                          .catch(() => setAvatarState("idle"));
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      Repeat Question
                    </Button>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      isListening ||
                      answer.trim().length === 0
                    }
                    className="ml-auto bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? "Analyzing..." : "Submit Answer"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Feedback Card */}
                <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 slide-up">
                  <div className="space-y-6">
                    {/* Score */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-gray-900">
                        Score
                      </h4>
                      <div className="text-5xl font-bold text-blue-600">
                        {feedback!.score}
                        <span className="text-2xl text-gray-600">/10</span>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        ✓ What was good:
                      </h5>
                      <ul className="space-y-1">
                        {feedback!.strengths.map((strength, idx) => (
                          <li key={idx} className="text-gray-700">
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        → Areas to improve:
                      </h5>
                      <ul className="space-y-1">
                        {feedback!.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-gray-700">
                            • {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggested Answer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        💡 Suggested approach:
                      </h5>
                      <p className="text-gray-700">
                        {feedback!.suggestedAnswer}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Next Button */}
                <Button
                  onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "View Results"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
