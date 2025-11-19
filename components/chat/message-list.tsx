"use client";

import { Message } from "@/lib/types";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";

interface MessageListProps {
  messages: Message[];
  onRelatedQuestion?: (question: string) => void;
}

export function MessageList({ messages, onRelatedQuestion }: MessageListProps) {
  return (
    <div className="space-y-8 pb-32">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? (
            <UserMessage content={message.content} />
          ) : (
            <AssistantMessage message={message} onRelatedQuestion={onRelatedQuestion} />
          )}
        </div>
      ))}
    </div>
  );
}
