import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { isIconName } from "@/lib/catalog";

interface ServicePayload {
  name?: unknown;
  description?: unknown;
  price?: unknown;
  duration?: unknown;
  icon?: unknown;
  featured?: unknown;
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

  let body: ServicePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, description, price, duration, icon, featured } = body;

  if (!isNonEmptyString(name)) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(description)) {
    return NextResponse.json({ error: "Description is required." }, { status: 400 });
  }
  if (!isNonEmptyString(price)) {
    return NextResponse.json({ error: "Price is required." }, { status: 400 });
  }
  if (!isNonEmptyString(duration)) {
    return NextResponse.json({ error: "Duration is required." }, { status: 400 });
  }
  if (typeof icon !== "string" || !isIconName(icon)) {
    return NextResponse.json({ error: "Invalid icon." }, { status: 400 });
  }

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        duration: duration.trim(),
        icon,
        featured: featured === true,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }
    console.error("Failed to update service:", error);
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
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }
    console.error("Failed to delete service:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
