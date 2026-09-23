import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingBookButton } from "@/components/ui/FloatingBookButton";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Booking } from "@/components/sections/Booking";
import { Barbers } from "@/components/sections/Barbers";
import { Locations } from "@/components/sections/Locations";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { Gallery } from "@/components/sections/Gallery";
import { WhyCutly } from "@/components/sections/WhyCutly";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { getServices, getBarbers } from "@/lib/catalog";

// Services/Barbers are DB-backed and editable from /admin, so this page
// can't be statically prerendered at build time (no DB access then).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, barbers] = await Promise.all([getServices(), getBarbers()]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Booking services={services} barbers={barbers} />
        <Barbers />
        <Locations />
        <AIAssistant />
        <Gallery />
        <WhyCutly />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <FloatingBookButton />
    </>
  );
}
