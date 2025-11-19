"use client";

import { UserCircle2 } from "lucide-react";

interface UserMessageProps {
  content: string;
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex gap-4 items-start py-6 border-b border-gray-100 animate-fadeIn">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-2 ring-gray-100">
        <UserCircle2 className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1 pt-1">
        <p className="text-[15px] text-gray-900 font-medium leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
