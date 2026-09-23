import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1",
        service.featured
          ? "border-ink bg-ink text-background hover:shadow-xl hover:shadow-accent/10"
          : "border-line bg-background hover:border-accent/40 hover:shadow-xl hover:shadow-ink/5",
      )}
    >
      {service.featured && (
        <span className="absolute -top-3 right-7 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
          Most Popular
        </span>
      )}

      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
          service.featured ? "bg-accent/20 text-accent" : "bg-accent-soft text-accent-dark",
        )}
      >
        <Icon name={service.icon} className="h-6 w-6" />
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold">
        {service.name}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          service.featured ? "text-background/70" : "text-ink-muted",
        )}
      >
        {service.description}
      </p>

      <div
        className={cn(
          "mt-6 flex items-center justify-between border-t pt-5",
          service.featured ? "border-background/15" : "border-line",
        )}
      >
        <span className="font-display text-2xl font-semibold">
          {service.price}
        </span>
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-wide",
            service.featured ? "text-background/60" : "text-ink-muted",
          )}
        >
          {service.duration}
        </span>
      </div>
    </article>
  );
}
