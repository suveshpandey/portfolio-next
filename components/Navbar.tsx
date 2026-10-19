"use client";

import { motion } from "motion/react";
import { CONTACT } from "@/lib";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#technologies" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-border bg-[color-mix(in_oklab,var(--background)_72%,transparent)] backdrop-blur-xl backdrop-saturate-150"
    >
      {/* Inner container mirrors <main> so brand/nav align with the content edges */}
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4 lg:px-[34px]">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-[#cbd2c3] bg-[#eef1e9] pr-[2px] text-2xl font-semibold leading-none tracking-tighter text-foreground"
          >
            s.
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-foreground">Suvesh Pandey</span>
            <span className="mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              AI / Full-stack Engineer
            </span>
          </span>
        </a>

        {/* Nav + contact */}
        <nav className="flex items-center gap-5 text-xs sm:gap-8">
          <div className="hidden items-center gap-6 sm:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-[7px] border border-[#cbd2c3] px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Let&apos;s talk <span aria-hidden>↗</span>
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
