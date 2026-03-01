"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { HardDriveDownload, ArrowDown } from "lucide-react";
import HeroImageFrame from "./HeroImageFrame";

const ROLES = ["ASSOCIATE SOFTWARE ENGINEER", "CLOUD PRACTITIONER", "FULL STACK DEVELOPER"];

function TypewriterRoles() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const role = ROLES[index];
    const typeSpeed = isDeleting ? 35 : 70;
    const pauseAtEnd = 2400;
    const pauseBetween = 700;

    if (!isDeleting && text === role) {
      const t = setTimeout(() => setIsDeleting(true), pauseAtEnd);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = setTimeout(() => {
        advanceTimeoutRef.current = null;
        setIndex((i) => (i + 1) % ROLES.length);
      }, pauseBetween);
      return () => {};
    }

    const delay = isDeleting ? typeSpeed : text.length === 0 ? 400 : typeSpeed;
    const t = setTimeout(
      () => {
        setText((prev) =>
          isDeleting ? role.slice(0, prev.length - 1) : role.slice(0, prev.length + 1)
        );
      },
      delay
    );
    return () => clearTimeout(t);
  }, [index, text, isDeleting]);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  return (
    <span className="inline-flex items-baseline min-h-[1.5em]">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-4 sm:h-5 bg-accent ml-0.5 align-middle"
        aria-hidden
      />
    </span>
  );
}

const container = (delay: number) => ({
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay } },
});

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/suvesh_resume.pdf";
  link.download = "Suvesh_resume";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const scrollToAbout = () => {
  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  return (
    <section className="w-full min-h-[100vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 overflow-hidden pt-32 sm:pt-36 pb-20 lg:pb-28 px-0">
      {/* Left: intro + name + CTA */}
      <div className="w-full lg:max-w-[52%] lg:min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
        <motion.h1
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-2"
        >
          Suvesh Pandey
        </motion.h1>
        <motion.div
          variants={container(0.05)}
          initial="hidden"
          animate="visible"
          className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-6 min-h-[1.5em] flex justify-center lg:justify-start w-full"
        >
          <TypewriterRoles />
        </motion.div>
        <motion.p
          variants={container(0.16)}
          initial="hidden"
          animate="visible"
          className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mb-8"
        >
          I build <span className="text-foreground font-medium">scalable web applications</span> and{" "}
          <span className="text-accent font-medium">cloud solutions</span> with the MERN stack, Next.js, TypeScript, and AWS. Currently at Euron as Associate Software Engineer.
        </motion.p>
        <motion.div
          variants={container(0.3)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={downloadResume}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
          >
            <HardDriveDownload className="w-4 h-4" />
            Download Resume
          </button>
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors"
          >
            Learn more
            <ArrowDown className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Right: visual */}
      <div className="w-full lg:w-auto flex-shrink-0 flex items-center justify-center order-1 lg:order-2 pb-6 pr-6 lg:pb-8 lg:pr-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <HeroImageFrame>
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none z-[1]" />
              <Image
                src="/images/profilePic.jpg"
                alt="Suvesh Pandey"
                width={320}
                height={320}
                className="relative z-10 w-full h-full object-cover"
                priority
              />
            </div>
          </HeroImageFrame>
          <div
            className="absolute -bottom-2 -right-2 w-20 h-20 sm:w-24 sm:h-24 rounded-xl z-0 border border-accent/50 bg-accent/10 shadow-sm shadow-accent/10"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
