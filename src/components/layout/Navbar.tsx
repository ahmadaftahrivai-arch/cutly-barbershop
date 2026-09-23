"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-shadow duration-300",
        scrolled
          ? "border-line/70 shadow-sm shadow-ink/5"
          : "border-transparent",
      )}
    >
      <Container>
        <nav
          className="flex h-20 items-center justify-between"
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="font-display text-2xl font-semibold tracking-tight text-ink"
          >
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="#booking" variant="primary">
              Book a Cut
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line/70 bg-background lg:hidden"
        >
          <Container>
            <ul className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pb-6">
              <Button href="#booking" variant="primary" className="w-full">
                Book a Cut
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
