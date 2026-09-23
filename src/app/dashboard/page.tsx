import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { getBarberName, getBranchName, getServiceName } from "@/lib/lookups";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-surface py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-dark">
              My Dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
              Welcome back, {session.user.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/#booking"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-dark"
            >
              Book a New Cut
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">
            Your Bookings
          </h2>

          {bookings.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-line bg-background p-8 text-center text-sm text-ink-muted">
              You haven&apos;t booked a cut yet.{" "}
              <Link href="/#booking" className="font-medium text-accent-dark">
                Book your first appointment
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="rounded-2xl border border-line bg-background p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-lg font-semibold text-ink">
                      {getServiceName(booking.serviceId)}
                    </p>
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-dark">
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-1.5 text-sm text-ink-muted sm:grid-cols-2">
                    <p>{getBranchName(booking.branchId)}</p>
                    <p>{getBarberName(booking.barberId)}</p>
                    <p>
                      {booking.date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      · {booking.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </main>
  );
}
