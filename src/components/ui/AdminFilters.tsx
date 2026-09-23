"use client";

import { FormEvent } from "react";
import { branches } from "@/data/branches";
import { bookingStatuses } from "@/data/booking";
import { inputClasses } from "@/components/ui/FormField";

interface AdminFiltersProps {
  branch?: string;
  status?: string;
  date?: string;
}

function autoSubmit(event: FormEvent<HTMLSelectElement | HTMLInputElement>) {
  event.currentTarget.form?.requestSubmit();
}

export function AdminFilters({ branch, status, date }: AdminFiltersProps) {
  return (
    <form
      method="get"
      className="flex flex-wrap items-end gap-4 rounded-2xl border border-line bg-background p-5"
    >
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Branch
        <select
          name="branch"
          defaultValue={branch ?? ""}
          onChange={autoSubmit}
          className={inputClasses}
        >
          <option value="">All branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Status
        <select
          name="status"
          defaultValue={status ?? ""}
          onChange={autoSubmit}
          className={inputClasses}
        >
          <option value="">All statuses</option>
          {bookingStatuses.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Date
        <input
          type="date"
          name="date"
          defaultValue={date ?? ""}
          onChange={autoSubmit}
          className={inputClasses}
        />
      </label>

      {(branch || status || date) && (
        <a
          href="/admin"
          className="text-sm font-medium text-accent-dark underline underline-offset-4"
        >
          Clear filters
        </a>
      )}
    </form>
  );
}
