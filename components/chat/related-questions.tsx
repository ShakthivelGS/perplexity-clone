"use client";

import { MessageSquare } from "lucide-react";

interface RelatedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

export function RelatedQuestions({ onQuestionClick }: RelatedQuestionsProps) {
  const questions = [
    "What are the top earning musicians in 2025?",
    "Who are the most streamed artists globally?",
    "What makes these singers so popular?",
    "How do artists gain followers on Spotify?",
  ];

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-gray-200 shadow-sm animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-[#20c997]" />
        <h3 className="text-base font-semibold text-gray-800">Related Questions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick(question)}
            className="text-left p-4 bg-white hover:bg-gradient-to-r hover:from-white hover:to-[#f0fdf4] rounded-xl border border-gray-200 hover:border-[#20c997] transition-all hover:shadow-md group"
          >
            <p className="text-sm text-gray-700 group-hover:text-[#20c997] transition-colors font-medium">
              {question}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
