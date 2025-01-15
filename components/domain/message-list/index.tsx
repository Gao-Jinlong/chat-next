"use client";

import { ChatContext } from "@/components/domain/chat-view/chat-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

export function MessageList() {
  const { messages, loading, error, hasMessage } = useContext(ChatContext)!;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    setScrollTop(scrollRef.current?.scrollTop || 0);
  };

  const showScrollBottom = useMemo(() => {
    const height = scrollRef.current?.clientHeight || 0;
    const scrollHeight = scrollRef.current?.scrollHeight || 0;

    console.log(
      "🚀 ~ showScrollBottom ~ height:",
      height,
      scrollHeight,
      scrollTop > scrollHeight - height * 0.8,
    );

    return scrollTop < scrollHeight - height * 1.2;
  }, [scrollTop]);

  const handleScrollBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={cn(
        "scrollbar-none relative mx-auto w-full flex-1 space-y-4 overflow-y-auto transition-all",
        hasMessage ? "h-full flex-1" : "flex-none",
      )}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </div>
      )}

      {error && (
        <div className="flex justify-center">
          <div className="rounded-lg bg-red-100 px-4 py-2 text-red-600">
            {error}
          </div>
        </div>
      )}

      {showScrollBottom && (
        <div className="sticky bottom-4 left-0 right-0 flex justify-center">
          <Button
            onClick={handleScrollBottom}
            variant="ghost"
            className="h-5 w-5 rounded-full bg-background p-3"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
