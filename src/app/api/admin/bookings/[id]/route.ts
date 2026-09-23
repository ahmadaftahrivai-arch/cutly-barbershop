import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { bookingStatuses } from "@/data/booking";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;

  let body: { status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const status = body.status;
  if (
    typeof status !== "string" ||
    !bookingStatuses.includes(status as (typeof bookingStatuses)[number])
  ) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ id: booking.id, status: booking.status });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    console.error("Failed to update booking status:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
