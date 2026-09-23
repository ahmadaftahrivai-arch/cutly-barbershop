import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say."
          align="center"
          className="mx-auto"
        />

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
