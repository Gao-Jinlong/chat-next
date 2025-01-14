"use client";

import { ChatProvider } from "./chat-context";

export default function ChatViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // FIXME Next Context 用法
  return <ChatProvider>{children}</ChatProvider>;
}
