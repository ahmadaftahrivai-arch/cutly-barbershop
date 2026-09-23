import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StripePattern } from "@/components/ui/StripePattern";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-center text-background sm:px-16 sm:py-20">
          <StripePattern
            id="cta-stripes"
            className="-right-10 -top-10 h-56 w-56 text-accent/20"
          />
          <StripePattern
            id="cta-stripes-2"
            className="-bottom-10 -left-10 h-56 w-56 text-accent/20"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Ready for your next cut?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-background/65 sm:text-lg">
              Grab your preferred barber and time slot before it&apos;s gone —
              booking takes less than a minute.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#booking" variant="accent">
                Book Your Appointment
              </Button>
              <Button href="#ai-assistant" variant="outlineLight">
                Chat with CUTLY AI
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
