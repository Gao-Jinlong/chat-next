"use client";

import { InputCard } from "@/components/domain/Input-card";
import { MessageList } from "@/components/domain/message-list";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (content: string) => {
    try {
      setLoading(true);
      setMessages((prev) => [...prev, { role: "user", content }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      const message = data.response.kwargs.content;

      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">AI 聊天助手</h1>
      <MessageList messages={messages} loading={loading} />
      <InputCard onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}
