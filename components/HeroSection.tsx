"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { CONTACT } from "@/lib";
import TextReveal from "@/components/TextReveal";

const fadeUp = (delay: number) => ({
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay } },
});

export default function HeroSection() {
  return (
    <section className="flex w-full items-start justify-between gap-5 pt-20 pb-10 sm:items-center sm:gap-6 sm:pt-28">
      <div className="min-w-0">
        <TextReveal
          as="h1"
          stagger={0.05}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Hi, I&apos;m Suvesh
        </TextReveal>

        <TextReveal
          as="p"
          delay={0.12}
          stagger={0.03}
          className="mt-3 text-base leading-relaxed text-muted-foreground"
        >
          Building{" "}
          <span className="font-medium text-foreground">AI-powered products</span> with
          solid full-stack engineering.
        </TextReveal>

        <motion.a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="visible"
          className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:text-base"
        >
          <Mail size={18} className="shrink-0" />
          {CONTACT.email}
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative shrink-0"
      >
        <div className="relative h-28 w-28 overflow-hidden rounded-full border border-border sm:h-32 sm:w-32">
          <Image
            src="/images/profilePic.jpg"
            alt="Suvesh Pandey"
            fill
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
