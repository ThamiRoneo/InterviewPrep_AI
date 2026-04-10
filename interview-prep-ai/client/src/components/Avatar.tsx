import { AvatarState } from "@/lib/types";
import React from "react";

interface AvatarProps {
  state: AvatarState;
}

export const Avatar: React.FC<AvatarProps> = ({ state }) => {
  const getAvatarExpression = () => {
    switch (state) {
      case "idle":
        return {
          eyes: "○ ○",
          mouth: "─",
          emoji: "😊",
        };
      case "speaking":
        return {
          eyes: "◉ ◉",
          mouth: "∪",
          emoji: "🗣️",
        };
      case "listening":
        return {
          eyes: "◉ ◉",
          mouth: "◯",
          emoji: "👂",
        };
      case "thinking":
        return {
          eyes: "◉ ◉",
          mouth: "🤔",
          emoji: "💭",
        };
      case "happy":
        return {
          eyes: "◉ ◉",
          mouth: "∩",
          emoji: "😄",
        };
      case "encouraging":
        return {
          eyes: "◉ ◉",
          mouth: "✓",
          emoji: "👍",
        };
      default:
        return {
          eyes: "○ ○",
          mouth: "─",
          emoji: "😊",
        };
    }
  };

  const expression = getAvatarExpression();
  const isAnimating =
    state === "speaking" ||
    state === "listening" ||
    state === "thinking" ||
    state === "happy";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Avatar Circle */}
      <div
        className={`
          relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100
          flex items-center justify-center shadow-lg
          ${isAnimating ? "avatar-breathe" : ""}
          transition-all duration-300
        `}
      >
        {/* Avatar Content */}
        <div className="text-6xl">{expression.emoji}</div>

        {/* Animated Ring for Speaking/Listening */}
        {(state === "speaking" || state === "listening") && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-25"></div>
          </>
        )}

        {/* Thinking Indicator */}
        {state === "thinking" && (
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
        )}
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 capitalize">
          {state === "idle" && "Ready to begin"}
          {state === "speaking" && "Speaking..."}
          {state === "listening" && "Listening to your response..."}
          {state === "thinking" && "Analyzing your answer..."}
          {state === "happy" && "Great job!"}
          {state === "encouraging" && "Keep going!"}
        </p>
      </div>
    </div>
  );
};

export default Avatar;
