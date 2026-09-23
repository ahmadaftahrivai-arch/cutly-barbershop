import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { slugify, isIconName } from "@/lib/catalog";

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

export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

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

  const base = slugify(name);
  let id = base;
  for (let i = 2; await prisma.service.findUnique({ where: { id } }); i++) {
    id = `${base}-${i}`;
  }

  const count = await prisma.service.count();

  try {
    const service = await prisma.service.create({
      data: {
        id,
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        duration: duration.trim(),
        icon,
        featured: featured === true,
        order: count,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
