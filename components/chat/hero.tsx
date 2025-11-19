"use client";

import { useState } from "react";
import { Search, Globe, Paperclip, Lightbulb, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";

export function Hero() {
  const [question, setQuestion] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      router.push(`/search?q=${encodeURIComponent(question)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch(e as any);
    }
  };

  const suggestions = [
    "Google Antigravity coding IDE launch",
    "Nvidia earnings AI bubble fears",
    "Sundar Pichai AI bubble warning",
    "AI stocks collapse investor concerns",
    "Transneuron artificial brain chip breakthrough",
    "Austrian CO2 capture energy breakthrough",
  ];

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-6xl font-light mb-2">
              <span className="text-gray-900">perplexity</span>
              <span className="gradient-text font-semibold">pro</span>
            </h1>
            <p className="text-gray-500 text-lg mt-2">AI-powered search engine</p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative mb-8 animate-slideIn">
            <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#20c997] transition-all duration-300">
              <textarea
                placeholder="Ask anything. Type @ for mentions."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 px-4 py-4 pr-16 resize-none focus:outline-none text-base"
                rows={3}
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-4 h-4 text-[#20c997]" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Globe className="w-4 h-4 text-gray-400" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Lightbulb className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Globe className="w-4 h-4 text-gray-400" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Mic className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="p-2 bg-[#20c997] hover:bg-[#1bb589] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13v6l5.25 3.15.75-1.23-4.5-2.67V7H10z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
