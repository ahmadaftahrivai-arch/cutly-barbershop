import { prisma } from "@/lib/prisma";
import { IconName, Service, Barber } from "@/types";

const VALID_ICONS: IconName[] = [
  "scissors",
  "razor",
  "comb",
  "beard",
  "clipper",
  "sparkle",
];

export function isIconName(value: string): value is IconName {
  return (VALID_ICONS as string[]).includes(value);
}

export async function getServices(): Promise<Service[]> {
  const rows = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    price: r.price,
    duration: r.duration,
    icon: isIconName(r.icon) ? r.icon : "scissors",
    featured: r.featured,
  }));
}

export async function getBarbers(): Promise<Barber[]> {
  const rows = await prisma.barber.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    specialty: r.specialty,
    experience: r.experience,
    bio: r.bio,
    initials: r.initials,
  }));
}

export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}
