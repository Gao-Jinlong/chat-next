"use client";

import { ChatContext } from "@/components/domain/chat-view/chat-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import {
  useState,
  useRef,
  KeyboardEvent,
  useContext,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";

export function InputCard() {
  const { hasMessage, loading, sendMessage } = useContext(ChatContext)!;

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || loading) return;

    try {
      await sendMessage(input);
      setInput("");
      textareaRef.current?.focus();
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  }, [input, loading, sendMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn("mx-auto w-full", !hasMessage && "pb-64")}>
      {!hasMessage && (
        <h2 className="p-4 text-center text-2xl font-bold">
          有什么可以帮忙的？
        </h2>
      )}
      <div className="flex items-end gap-2 p-2">
        {/* TODO 高度自适应 */}
        <div className="flex max-h-[200px] min-h-[128px] flex-1 overflow-hidden rounded-lg border">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息，按 Enter 发送，Shift + Enter 换行..."
            className="scrollbar-thin flex-1 resize-none rounded-none border-none"
            disabled={loading}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          size="icon"
          className="w-[60px] transition-all"
        >
          <SendHorizontal className={loading ? "animate-pulse" : ""} />
        </Button>
      </div>
    </div>
  );
}
