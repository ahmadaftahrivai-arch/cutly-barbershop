import { Star } from "lucide-react";
import { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-background p-7">
      <div className="flex gap-1 text-accent">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
        <p className="text-xs text-ink-muted">{testimonial.role}</p>
      </figcaption>
    </figure>
  );
}
