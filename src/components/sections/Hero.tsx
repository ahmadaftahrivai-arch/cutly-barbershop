import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { StripePattern } from "@/components/ui/StripePattern";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[36rem] w-[36rem] rounded-full bg-accent-soft/60 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <Badge>Modern Barbershop · Est. 2016</Badge>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Sharp cuts, modern craft,
            <span className="italic text-accent-dark"> real </span>
            confidence.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            CUTLY blends old-school barbering discipline with a genuinely
            modern experience — expert barbers, effortless online booking,
            and an AI assistant on standby whenever you have a question.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#booking" variant="primary">
              Book an Appointment
            </Button>
            <Button href="#services" variant="secondary">
              Explore Services
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6 border-t border-line/70 pt-8">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-sm text-ink-muted">
              <span className="font-semibold text-ink">4.9 / 5</span> from
              500+ happy clients
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-ink">
            <StripePattern
              id="hero-stripes"
              className="right-0 top-0 h-40 w-40 text-accent/25"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon
                name="scissors"
                className="h-32 w-32 text-accent-soft/90 sm:h-40 sm:w-40"
                strokeWidth={0.9}
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="absolute -top-6 -right-4 rounded-2xl border border-line bg-background px-5 py-4 shadow-xl shadow-ink/5 sm:-right-8">
            <p className="font-display text-2xl font-semibold text-ink">10+</p>
            <p className="text-xs text-ink-muted">Years of craft</p>
          </div>

          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-line bg-background px-5 py-4 shadow-xl shadow-ink/5 sm:-left-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
              <Icon name="sparkle" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">2,400+ cuts</p>
              <p className="text-xs text-ink-muted">delivered this year</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
