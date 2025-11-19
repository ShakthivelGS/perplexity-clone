"use client";

import { SearchResult } from "@/lib/types";
import { Globe, Check, Loader2 } from "lucide-react";

interface SearchProgressProps {
  results: SearchResult[];
}

export function SearchProgress({ results }: SearchProgressProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 space-y-3 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Globe className="w-4 h-4 text-[#20c997]" />
        <span>Searching the web</span>
        <div className="flex gap-1 ml-auto">
          <span className="w-2 h-2 bg-[#20c997] rounded-full animate-pulse"></span>
          <span className="w-2 h-2 bg-[#20c997] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-[#20c997] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
      <div className="space-y-2">
        {results.map((result, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 text-sm text-gray-700 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg animate-fadeIn"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {result.status === "REVIEWING" ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#20c997]" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-[#20c997] flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
            <span className="truncate flex-1">{result.name || result.url}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
