"use client";

import { motion } from "motion/react";
import { CONTACT } from "@/lib";
import TextReveal from "@/components/TextReveal";

const fadeUp = (delay: number) => ({
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay } },
});

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function HeroSection() {
  return (
    <section id="top" className="pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
      <TextReveal
        as="h1"
        stagger={0.05}
        className="max-w-[1000px] text-[clamp(2.9rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.05em] text-foreground"
      >
        I build <span className="text-accent">AI-powered</span> products, end to end.
      </TextReveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,540px)_1fr] lg:items-end lg:gap-16">
        <TextReveal
          as="p"
          delay={0.12}
          stagger={0.02}
          className="text-base leading-[1.75] text-muted-foreground"
        >
          I&apos;m Suvesh, a software engineer shipping production AI systems — from
          real-time voice agents to the full stack behind them.
        </TextReveal>

        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 lg:justify-end"
        >
          <a href="#projects" className="btn btn-dark">
            Explore my work <span aria-hidden>↘</span>
          </a>
          <a href={CONTACT.resume} {...external} className="btn btn-light">
            Download resume <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
