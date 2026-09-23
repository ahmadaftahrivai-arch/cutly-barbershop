import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/data/site";
import { branches } from "@/data/branches";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-surface" id="contact">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl font-semibold text-ink">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            Modern barbershop experience with timeless craft — expert cuts,
            easy booking, and a team that genuinely cares about your style.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
            Navigation
          </h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-muted transition-colors hover:text-accent-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
            Opening Hours
          </h3>
          <ul className="mt-4 space-y-2.5">
            {siteConfig.hours.map((entry) => (
              <li
                key={entry.day}
                className="flex justify-between gap-4 text-sm text-ink-muted"
              >
                <span>{entry.day}</span>
                <span className="text-ink">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
            Visit Us
          </h3>
          <ul className="mt-4 space-y-2.5">
            {branches.map((branch) => (
              <li key={branch.id}>
                <Link
                  href="#location"
                  className="text-sm text-ink-muted transition-colors hover:text-accent-dark"
                >
                  {branch.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-muted">{siteConfig.email}</p>
          <ul className="mt-5 flex gap-4">
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-accent-dark"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line/70">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All
            rights reserved.
          </p>
          <p>Crafted as a developer portfolio project.</p>
        </Container>
      </div>
    </footer>
  );
}
