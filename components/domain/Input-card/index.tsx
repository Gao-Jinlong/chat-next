"use client";

import { ChatContext } from "@/components/domain/chat-view/chat-context";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import {
  useState,
  useRef,
  KeyboardEvent,
  useContext,
  useCallback,
  useEffect,
  ClipboardEvent,
} from "react";
import { cn } from "@/lib/utils";

export function InputCard() {
  const { hasMessage, loading, sendMessage } = useContext(ChatContext)!;

  const [input, setInput] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const textareaRef = useRef<HTMLDivElement | null>(null);
  const textareaScrollRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || loading) return;

    try {
      sendMessage(input);
      setInput("");
      setIsEmpty(true);
      if (textareaRef.current) {
        textareaRef.current.innerHTML = "";
      }
      setTimeout(() => {
        textareaRef.current?.focus();
      });
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  }, [input, loading, sendMessage]);

  useEffect(() => {
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const content = textareaRef.current?.innerText || "";
    setInput(content);
    setIsEmpty(content.trim() === "");
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData?.getData("text");
    if (text && textareaRef.current) {
      // 获取选区对象
      const selection = window.getSelection();
      const range = document.createRange();

      // 将文本添加到当前内容
      textareaRef.current.innerText += text;

      // 将光标移动到末尾
      range.selectNodeContents(textareaRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);

      const scrollHeight = textareaScrollRef.current?.scrollHeight || 0;
      textareaScrollRef.current!.scrollTop = scrollHeight;
      handleInput();
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
        <div className="flex max-h-[400px] min-h-[128px] flex-1 flex-col justify-end overflow-hidden rounded-lg border">
          <div
            className="scrollbar-thin relative max-h-[400px] flex-1 overflow-y-auto"
            ref={textareaScrollRef}
          >
            {isEmpty && (
              <div className="pointer-events-none absolute left-2 top-2 text-muted-foreground">
                输入消息，按 Enter 发送，Shift + Enter 换行...
              </div>
            )}
            <div
              ref={textareaRef}
              contentEditable={true}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              className="scrollbar-thin h-full min-h-[80px] w-full resize-none whitespace-pre-wrap break-words p-2 outline-none"
            />
          </div>

          <div className="flex w-full justify-end p-2">
            <Button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              size="icon"
              className="rounded-full transition-all"
            >
              <SendHorizontal className={loading ? "animate-pulse" : ""} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
