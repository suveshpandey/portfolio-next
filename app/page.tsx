import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Technologies from "@/components/Technologies";
import AboutSection from "@/components/AboutSection";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import CodingProfiles from "@/components/CodingProfiles";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="h-auto overflow-x-hidden overflow-auto pb-24 text-muted-foreground antialiased lg:pb-0">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 z-[-2] bg-background" />
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_70%_40%_at_50%_-10%,oklch(0.4_0.004_255_/_.10),transparent_70%)]" />
      </div>

      <Navbar />
      <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-6">
        <HeroSection />
        <AboutSection />
        <Experience />
        <Education />
        <Technologies />
        <Projects />
        <CodingProfiles />
        <Contact />
      </div>
    </div>
  );
}
