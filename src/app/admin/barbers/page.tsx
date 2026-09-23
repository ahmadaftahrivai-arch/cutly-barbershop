import { BarbersAdminTable } from "@/components/ui/BarbersAdminTable";
import { getBarbers } from "@/lib/catalog";

export default async function AdminBarbersPage() {
  const barbers = await getBarbers();

  return (
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-dark">
        Catalog
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        Manage Barbers
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Edit profiles, or add a new barber — changes appear on the site right
        away.
      </p>

      <div className="mt-8">
        <BarbersAdminTable barbers={barbers} />
      </div>
    </div>
  );
}
