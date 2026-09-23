import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BarberCard } from "@/components/ui/BarberCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getBarbers } from "@/lib/catalog";

export async function Barbers() {
  const barbers = await getBarbers();

  return (
    <section id="barbers" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Meet The Team"
          title="Barbers who know their craft."
          description={`${barbers.length} chair${barbers.length === 1 ? "" : "s"}, ${barbers.length} specialt${barbers.length === 1 ? "y" : "ies"} — each barber brings a distinct style so you can pick the one who matches yours.`}
          align="center"
          className="mx-auto"
        />

        <Stagger className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((barber) => (
            <StaggerItem key={barber.id}>
              <BarberCard barber={barber} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
