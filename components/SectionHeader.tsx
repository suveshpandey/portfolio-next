"use client";
import { motion } from "motion/react";

/** Clean section header: the title with a hairline that fades out to the right. */
export default function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-7 flex items-center gap-4 sm:mb-8"
    >
      <h2 className="text-[1.3rem] font-semibold tracking-[-0.025em] text-foreground sm:text-[1.45rem]">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[var(--line)] to-transparent" />
    </motion.div>
  );
}
