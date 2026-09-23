import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { services } from "@/data/services";
import { barbers } from "@/data/barbers";
import { timeSlots } from "@/data/booking";

interface BookingPayload {
  name?: unknown;
  phone?: unknown;
  serviceId?: unknown;
  barberId?: unknown;
  date?: unknown;
  time?: unknown;
  notes?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, phone, serviceId, barberId, date, time, notes } = payload;

  if (!isNonEmptyString(name)) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(phone)) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }
  if (!isNonEmptyString(serviceId) || !services.some((s) => s.id === serviceId)) {
    return NextResponse.json({ error: "Please choose a valid service." }, { status: 400 });
  }
  if (
    barberId !== undefined &&
    barberId !== null &&
    barberId !== "" &&
    (!isNonEmptyString(barberId) || !barbers.some((b) => b.id === barberId))
  ) {
    return NextResponse.json({ error: "Please choose a valid barber." }, { status: 400 });
  }
  if (!isNonEmptyString(time) || !timeSlots.includes(time)) {
    return NextResponse.json({ error: "Please choose a valid time." }, { status: 400 });
  }
  if (!isNonEmptyString(date) || Number.isNaN(new Date(date).getTime())) {
    return NextResponse.json({ error: "Please choose a valid date." }, { status: 400 });
  }
  if (notes !== undefined && notes !== null && typeof notes !== "string") {
    return NextResponse.json({ error: "Invalid notes." }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        serviceId,
        barberId: isNonEmptyString(barberId) ? barberId : null,
        date: new Date(date),
        time,
        notes: isNonEmptyString(notes) ? notes.trim() : null,
      },
    });

    return NextResponse.json({ id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
