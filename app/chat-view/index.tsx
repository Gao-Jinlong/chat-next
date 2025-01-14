"use client";

import { InputCard } from "@/components/domain/Input-card";
import { MessageList } from "@/components/domain/message-list";
import { useCallback, useContext } from "react";
import { ChatContext } from "./chat-context";

export default function ChatView() {
  const { pushMessage, setLoading } = useContext(ChatContext);

  const handleSubmit = useCallback(
    async (content: string) => {
      try {
        setLoading(true);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content }),
        });

        const data = await response.json();

        const message = data.response.kwargs.content;

        pushMessage({ role: "assistant", content: message });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
    [pushMessage, setLoading],
  );

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 p-4">
      <MessageList />
      <InputCard onSubmit={handleSubmit} />
    </main>
  );
}
