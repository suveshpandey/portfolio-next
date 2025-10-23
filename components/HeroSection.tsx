"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Robot from "./Robot";

const container = (delay: number) => ({
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.9, delay } },
});

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/suvesh_pandey_resume.pdf";
  link.download = "Suvesh_Pandey_Resume";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen h-auto flex flex-col md:flex-row items-center justify-between overflow-hidden pt-28 sm:pt-0">
      <div className="w-[90%] sm:w-[50%] h-auto flex flex-col items-center">
        <div className="w-full flex flex-col gap-y-6">
          <div className="w-full flex flex-col sm:flex-row gap-x-10 gap-y-4 items-center sm:justify-start justify-center">
            <Image src="/images/profilePic.jpg" alt="profile" width={128} height={128} className="w-30 h-30 sm:w-35 sm:h-35 rounded-full ring-2 ring-neutral-800 object-cover shadow-lg" />
            <div className="flex flex-col gap-y-2 justify-center sm:items-start items-center">
              <motion.h1 variants={container(0)} initial="hidden" animate="visible" className="w-full text-4xl sm:text-5xl font-medium tracking-tight text-slate-300">
                Suvesh Pandey
              </motion.h1>
              <motion.h1 variants={container(0.5)} initial="hidden" animate="visible" className="text-xl sm:text-2xl bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text tracking-tight text-transparent">
                Full Stack Developer
              </motion.h1>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 items-center sm:items-start">
            <motion.p variants={container(0.2)} initial="hidden" animate="visible" className="mt-3 text-gray-400 text-center sm:text-left">
              I am a third-year IT engineering student passionate about web development and problem-solving. With a solid grasp of the MERN stack, Nextjs and Typescript.
            </motion.p>

            <motion.p variants={container(0.2)} initial="hidden" animate="visible" className="mt-3 text-gray-400 text-center sm:text-left">
              I am seeking internship opportunities in web development, particularly in the MERN stack, to gain hands-on experience and contribute to real-world projects.
            </motion.p>

            <div className="w-full mt-6 flex items-center justify-center">
              <motion.button variants={container(0.4)} initial="hidden" animate="visible" onClick={downloadResume} className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl font-medium shadow-lg transition-transform transform hover:scale-105 ease-linear cursor-pointer duration-200" style={{ background: "linear-gradient(90deg,#0ea5e9,#7c3aed)", color: "white" }}>
                Download Resume
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
