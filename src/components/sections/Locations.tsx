import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BranchCard } from "@/components/ui/BranchCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { branches } from "@/data/branches";

export function Locations() {
  return (
    <section id="location" className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Locations"
          title="Three chairs closer to you."
          description="Walk in or book ahead at whichever CUTLY is nearest — every branch runs the same standard of cut."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <StaggerItem key={branch.id}>
              <BranchCard branch={branch} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
