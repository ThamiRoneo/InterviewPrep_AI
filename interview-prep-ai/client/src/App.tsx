import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Interview from "@/pages/Interview";
import Landing from "@/pages/Landing";
import Results from "@/pages/Results";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  Difficulty,
  Feedback,
  InterviewType,
  Question,
  UserSession,
} from "./lib/types";
import {
  getQuestionsByTypeAndDifficulty,
  getRandomQuestions,
} from "./lib/questions";
import { useState } from "react";

type ScreenType = "landing" | "interview" | "results";

function Router() {
  const [screen, setScreen] = useState<ScreenType>("landing");
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const handleStartInterview = (session: UserSession) => {
    setUserSession(session);

    // Get questions based on type and difficulty
    const availableQuestions = getQuestionsByTypeAndDifficulty(
      session.interviewType,
      session.difficulty
    );

    // Select 5 random questions
    const selectedQuestions = getRandomQuestions(availableQuestions, 5);
    setQuestions(selectedQuestions);

    setScreen("interview");
  };

  const handleCompleteInterview = (
    submittedAnswers: string[],
    submittedFeedbacks: Feedback[]
  ) => {
    setAnswers(submittedAnswers);
    setFeedbacks(submittedFeedbacks);
    setScreen("results");
  };

  const handleTryAgain = () => {
    setAnswers([]);
    setFeedbacks([]);
    setScreen("interview");
  };

  const handleNewInterview = () => {
    setUserSession(null);
    setQuestions([]);
    setAnswers([]);
    setFeedbacks([]);
    setScreen("landing");
  };

  return (
    <Switch>
      <Route path={"/"}>
        {screen === "landing" && (
          <Landing onStart={handleStartInterview} />
        )}
        {screen === "interview" && userSession && (
          <Interview
            questions={questions}
            userType={userSession.interviewType}
            userDifficulty={userSession.difficulty}
            onComplete={handleCompleteInterview}
          />
        )}
        {screen === "results" && userSession && (
          <Results
            questions={questions}
            answers={answers}
            feedbacks={feedbacks}
            userName={userSession.name}
            userRole={userSession.role}
            onTryAgain={handleTryAgain}
            onNewInterview={handleNewInterview}
          />
        )}
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
