import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BarberCard } from "@/components/ui/BarberCard";
import { barbers } from "@/data/barbers";

export function Barbers() {
  return (
    <section id="barbers" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Meet The Team"
          title="Barbers who know their craft."
          description="Four chairs, four specialties — each barber brings a distinct style so you can pick the one who matches yours."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((barber) => (
            <BarberCard key={barber.id} barber={barber} />
          ))}
        </div>
      </Container>
    </section>
  );
}
