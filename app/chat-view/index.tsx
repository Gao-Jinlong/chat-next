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
      // 添加用户消息
      setMessages((prev) => [...prev, { role: "user", content }]);

      // 发送到 API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      // 添加 AI 回复
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
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
