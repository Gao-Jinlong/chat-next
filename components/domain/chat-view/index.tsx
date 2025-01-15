"use client";

import { MessageList } from "@/components/domain/message-list";
import { InputCard } from "../Input-card";
import { ChatProvider } from "./chat-context";
import { Title } from "./Title";

export default function ChatView() {
  return (
    <ChatProvider>
      <main className="mx-auto flex h-screen w-full max-w-4xl flex-col items-center justify-center gap-4 overflow-hidden p-4">
        <Title></Title>
        <MessageList />
        <InputCard />
      </main>
    </ChatProvider>
  );
}
