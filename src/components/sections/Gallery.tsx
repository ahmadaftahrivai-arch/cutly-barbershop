import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { StripePattern } from "@/components/ui/StripePattern";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/cn";

const tileStyles = [
  "bg-ink text-background",
  "bg-surface-alt text-ink",
  "bg-surface-alt text-ink",
  "bg-accent text-ink",
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="A gallery of our best work."
          description="A look at the cuts, fades, and grooming styles our barbers deliver every single day."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[11rem]">
          {galleryItems.map((item, index) => {
            const tall = index === 0 || index === 5;
            return (
              <article
                key={item.id}
                className={cn(
                  "group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5",
                  tileStyles[index % tileStyles.length],
                  tall ? "sm:row-span-2" : "",
                  "aspect-square sm:aspect-auto",
                )}
              >
                <StripePattern
                  id={`gallery-${item.id}`}
                  className="-right-4 -top-4 h-24 w-24 opacity-[0.15]"
                />
                <Icon
                  name={item.icon}
                  className="absolute right-5 top-5 h-8 w-8 opacity-40 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.2}
                />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] opacity-70">
                  {item.category}
                </p>
                <p className="font-display text-lg font-semibold leading-tight">
                  {item.title}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
