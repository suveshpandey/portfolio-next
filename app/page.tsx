import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import AboutSection from "@/components/AboutSection";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CodingProfiles from "@/components/CodingProfiles";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="h-auto overflow-x-hidden overflow-auto text-muted-foreground antialiased">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 z-[-2] bg-background bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.72_0.11_195_/_.07),transparent)]" />
      </div>

      <div className="relative w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <Experience />
        <Technologies />
        <Projects />
        <CodingProfiles />
        <Contact />
      </div>
    </div>
  );
}
