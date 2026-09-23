"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Trash2 } from "lucide-react";
import { inputClasses } from "@/components/ui/FormField";
import { Service } from "@/types";

const ICONS = ["scissors", "razor", "comb", "beard", "clipper", "sparkle"] as const;

function ServiceForm({
  initial,
  onSaved,
}: {
  initial: Service;
  onSaved: () => void;
}) {
  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [price, setPrice] = useState(initial.price);
  const [duration, setDuration] = useState(initial.duration);
  const [icon, setIcon] = useState(initial.icon);
  const [featured, setFeatured] = useState(initial.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/services/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, duration, icon, featured }),
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
      const response = await fetch(`/api/admin/services/${initial.id}`, {
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
      className="grid gap-4 rounded-2xl border border-line bg-background p-5 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Icon
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value as Service["icon"])}
          className={inputClasses}
        >
          {ICONS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted sm:col-span-2">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className={inputClasses}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Price
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Rp 35.000"
          className={inputClasses}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Duration
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="45 min"
          className={inputClasses}
          required
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-ink-muted sm:col-span-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-line"
        />
        Most popular (featured)
      </label>

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

function NewServiceForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [icon, setIcon] = useState<Service["icon"]>("scissors");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, duration, icon, featured }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to create.");
      }
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      setFeatured(false);
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
        Add a new service
      </p>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Icon
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value as Service["icon"])}
          className={inputClasses}
        >
          {ICONS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted sm:col-span-2">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className={inputClasses}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Price
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Rp 35.000"
          className={inputClasses}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-muted">
        Duration
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="45 min"
          className={inputClasses}
          required
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-ink-muted sm:col-span-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-line"
        />
        Most popular (featured)
      </label>

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
        {saving ? "Adding…" : "Add Service"}
      </button>
    </form>
  );
}

export function ServicesAdminTable({ services }: { services: Service[] }) {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <ServiceForm key={service.id} initial={service} onSaved={() => {}} />
      ))}
      <NewServiceForm onCreated={() => {}} />
    </div>
  );
}
