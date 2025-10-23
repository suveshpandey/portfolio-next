import Navbar from "@/components/Navbar";
import NewHeroSection from "@/components/NewHeroSection";
import Technologies from "@/components/Technologies";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import CodingProfiles from "@/components/CodingProfiles";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="h-auto overflow-x-hidden overflow-auto text-neutral-300 antialiased">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="w-full sm:w-[80%] lg:w-[60%] bg-slate-800 mx-auto">
        <Navbar />
        <NewHeroSection />
        <Technologies />
        <Education />
        <Projects />
        <CodingProfiles />
        <Contact />
      </div>
    </div>
  );
}
