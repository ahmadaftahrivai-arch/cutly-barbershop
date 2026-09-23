import { Bot, Headset, Send, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { chatTranscript, aiCapabilities } from "@/data/chat";

export function AIAssistant() {
  return (
    <section id="ai-assistant" className="py-24 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1">
          <Badge>Powered by CUTLY AI</Badge>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
            Ask anything, get an answer instantly.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
            CUTLY AI is available around the clock to help with the questions
            that usually mean a phone call — pricing, availability, and
            everything in between.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {aiCapabilities.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-line bg-surface px-4 py-3 text-center text-sm font-medium text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#ai-assistant" variant="primary">
              Chat with CUTLY AI
            </Button>
            <Button href="#contact" variant="secondary">
              <Headset size={18} />
              Talk to Admin
            </Button>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-ink-muted">
            <ShieldCheck size={15} className="text-accent-dark" />
            Can&apos;t help? CUTLY AI hands you straight to a real team
            member — no repeating yourself.
          </p>
        </div>

        <div className="order-1 lg:order-2">
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

            <div className="flex flex-col gap-3 px-5 py-6">
              {chatTranscript.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="mb-3 flex items-center justify-between rounded-xl border border-dashed border-accent/40 bg-accent-soft/60 px-3 py-2.5">
                <span className="text-xs font-medium text-accent-dark">
                  Not what you need?
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                  <Headset size={14} />
                  Talk to Admin
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5">
                <span className="flex-1 text-sm text-ink-muted">
                  Type your question…
                </span>
                <Send size={16} className="text-accent-dark" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
