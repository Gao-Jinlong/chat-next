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
}
export const ChatContext = createContext<ChatModel>({
  messages: [],
  hasMessage: false,
  pushMessage: () => {},
  loading: false,
  setLoading: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const pushMessage = useCallback((message: Message) => {
    console.log("🚀 ~ pushMessage ~ message:", message);
    setMessages((prev) => [...prev, message]);
  }, []);

  const hasMessage = useMemo(() => messages.length > 0, [messages]);

  return (
    <ChatContext.Provider
      value={{ messages, pushMessage, hasMessage, loading, setLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
};
