import { getServices, getBarbers } from "@/lib/catalog";
import { branches } from "@/data/branches";

export interface CatalogLookup {
  serviceName: (id: string) => string;
  barberName: (id: string | null) => string;
  branchName: (id: string) => string;
}

export async function buildCatalogLookup(): Promise<CatalogLookup> {
  const [services, barbers] = await Promise.all([getServices(), getBarbers()]);

  const serviceMap = new Map(services.map((s) => [s.id, s.name]));
  const barberMap = new Map(barbers.map((b) => [b.id, b.name]));
  const branchMap = new Map(branches.map((b) => [b.id, b.name]));

  return {
    serviceName: (id) => serviceMap.get(id) ?? id,
    barberName: (id) => (id ? (barberMap.get(id) ?? id) : "No preference"),
    branchName: (id) => branchMap.get(id) ?? id,
  };
}
