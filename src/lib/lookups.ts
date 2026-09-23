import { services } from "@/data/services";
import { barbers } from "@/data/barbers";
import { branches } from "@/data/branches";

export function getServiceName(id: string) {
  return services.find((s) => s.id === id)?.name ?? id;
}

export function getBarberName(id: string | null) {
  if (!id) return "No preference";
  return barbers.find((b) => b.id === id)?.name ?? id;
}

export function getBranchName(id: string) {
  return branches.find((b) => b.id === id)?.name ?? id;
}
