import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { Container } from "@/components/ui/Container";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { ServicesAdminTable } from "@/components/ui/ServicesAdminTable";
import { getServices } from "@/lib/catalog";

export default async function AdminServicesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const services = await getServices();

  return (
    <main className="min-h-screen bg-surface py-16">
      <Container className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-8">
          <div>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
            >
              <ArrowLeft size={14} />
              Back to bookings
            </Link>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
              Manage Services
            </h1>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-8">
          <ServicesAdminTable services={services} />
        </div>
      </Container>
    </main>
  );
}
