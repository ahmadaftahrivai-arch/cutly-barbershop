import { Barber } from "@/types";

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <article className="group text-center">
      <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-surface-alt ring-1 ring-line transition-transform duration-300 group-hover:-translate-y-1">
        <span className="font-display text-4xl font-semibold text-ink/80">
          {barber.initials}
        </span>
        <span
          className="absolute inset-0 rounded-full ring-2 ring-accent/0 transition-all duration-300 group-hover:ring-accent/50"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-6 font-display text-lg font-semibold text-ink">
        {barber.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent-dark">
        {barber.specialty}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
        {barber.experience}
      </p>
      <p className="mx-auto mt-3 max-w-[22ch] text-sm leading-relaxed text-ink-muted">
        {barber.bio}
      </p>
    </article>
  );
}
