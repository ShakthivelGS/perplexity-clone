"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, RotateCcw } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, onNewChat, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask a follow-up question..."
            disabled={isLoading}
            className="w-full resize-none rounded-lg bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 pr-24 focus:border-[#20c997] focus:ring-2 focus:ring-[#20c997]/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onNewChat}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              New Chat
            </Button>
            <Button 
              type="submit" 
              size="sm" 
              disabled={!input.trim() || isLoading}
              className="bg-[#20c997] hover:bg-[#1bb589] text-white"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
