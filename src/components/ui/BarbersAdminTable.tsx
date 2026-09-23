"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Trash2 } from "lucide-react";
import { inputClasses } from "@/components/ui/FormField";
import { Barber } from "@/types";

interface BarberFields {
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  initials: string;
}

function BarberFieldset({
  values,
  onChange,
}: {
  values: BarberFields;
  onChange: (next: BarberFields) => void;
}) {
  return (
    <>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Name
        <input
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          className={inputClasses}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Initials
        <input
          value={values.initials}
          onChange={(e) => onChange({ ...values, initials: e.target.value })}
          maxLength={3}
          className={inputClasses}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Specialty
        <input
          value={values.specialty}
          onChange={(e) => onChange({ ...values, specialty: e.target.value })}
          placeholder="Fades & Skin Tapers"
          className={inputClasses}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Experience
        <input
          value={values.experience}
          onChange={(e) => onChange({ ...values, experience: e.target.value })}
          placeholder="8 years experience"
          className={inputClasses}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted sm:col-span-2">
        Bio
        <textarea
          value={values.bio}
          onChange={(e) => onChange({ ...values, bio: e.target.value })}
          rows={2}
          className={inputClasses}
          required
        />
      </label>
    </>
  );
}

function BarberForm({ initial, onSaved }: { initial: Barber; onSaved: () => void }) {
  const [values, setValues] = useState<BarberFields>(initial);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/barbers/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to save.");
      }
      router.refresh();
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${initial.name}"?`)) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/barbers/${initial.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      router.refresh();
    } catch {
      setError("Failed to delete.");
      setDeleting(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="grid gap-4 rounded-2xl border border-line bg-background p-5 shadow-sm shadow-ink/[0.02] transition-shadow hover:shadow-md hover:shadow-ink/5 sm:grid-cols-2"
    >
      <div className="flex items-center gap-3 sm:col-span-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-alt text-sm font-semibold text-ink/80">
          {values.initials || "??"}
        </div>
        <p className="font-display text-base font-semibold text-ink">
          {values.name || "Untitled barber"}
        </p>
      </div>

      <BarberFieldset values={values} onChange={setValues} />

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-700 sm:col-span-2">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
        >
          <Trash2 size={14} />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </form>
  );
}

const EMPTY_BARBER: BarberFields = {
  name: "",
  specialty: "",
  experience: "",
  bio: "",
  initials: "",
};

function NewBarberForm({ onCreated }: { onCreated: () => void }) {
  const [values, setValues] = useState<BarberFields>(EMPTY_BARBER);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/barbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to create.");
      }
      setValues(EMPTY_BARBER);
      router.refresh();
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent-soft/30 p-5 sm:grid-cols-2"
    >
      <p className="text-sm font-semibold text-ink sm:col-span-2">
        Add a new barber
      </p>
      <BarberFieldset values={values} onChange={setValues} />

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-700 sm:col-span-2">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-dark disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {saving ? "Adding…" : "Add Barber"}
      </button>
    </form>
  );
}

export function BarbersAdminTable({ barbers }: { barbers: Barber[] }) {
  return (
    <div className="space-y-4">
      {barbers.map((barber) => (
        <BarberForm key={barber.id} initial={barber} onSaved={() => {}} />
      ))}
      <NewBarberForm onCreated={() => {}} />
    </div>
  );
}
