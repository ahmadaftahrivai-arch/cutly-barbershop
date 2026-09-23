import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-dark",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
