"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Robot from "./Robot";
import { HardDriveDownload } from "lucide-react";

const container = (delay: number) => ({
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.9, delay } },
});

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/suvesh_resume.pdf";
  link.download = "Suvesh_resume";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen h-auto flex flex-col md:flex-row items-center justify-between overflow-hidden pt-28 sm:pt-0 pb-20">
      <div className="w-full sm:w-[55%] md:w-[50%] lg:w-[48%] h-auto flex flex-col items-center">
        <div className="w-full flex flex-col gap-y-6">
          <div className="w-full flex flex-col sm:flex-row gap-x-10 gap-y-4 items-center sm:justify-start justify-center">
            <Image src="/images/profilePic.jpg" alt="profile" width={128} height={128} className="w-30 h-30 sm:w-35 sm:h-35 rounded-full ring-2 ring-neutral-800 object-cover shadow-lg" />
            <div className="flex flex-col gap-y-2 justify-center sm:items-start items-center">
              <motion.h1 variants={container(0)} initial="hidden" animate="visible" className="w-full text-4xl sm:text-5xl font-medium tracking-tight text-slate-300">
                Suvesh Pandey
              </motion.h1>
              <motion.h1 variants={container(0.5)} initial="hidden" animate="visible" className="text-xl sm:text-2xl bg-linear-to-r from-blue-500 to-green-500 bg-clip-text tracking-tight text-transparent">
                Full Stack Developer
              </motion.h1>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 items-center sm:items-start">
            <motion.p variants={container(0.2)} initial="hidden" animate="visible" className="mt-3 text-gray-400 text-center sm:text-left">
              I am a <span className="text-blue-400/80 font-medium">fullstack developer</span> passionate about building <span className="text-blue-300/70 font-medium">scalable web applications</span> and <span className="text-green-400/80 font-medium">cloud solutions</span>. With expertise in the <span className="text-green-300/70 font-medium">MERN stack</span>, <span className="text-blue-400/80 font-medium">Next.js</span>, <span className="text-blue-300/70 font-medium">TypeScript</span>, and <span className="text-green-400/80 font-medium">AWS cloud services</span>.
            </motion.p>

            <motion.p variants={container(0.2)} initial="hidden" animate="visible" className="mt-3 text-gray-400 text-center sm:text-left">
              Currently working as a <span className="text-blue-400/80 font-medium">Web Development Intern</span>, I focus on creating innovative <span className="text-blue-300/70 font-medium">fullstack solutions</span> and leveraging <span className="text-green-400/80 font-medium">AWS cloud infrastructure</span> to build efficient, <span className="text-blue-300/70 font-medium">scalable applications</span>.
            </motion.p>

            <div className="w-full mt-6 flex items-center justify-center">
              <motion.button variants={container(0.4)} initial="hidden" animate="visible" onClick={downloadResume} className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ease-linear cursor-pointer duration-300 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-400 hover:to-green-400 text-white border border-blue-400/30 hover:border-green-400/50">
                <HardDriveDownload className="animate-caret-blink repeat-infinite" /> Download Resume
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex items-center justify-center">
        <div className="w-80 h-80 lg:w-110 lg:h-110 flex items-center justify-center">
          <Robot />
        </div>
      </div>
    </section>
  );
}
