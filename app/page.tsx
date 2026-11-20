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
    <div className="min-h-screen overflow-x-clip text-foreground antialiased">
      <Navbar />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8">
        <HeroSection />
        <AboutSection />
        <Experience />
        <Education />
        <Technologies />
        <Projects />
        <CodingProfiles />
        <Contact />
      </main>
    </div>
  );
}
