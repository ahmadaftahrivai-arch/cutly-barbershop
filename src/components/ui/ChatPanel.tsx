"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Headset, Send } from "lucide-react";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { chatTranscript, aiCapabilities } from "@/data/chat";
import { branches } from "@/data/branches";
import { ChatMessage } from "@/types";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

const mainBranch = branches.find((b) => b.isMain) ?? branches[0];
const whatsappHref = `https://wa.me/${mainBranch.phone.replace(/\D/g, "")}`;

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatTranscript);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const userMessage: ChatMessage = { id: nextId(), sender: "customer", text };
    const assistantId = nextId();
    const history = [...messages, userMessage];

    setMessages([...history, { id: assistantId, sender: "ai", text: "" }]);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.sender === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const chunk = accumulated;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: chunk } : m)),
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                text: "Sorry, I'm having trouble responding right now. Please try again or tap \"Talk to Admin\" below.",
              }
            : m,
        ),
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-line bg-background shadow-2xl shadow-ink/10">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-accent-soft">
          <Bot size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">CUTLY AI</p>
          <p className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online now
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex max-h-96 flex-col gap-3 overflow-y-auto px-5 py-6"
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {aiCapabilities.length > 0 && messages.length <= chatTranscript.length && (
          <p className="pt-1 text-center text-xs text-ink-muted">
            Ask me about {aiCapabilities.slice(0, 3).join(", ").toLowerCase()}, and
            more.
          </p>
        )}
      </div>

      <div className="border-t border-line px-5 py-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex items-center justify-between rounded-xl border border-dashed border-accent/40 bg-accent-soft/60 px-3 py-2.5 transition-colors hover:border-accent/70"
        >
          <span className="text-xs font-medium text-accent-dark">
            Not what you need?
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <Headset size={14} />
            Talk to Admin
          </span>
        </a>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            disabled={sending}
            className="flex-1 rounded-full border border-line bg-background px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-background transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
