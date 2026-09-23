# CUTLY Barbershop

A modern, premium barbershop landing page — built as a portfolio project.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4

## Status

Stage one shipped: a polished, production-quality frontend landing page,
with static content in `src/data`. Stage two is starting: the booking form
now saves real submissions to Postgres via Prisma. Auth, customer/admin
dashboards, and real AI integration are still ahead.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Database (booking form)

The booking form posts to `/api/bookings`, which writes to Postgres via
Prisma. To run it locally:

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` /
   `DATABASE_URL_UNPOOLED` from your Neon database (Vercel dashboard →
   project → Settings → Environment Variables).
2. Create the `Booking` table: `npx prisma db push`.

In production on Vercel, once the Neon database is connected to the
project (Storage → Marketplace Database Providers → Neon), the same env
vars are injected automatically — no extra setup needed there.

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
