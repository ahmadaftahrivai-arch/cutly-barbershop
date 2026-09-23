"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/cn";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-background",
        className,
      )}
    >
      Log Out
    </button>
  );
}
