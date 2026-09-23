import { Headset, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChatPanel } from "@/components/ui/ChatPanel";
import { Reveal } from "@/components/ui/Reveal";
import { aiCapabilities } from "@/data/chat";

export function AIAssistant() {
  return (
    <section id="ai-assistant" className="py-24 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-14">
        <Reveal className="order-2 lg:order-1">
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
            Can&apos;t help? Tap &quot;Talk to Admin&quot; in the chat to
            reach a real team member.
          </p>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={0.15}>
          <ChatPanel />
        </Reveal>
      </Container>
    </section>
  );
}
