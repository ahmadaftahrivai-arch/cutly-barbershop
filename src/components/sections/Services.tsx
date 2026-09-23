import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Services & Pricing"
          title="Grooming, done properly."
          description="Transparent pricing, no surprises. Every service includes a consultation so you leave with exactly the cut you asked for."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
