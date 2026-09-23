import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/catalog";

interface BarberPayload {
  name?: unknown;
  specialty?: unknown;
  experience?: unknown;
  bio?: unknown;
  initials?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  let body: BarberPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, specialty, experience, bio, initials } = body;

  if (!isNonEmptyString(name)) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(specialty)) {
    return NextResponse.json({ error: "Specialty is required." }, { status: 400 });
  }
  if (!isNonEmptyString(experience)) {
    return NextResponse.json({ error: "Experience is required." }, { status: 400 });
  }
  if (!isNonEmptyString(bio)) {
    return NextResponse.json({ error: "Bio is required." }, { status: 400 });
  }
  if (!isNonEmptyString(initials)) {
    return NextResponse.json({ error: "Initials are required." }, { status: 400 });
  }

  const base = slugify(name);
  let id = base;
  for (let i = 2; await prisma.barber.findUnique({ where: { id } }); i++) {
    id = `${base}-${i}`;
  }

  const count = await prisma.barber.count();

  try {
    const barber = await prisma.barber.create({
      data: {
        id,
        name: name.trim(),
        specialty: specialty.trim(),
        experience: experience.trim(),
        bio: bio.trim(),
        initials: initials.trim().toUpperCase().slice(0, 3),
        order: count,
      },
    });

    return NextResponse.json(barber, { status: 201 });
  } catch (error) {
    console.error("Failed to create barber:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
