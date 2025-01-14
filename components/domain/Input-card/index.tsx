import { ChatContext } from "@/app/chat-view/chat-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, KeyboardEvent, useContext } from "react";
import { cn } from "@/lib/utils";
interface InputCardProps {
  onSubmit: (message: string) => Promise<void>;
}

export function InputCard({ onSubmit }: InputCardProps) {
  const { hasMessage, loading } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;

    try {
      await onSubmit(input);
      setInput("");
      textareaRef.current?.focus();
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

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
      <div className="flex items-end gap-2 p-4">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息，按 Enter 发送，Shift + Enter 换行..."
          className="max-h-[200px] min-h-[80px] resize-none"
          disabled={loading}
        />
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
