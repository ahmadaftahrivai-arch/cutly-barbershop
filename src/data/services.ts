import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "classic-haircut",
    name: "Classic Haircut",
    description:
      "A precise, timeless cut tailored to your face shape and finished with a clean hot-towel neck shave.",
    price: "Rp 35.000",
    duration: "45 min",
    icon: "scissors",
  },
  {
    id: "haircut-styling",
    name: "Haircut + Styling",
    description:
      "Full haircut paired with premium styling products for a look that holds all day, every day.",
    price: "Rp 55.000",
    duration: "60 min",
    icon: "comb",
    featured: true,
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    description:
      "Sharp beard shaping and lineup with hot towel treatment for a clean, defined finish.",
    price: "Rp 25.000",
    duration: "30 min",
    icon: "beard",
  },
  {
    id: "haircut-beard",
    name: "Haircut + Beard",
    description:
      "Our most popular combo — a complete haircut and beard grooming session in one seamless visit.",
    price: "Rp 70.000",
    duration: "75 min",
    icon: "razor",
  },
  {
    id: "premium-grooming",
    name: "Premium Grooming",
    description:
      "The full CUTLY experience: haircut, beard sculpting, facial treatment, and scalp massage.",
    price: "Rp 120.000",
    duration: "90 min",
    icon: "sparkle",
  },
];
