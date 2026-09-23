import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Barbers } from "@/components/sections/Barbers";
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
        <Barbers />
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
