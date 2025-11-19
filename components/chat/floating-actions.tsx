"use client";

import { useState } from "react";
import { ArrowUp, Share2, Bookmark, ThumbsUp } from "lucide-react";

interface FloatingActionsProps {
  onScrollToTop: () => void;
}

export function FloatingActions({ onScrollToTop }: FloatingActionsProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
      {/* Scroll to Top */}
      <button
        onClick={onScrollToTop}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#20c997] to-[#1bb589] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group animate-glow"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Share Button */}
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title: document.title, url: window.location.href });
          }
        }}
        className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-600 hover:text-[#20c997] hover:border-[#20c997] shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        title="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Bookmark Button */}
      <button
        className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-600 hover:text-[#20c997] hover:border-[#20c997] shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        title="Bookmark"
      >
        <Bookmark className="w-5 h-5" />
      </button>
    </div>
  );
}
