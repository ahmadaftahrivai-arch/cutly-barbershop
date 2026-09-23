import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;

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

  try {
    const barber = await prisma.barber.update({
      where: { id },
      data: {
        name: name.trim(),
        specialty: specialty.trim(),
        experience: experience.trim(),
        bio: bio.trim(),
        initials: initials.trim().toUpperCase().slice(0, 3),
      },
    });

    return NextResponse.json(barber);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Barber not found." }, { status: 404 });
    }
    console.error("Failed to update barber:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;

  try {
    await prisma.barber.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Barber not found." }, { status: 404 });
    }
    console.error("Failed to delete barber:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
