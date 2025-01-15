"use client";

import { ChatContext } from "./chat-context";
import { cn } from "@/lib/utils";
import { useContext } from "react";

export function Title() {
  const { hasMessage, theme } = useContext(ChatContext)!;

  return (
    theme && (
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center transition-all duration-300",
          hasMessage ? "" : "flex-1",
        )}
      >
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">{theme}</h1>
        </div>
      </div>
    )
  );
}
