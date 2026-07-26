"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { CONTACT } from "@/lib";

const fadeUp = (delay: number) => ({
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay } },
});

export default function HeroSection() {
  const openEmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`, "_blank");
  };

  return (
    <section className="flex w-full items-start justify-between gap-5 pt-20 pb-10 sm:items-center sm:gap-6 sm:pt-28">
      <div className="min-w-0">
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Hi, I&apos;m Suvesh
        </motion.h1>

        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="mt-3 text-base leading-relaxed text-muted-foreground"
        >
          Building{" "}
          <span className="font-medium text-foreground">AI-powered products</span> with
          solid full-stack engineering.
        </motion.p>

        <motion.button
          type="button"
          onClick={openEmail}
          variants={fadeUp(0.16)}
          initial="hidden"
          animate="visible"
          className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:text-base"
        >
          <Mail size={18} className="shrink-0" />
          {CONTACT.email}
        </motion.button>
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
