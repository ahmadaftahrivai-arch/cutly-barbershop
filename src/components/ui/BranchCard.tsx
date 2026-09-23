import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Branch } from "@/data/branches";

export function BranchCard({ branch }: { branch: Branch }) {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    branch.lng - 0.01
  }%2C${branch.lat - 0.01}%2C${branch.lng + 0.01}%2C${
    branch.lat + 0.01
  }&layer=mapnik&marker=${branch.lat}%2C${branch.lng}`;

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    branch.address,
  )}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-ink/5">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
        <iframe
          src={mapSrc}
          title={`Map to ${branch.name}`}
          className="h-full w-full grayscale-[15%]"
          loading="lazy"
        />
        {branch.isMain && (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink shadow-sm">
            Main Branch
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-ink">
          {branch.name}
        </h3>

        <div className="mt-4 space-y-2.5 text-sm text-ink-muted">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="mt-0.5 shrink-0 text-accent-dark" />
            <span>{branch.address}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone size={16} className="shrink-0 text-accent-dark" />
            <span>{branch.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock size={16} className="shrink-0 text-accent-dark" />
            <span>{branch.hours}</span>
          </div>
        </div>

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark transition-colors hover:text-ink"
        >
          <Navigation size={14} />
          Get Directions
        </a>
      </div>
    </article>
  );
}
