"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleNewChat = () => {
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2.5 group"
          >
            <span className="text-lg font-light">
              <span className="text-gray-900">perplexity</span>
              <span className="text-[#20c997] font-normal">pro</span>
            </span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New Thread</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
