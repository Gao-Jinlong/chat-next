"use client";

import { createContext, useCallback, useMemo, useState } from "react";
export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatModel {
  messages: Message[];
  hasMessage: boolean;
  pushMessage: (message: Message) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  topic: string | null;
  setTopic: (topic: string | null) => void;
  theme: string | null;
  setTheme: (theme: string | null) => void;
  sendMessage: (content: string) => Promise<void>;
}
export const ChatContext = createContext<ChatModel>({
  messages: [],
  hasMessage: false,
  pushMessage: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  theme: null,
  setTheme: () => {},
  topic: null,
  setTopic: () => {},
  sendMessage: async () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);

  const hasMessage = useMemo(() => messages.length > 0, [messages]);

  const pushMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        setError(null);
        setLoading(true);
        pushMessage({ role: "user", content });

        if (!hasMessage) {
          setTheme(content.slice(0, 10));
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const message = data.response.kwargs.content;
        pushMessage({ role: "assistant", content: message });
      } catch (error) {
        console.error("Error:", error);
        setError(
          error instanceof Error ? error.message : "消息发送失败，请重试",
        );
      } finally {
        setLoading(false);
      }
    },
    [hasMessage, pushMessage],
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        pushMessage,
        hasMessage,
        loading,
        setLoading,
        error,
        setError,
        sendMessage,
        topic,
        setTopic,
        theme,
        setTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
