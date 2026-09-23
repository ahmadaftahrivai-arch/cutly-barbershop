import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Barbers />
        <Locations />
        <AIAssistant />
        <Gallery />
        <WhyCutly />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
