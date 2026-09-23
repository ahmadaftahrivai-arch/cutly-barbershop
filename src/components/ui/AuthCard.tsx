import Link from "next/link";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 py-16">
      <Link
        href="/"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        CUTLY
      </Link>

      <div className="mt-8 w-full max-w-md rounded-[1.75rem] border border-line bg-background p-8 shadow-xl shadow-ink/5 sm:p-10">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>

        <div className="mt-8">{children}</div>
      </div>

      <p className="mt-6 text-sm text-ink-muted">{footer}</p>
    </main>
  );
}
