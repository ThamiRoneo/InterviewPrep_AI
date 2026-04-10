import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Difficulty, InterviewType, UserSession } from "@/lib/types";
import { ArrowRight, Sparkles, Zap, Mic, BarChart3 } from "lucide-react";
import React, { useState, useEffect } from "react";

interface LandingProps {
  onStart: (session: UserSession) => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [interviewType, setInterviewType] = useState<InterviewType | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const isFormValid =
    name.trim() &&
    role.trim() &&
    interviewType &&
    difficulty;

  const handleStart = () => {
    if (isFormValid) {
      onStart({
        name: name.trim(),
        role: role.trim(),
        interviewType: interviewType as InterviewType,
        difficulty: difficulty as Difficulty,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InterviewPrep AI
            </span>
          </div>
          <div className="text-sm text-gray-600">Master your interviews</div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Master Your{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Interviews
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Practice with AI-powered mock interviews tailored to your role. Get instant feedback and build confidence before your real interview.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Zap, label: "5 Questions" },
                  { icon: Mic, label: "Voice Support" },
                  { icon: BarChart3, label: "Instant Feedback" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 hover:border-blue-300 transition-all duration-300"
                  >
                    <item.icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={() => {
                    const formElement = document.getElementById("interview-form");
                    formElement?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: Form Card */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isAnimating ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Start Your Interview
                </h2>

                <div id="interview-form" className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 text-base bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Role Input */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                      Target Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="e.g., Senior Software Engineer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-11 text-base bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Interview Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                      Interview Type
                    </Label>
                    <Select
                      value={interviewType}
                      onValueChange={(value) => setInterviewType(value as InterviewType)}
                    >
                      <SelectTrigger id="type" className="h-11 text-base bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="behavioural">Behavioural</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-sm font-semibold text-gray-700">
                      Difficulty Level
                    </Label>
                    <Select
                      value={difficulty}
                      onValueChange={(value) => setDifficulty(value as Difficulty)}
                    >
                      <SelectTrigger id="difficulty" className="h-11 text-base bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="mid">Mid-Level</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Start Button */}
                  <Button
                    onClick={handleStart}
                    disabled={!isFormValid}
                    className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    Start Interview
                  </Button>

                  {/* Info Text */}
                  <p className="text-center text-xs text-gray-500 pt-2">
                    5 questions • 120 seconds per question • Instant AI feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-gradient-to-b from-white to-blue-50/50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose InterviewPrep AI?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to ace your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Targeted Practice",
                desc: "Questions tailored to your role and experience level",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "🎤",
                title: "Voice Recognition",
                desc: "Practice speaking naturally with built-in voice support",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: "📊",
                title: "Instant Feedback",
                desc: "Get AI-powered analysis of your responses in real-time",
                color: "from-cyan-500 to-cyan-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-200 bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>
            InterviewPrep AI • Master your interviews with AI-powered practice
          </p>
        </div>
      </div>

      {/* Styles for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Landing;
