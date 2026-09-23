import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { valueProps } from "@/data/values";

export function WhyCutly() {
  return (
    <section id="about" className="bg-ink py-24 text-background lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why CUTLY"
          title="Not just a haircut."
          description="A shop built around the details that make a visit worth repeating."
          align="center"
          className="mx-auto [&_h2]:text-background [&_p]:text-background/65 [&_.text-accent-dark]:text-accent"
        />

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((value) => (
            <div key={value.id} className="text-center sm:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 text-accent sm:mx-0">
                <Icon name={value.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-background/65">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
