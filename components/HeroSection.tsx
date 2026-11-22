"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CONTACT } from "@/lib";
import TextReveal from "@/components/TextReveal";

const fadeUp = (delay: number) => ({
  hidden: { y: 14, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay } },
});

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function HeroSection() {
  return (
    <section id="top" className="pt-28 pb-10 sm:pt-36 sm:pb-14">
      {/* Photo beside the name; on very narrow screens the photo sits above it */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start gap-4 min-[360px]:flex-row min-[360px]:items-center sm:gap-6"
      >
        <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-[24px] border-2 border-white bg-white shadow-[0_14px_34px_-14px_rgba(60,45,120,0.55)] sm:h-[108px] sm:w-[108px] sm:rounded-[32px] sm:border-[3px]">
          <Image
            src="/images/profilePic.jpg"
            alt="Suvesh Pandey"
            fill
            sizes="108px"
            className="object-cover"
            priority
          />
        </div>

        <div className="min-w-0">
          <TextReveal
            as="h1"
            stagger={0.05}
            className="text-[1.45rem] font-bold leading-[1.12] tracking-[-0.03em] text-foreground min-[400px]:text-[1.7rem] sm:text-[2.3rem]"
          >
            Hey, I&apos;m Suvesh Pandey
          </TextReveal>
          <p className="mt-1.5 text-[14.5px] text-muted-foreground sm:text-base">
            An AI &amp; full-stack engineer based in India
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp(0.3)}
        initial="hidden"
        animate="visible"
        className="mt-8 space-y-4 text-[15.5px] leading-[1.8] text-foreground/85 sm:text-base"
      >
        <p>
          I build <span className="hl hl-blue">AI products that hold up in production</span> —
          real-time voice agents, RAG and the full stack behind them. Right now I&apos;m an
          Associate Software Engineer at <span className="hl hl-green">Euron</span>.
        </p>
        <p>
          From a multi-tenant CRM with a live voice-calling engine to an AI healthcare platform
          and a RAG study assistant, I&apos;ve shipped across{" "}
          <span className="hl hl-orange">TypeScript, Next.js, Node.js, FastAPI and AWS</span>.
          Outside work I&apos;m building <span className="hl hl-pink">Intervio.ai</span>, an AI
          voice interviewer.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp(0.4)}
        initial="hidden"
        animate="visible"
        className="mt-8 flex flex-nowrap gap-2 min-[360px]:gap-3"
      >
        {/* Same row at every width: the pair fills the row on phones, with tighter padding and short
            labels on very narrow screens, and sits at its natural size from 480px up */}
        <a
          href="#projects"
          className="btn btn-dark min-w-0 flex-1 whitespace-nowrap !gap-1.5 !px-3 !py-3 !text-[12.5px] min-[360px]:!gap-2 min-[360px]:!px-4 min-[400px]:!text-[13px] min-[480px]:flex-none min-[480px]:!gap-3 min-[480px]:!px-5"
        >
          <span className="min-[360px]:hidden">My work</span>
          <span className="hidden min-[360px]:inline">Explore my work</span>
          <span aria-hidden className="btn-arrow btn-arrow-se">↘</span>
        </a>
        <a
          href={CONTACT.resume}
          {...external}
          className="btn btn-light min-w-0 flex-1 whitespace-nowrap !gap-1.5 !px-3 !py-3 !text-[12.5px] min-[360px]:!gap-2 min-[360px]:!px-4 min-[400px]:!text-[13px] min-[480px]:flex-none min-[480px]:!gap-3 min-[480px]:!px-5"
        >
          <span className="min-[360px]:hidden">Resume</span>
          <span className="hidden min-[360px]:inline">Download resume</span>
          <span aria-hidden className="btn-arrow btn-arrow-down">↓</span>
        </a>
      </motion.div>
    </section>
  );
}
