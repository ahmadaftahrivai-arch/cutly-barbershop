import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { Container } from "@/components/ui/Container";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { AdminNav } from "@/components/ui/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-background">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink"
            >
              CUTLY
            </Link>
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-dark">
              Admin
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <AdminNav />
            <span className="hidden h-6 w-px bg-line sm:block" />
            <span className="text-sm text-ink-muted">{session.user.name}</span>
            <SignOutButton />
          </div>
        </Container>
      </header>

      <Container className="py-12">{children}</Container>
    </div>
  );
}
