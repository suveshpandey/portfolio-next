"use client";
import Image from "next/image";
import { motion } from "motion/react";

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, delay },
  },
});

export default function Hero() {
  const handleDownLoadResume = () => {
    const link = document.createElement("a");
    link.href = "/suvesh_pandey_resume.pdf";
    link.download = "Suvesh_Pandey_Resume";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border-b border-neutral-800 pb-20 lg:mb-35 sm:mt-20 mt-40">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full sm:w-[48%]">
          <div className="flex flex-col sm:items-start items-center justify-center ">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-12 sm:text-6xl text-5xl font-normal tracking-tight lg:text-7xl"
            >
              Suvesh Pandey
            </motion.h1>
            <motion.span className="line-1 anim-typewriter bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Full Stack Developer
            </motion.span>
            <motion.p
              variants={container(0.7)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl sm:text-left text-neutral-400 text-center pt-6 pb-2 font-light tracking-tight"
            >
              I am a third-year IT engineering student passionate about web development and problem-solving. With a solid grasp of the MERN stack, Nextjs and Typescript.
            </motion.p>
            <motion.p
              variants={container(0.7)}
              initial="hidden"
              animate="visible"
              className="max-w-xl sm:text-left text-neutral-400 text-center py-2 font-light tracking-tight"
            >
              Alongside web development, I actively practice DSA in C++, having solved over 600 problems. I am highly motivated, consistently striving for self-improvement and growth.
            </motion.p>
            <motion.p
              variants={container(0.7)}
              initial="hidden"
              animate="visible"
              className="max-w-xl text- sm:text-left text-neutral-400 text-center pt-2 pb-10 font-light tracking-tight"
            >
              I am seeking internship opportunities in web development, particularly in the MERN stack, to gain hands-on experience and contribute to real-world projects.
            </motion.p>
          </div>
          <div className="w-full flex items-center justify-center sm:justify-start mb-10">
            <motion.button
              variants={container(1)}
              initial="hidden"
              animate="visible"
              onClick={handleDownLoadResume}
              className="shiny-cta bg-neutral-600 py-3 px-6 rounded-2xl"
            >
              Download Resume
            </motion.button>
          </div>
        </div>
        <div className="w-full sm:w-[48%] ">
          <div className="flex sm:justify-end justify-center">
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
              <Image src="/images/profilePic.jpg" alt="Suvesh Pandey" width={400} height={400} className="rounded-lg lg:size-[400px] size-[300px] object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
