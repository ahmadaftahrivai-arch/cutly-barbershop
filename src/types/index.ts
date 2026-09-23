export type IconName =
  | "scissors"
  | "razor"
  | "comb"
  | "beard"
  | "clipper"
  | "sparkle";

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: IconName;
  featured?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  initials: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  icon: IconName;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "ai";
  text: string;
}
