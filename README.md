# CUTLY Barbershop

A modern, premium barbershop landing page — built as a portfolio project.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4

## Status

This is stage one: a polished, production-quality **frontend landing page**
only. There is intentionally no backend, database, authentication, or
AI/API integration yet — all content is static and lives in `src/data`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project Structure

```
src/
  app/                 Root layout, global styles, home page
  components/
    layout/            Navbar, Footer
    ui/                Reusable primitives (Button, Badge, Icon, cards, ...)
    sections/           Landing page sections (Hero, Services, Barbers, ...)
  data/                Static content (services, barbers, testimonials, ...)
  types/               Shared TypeScript types
  lib/                 Small utilities
```

## Sections

Navbar · Hero · Services · Barbers · AI Customer Service (mockup) · Gallery ·
Why CUTLY · Testimonials · Booking CTA · Footer

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
