"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Message } from "@/lib/types";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";
import { useStreaming } from "@/hooks/use-streaming";
import { Header } from "@/components/chat/header";
import { Sidebar } from "@/components/layout/sidebar";
import { FloatingActions } from "@/components/chat/floating-actions";
import { TypingIndicator } from "@/components/chat/typing-indicator";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const { streamResponse, isLoading } = useStreaming();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query && !hasInitialized.current) {
      hasInitialized.current = true;
      handleSendMessage(query);
    }
  }, [searchParams]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      status: "streaming",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    await streamResponse(
      content,
      (update) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "assistant") {
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              ...update,
            };
          }
          return newMessages;
        });
      },
      () => {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "assistant") {
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              status: "complete",
            };
          }
          return newMessages;
        });
      }
    );
  };

  const handleNewChat = () => {
    router.push("/");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRelatedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      
      <div className="flex-1 ml-20 flex flex-col">
        {/* Header */}
        <Header />

        {/* Messages */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center">
                  <svg className="w-9 h-9 text-[#20c997]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.05-.99-7-4.96-7-9.5V8.41l7-3.89 7 3.89V11c0 4.54-2.95 8.51-7 9.5z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Ask anything to get started</p>
              </div>
            </div>
          ) : (
            <>
              <MessageList messages={messages} onRelatedQuestion={handleRelatedQuestion} />
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </main>

        {/* Floating Actions */}
        <FloatingActions onScrollToTop={scrollToTop} />

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onNewChat={handleNewChat}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
            <svg className="w-9 h-9 text-[#20c997] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.05-.99-7-4.96-7-9.5V8.41l7-3.89 7 3.89V11c0 4.54-2.95 8.51-7 9.5z"/>
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
