"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { bookingStatuses, BookingStatus } from "@/data/booking";
import { cn } from "@/lib/cn";

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-accent-soft text-accent-dark",
  confirmed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export function BookingStatusSelect({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [updating, setUpdating] = useState(false);

  async function handleChange(next: string) {
    const previous = current;
    setCurrent(next);
    setUpdating(true);

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!response.ok) throw new Error();
      router.refresh();
    } catch {
      setCurrent(previous);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <select
      value={current}
      disabled={updating}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(
        "rounded-full border-0 px-3 py-1 text-xs font-semibold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60",
        statusStyles[current as BookingStatus] ?? "bg-surface-alt text-ink-muted",
      )}
    >
      {bookingStatuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
