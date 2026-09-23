import { ServicesAdminTable } from "@/components/ui/ServicesAdminTable";
import { getServices } from "@/lib/catalog";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-dark">
        Catalog
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        Manage Services
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Edit pricing and descriptions, or add a new service — changes appear
        on the site right away.
      </p>

      <div className="mt-8">
        <ServicesAdminTable services={services} />
      </div>
    </div>
  );
}
