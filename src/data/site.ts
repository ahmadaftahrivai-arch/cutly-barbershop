import { NavLink } from "@/types";

export const siteConfig = {
  name: "CUTLY",
  fullName: "CUTLY Barbershop",
  tagline: "Modern Barbershop, Timeless Craft",
  phone: "+62 812 3456 7890",
  email: "hello@cutly.id",
  address: "Jl. Sudirman No. 88, Jakarta Selatan",
  hours: [
    { day: "Monday – Friday", time: "09.00 – 21.00" },
    { day: "Saturday", time: "09.00 – 22.00" },
    { day: "Sunday", time: "10.00 – 18.00" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Barbers", href: "#barbers" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
