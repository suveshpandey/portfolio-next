import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import AboutSection from "@/components/AboutSection";
import Projects from "@/components/Projects";
import CodingProfiles from "@/components/CodingProfiles";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="h-auto overflow-x-hidden overflow-auto text-neutral-300 antialiased">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative w-full sm:w-[80%] lg:w-[60%] mx-auto px-4 sm:px-0">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <Technologies />
        <Projects />
        <CodingProfiles />
        <Contact />
      </div>
    </div>
  );
}
