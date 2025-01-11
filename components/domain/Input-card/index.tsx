import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, KeyboardEvent } from "react";

interface InputCardProps {
  onSubmit: (message: string) => Promise<void>;
  loading?: boolean;
}

export function InputCard({ onSubmit, loading = false }: InputCardProps) {
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
    <div className="fixed bottom-4 left-4 right-4 mx-auto max-w-2xl">
      <div className="flex items-end gap-2 rounded-lg border bg-background/80 p-4 shadow-lg backdrop-blur">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息，按 Enter 发送，Shift + Enter 换行..."
          className="max-h-[200px] min-h-[60px] resize-none"
          disabled={loading}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          size="icon"
          className="h-[60px] w-[60px]"
        >
          <SendHorizontal className={loading ? "animate-pulse" : ""} />
        </Button>
      </div>
    </div>
  );
}
