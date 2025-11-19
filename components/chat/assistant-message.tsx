"use client";

import { useState } from "react";
import { Message } from "@/lib/types";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { SearchProgress } from "./search-progress";
import { SourceCitations } from "./source-citations";
import { RelatedQuestions } from "./related-questions";

interface AssistantMessageProps {
  message: Message;
  onRelatedQuestion?: (question: string) => void;
}

function formatContent(content: string): string {
  // Convert markdown tables to HTML
  const lines = content.split('\n');
  let html = '';
  let inTable = false;
  let isHeaderRow = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect table rows
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        html += '<div class="overflow-x-auto"><table>';
        inTable = true;
        isHeaderRow = true;
      }
      
      // Check if this is a separator row
      if (line.match(/^\|[\s:-]+\|/)) {
        continue;
      }
      
      const cells = line.split('|').filter(cell => cell.trim());
      const tag = isHeaderRow ? 'th' : 'td';
      const rowTag = isHeaderRow ? 'thead' : 'tbody';
      
      if (isHeaderRow) {
        html += `<${rowTag}><tr>`;
      } else if (i > 0 && lines[i-1].match(/^\|[\s:-]+\|/)) {
        html += `<${rowTag}><tr>`;
      } else {
        html += '<tr>';
      }
      
      cells.forEach((cell, idx) => {
        const content = cell.trim();
        // Add ranking badge for first column if it's a number
        if (idx === 0 && !isNaN(Number(content))) {
          html += `<${tag}><span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#20c997] to-[#1bb589] text-white font-bold text-sm shadow-sm">${content}</span></${tag}>`;
        } else {
          html += `<${tag}>${content}</${tag}>`;
        }
      });
      
      if (isHeaderRow) {
        html += `</tr></${rowTag}>`;
        isHeaderRow = false;
      } else {
        html += '</tr>';
      }
    } else {
      if (inTable) {
        html += '</tbody></table></div>';
        inTable = false;
      }
      
      if (line) {
        // Handle bold
        let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
        // Handle links
        formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-[#20c997] hover:text-[#1bb589] underline font-medium">$1</a>');
        html += `<p class="mb-2">${formatted}</p>`;
      }
    }
  }
  
  if (inTable) {
    html += '</tbody></table></div>';
  }
  
  return html;
}

export function AssistantMessage({ message, onRelatedQuestion }: AssistantMessageProps) {
  const isStreaming = message.status === "streaming";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (message.content) {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-4 items-start py-6 group">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#20c997] to-[#1bb589] flex items-center justify-center shadow-md">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 space-y-4 min-w-0">
        {/* Copy Button */}
        {message.content && !isStreaming && (
          <button
            onClick={handleCopy}
            className="float-right ml-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100"
            title="Copy response"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
        {/* Goals/Plan Section */}
        {message.goals && message.goals.length > 0 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-[#e6f9f4] to-[#f0fdf4] rounded-xl border-l-4 border-[#20c997] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Loader2 className="w-4 h-4 text-[#20c997] animate-spin" />
              <span className="text-sm font-semibold text-gray-800">Research Plan</span>
            </div>
            <div className="space-y-2">
              {message.goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-start gap-2 text-sm text-gray-700 animate-slideIn"
                >
                  <svg className="w-4 h-4 mt-0.5 text-[#20c997] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="flex-1">{goal.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Progress */}
        {message.searchResults && message.searchResults.length > 0 && (
          <SearchProgress results={message.searchResults} />
        )}

        {/* Answer Content */}
        {message.content && (
          <div className="prose prose-gray max-w-none">
            <div 
              className="text-gray-800 leading-relaxed text-[15px]"
              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
            />
            {isStreaming && (
              <span className="inline-block w-1 h-5 bg-[#20c997] ml-1 animate-pulse" />
            )}
          </div>
        )}

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <SourceCitations sources={message.sources} />
        )}

        {/* Related Questions */}
        {!isStreaming && message.content && onRelatedQuestion && (
          <RelatedQuestions onQuestionClick={onRelatedQuestion} />
        )}
      </div>
    </div>
  );
}
