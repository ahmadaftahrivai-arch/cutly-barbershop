import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: boolean;
}

export function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          {label}
        </p>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            accent ? "bg-accent-soft text-accent-dark" : "bg-surface-alt text-ink-muted",
          )}
        >
          <Icon size={16} />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}
