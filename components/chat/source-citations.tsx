"use client";

import { Source } from "@/lib/types";
import { ExternalLink } from "lucide-react";

interface SourceCitationsProps {
  sources: Source[];
}

export function SourceCitations({ sources }: SourceCitationsProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-[#20c997]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 className="text-base font-semibold text-gray-800">Sources</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{sources.length}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-[#20c997] hover:shadow-md bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#f0fdf4] transition-all duration-200 animate-fadeIn"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#20c997] to-[#1bb589] flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {source.citation || idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#20c997] transition-colors">
                  {source.name}
                </p>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {source.domain && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  {source.domain}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

