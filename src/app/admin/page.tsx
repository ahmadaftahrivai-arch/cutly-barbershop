import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { AdminFilters } from "@/components/ui/AdminFilters";
import { BookingStatusSelect } from "@/components/ui/BookingStatusSelect";
import { getBarberName, getBranchName, getServiceName } from "@/lib/lookups";

interface AdminPageProps {
  searchParams: Promise<{ branch?: string; status?: string; date?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const { branch, status, date } = await searchParams;

  const where: Prisma.BookingWhereInput = {};
  if (branch) where.branchId = branch;
  if (status) where.status = status;
  if (date) {
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59.999`);
    where.date = { gte: start, lte: end };
  }

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-surface py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-dark">
              Admin
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
              All Bookings
            </h1>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-8">
          <AdminFilters branch={branch} status={status} date={date} />
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-background">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Branch</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Barber</th>
                <th className="px-5 py-4">When</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-ink-muted"
                  >
                    No bookings match these filters.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4">
                      <p className="font-medium text-ink">{booking.name}</p>
                      <p className="text-xs text-ink-muted">{booking.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {getBranchName(booking.branchId)}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {getServiceName(booking.serviceId)}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {getBarberName(booking.barberId)}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {booking.date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {booking.time}
                    </td>
                    <td className="px-5 py-4">
                      <BookingStatusSelect
                        bookingId={booking.id}
                        status={booking.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
