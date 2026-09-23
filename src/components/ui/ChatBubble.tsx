import { cn } from "@/lib/cn";
import { ChatMessage } from "@/types";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isAi = message.sender === "ai";

  return (
    <div className={cn("flex", isAi ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isAi
            ? "rounded-tl-sm bg-surface-alt text-ink"
            : "rounded-tr-sm bg-ink text-background",
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
