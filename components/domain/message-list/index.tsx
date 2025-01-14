import { ChatContext } from "@/app/chat-view/chat-context";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext } from "react";

export function MessageList() {
  const { hasMessage, messages, loading } = useContext(ChatContext);
  console.log("🚀 ~ MessageList ~ hasMessage:", hasMessage);

  return (
    hasMessage && (
      <div className="mx-auto mb-24 w-full space-y-4">
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
      </div>
    )
  );
}
