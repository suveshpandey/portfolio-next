"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUp, ArrowUpRight, Check, Copy, Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CONTACT } from "@/lib";
import { getLenis } from "@/lib/lenis";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function Contact() {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const copy = (text: string, field: "email" | "phone") => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(field);
        setTimeout(() => setCopied((c) => (c === field ? null : c)), 2000);
      })
      .catch(() => {});
  };

  const phone = `+91 ${CONTACT.phoneNo}`;
  const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`;

  const profiles = [
    { label: "GitHub", href: CONTACT.github, icon: <FaGithub size={15} /> },
    { label: "LinkedIn", href: CONTACT.linkedin, icon: <FaLinkedinIn size={15} /> },
    { label: "X", href: CONTACT.twitter, icon: <BsTwitterX size={14} /> },
  ];

  return (
    <section id="contact" className="section-wrapper relative w-full">
      {/* Soft pastel glow behind the heading (no z-index, so it stays above the page wash) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-[360px] max-w-[620px]">
        <div className="absolute left-2 top-8 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />
        <div className="absolute right-2 top-16 h-64 w-64 rounded-full bg-indigo-300/40 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <motion.p {...fadeUp(0)} className="eyebrow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for work
        </motion.p>

        <motion.h2
          {...fadeUp(0.06)}
          className="mt-6 text-[clamp(2.4rem,8vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground"
        >
          Let&apos;s build{" "}
          <span className="text-accent">
            something.
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.12)}
          className="mt-5 max-w-[440px] text-[15.5px] leading-[1.75] text-muted-foreground"
        >
          I&apos;m open to full-time and remote roles, and to interesting AI and full-stack
          projects. Email is the fastest way to reach me.
        </motion.p>

        {/* Primary action: email + copy */}
        <motion.div
          {...fadeUp(0.18)}
          className="mt-9 flex w-full max-w-[430px] items-stretch gap-2"
        >
          <a
            href={mailto}
            {...external}
            className="btn btn-dark min-w-0 flex-1 !justify-between !gap-3 !px-5 !py-4 !text-[14px]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Mail size={16} className="shrink-0" />
              <span className="truncate">{CONTACT.email}</span>
            </span>
            <ArrowUpRight size={17} className="btn-arrow btn-arrow-ne shrink-0" />
          </a>
          <button
            type="button"
            onClick={() => copy(CONTACT.email, "email")}
            aria-label="Copy email address"
            className="btn btn-light shrink-0 !px-4 !text-[13px]"
          >
            {copied === "email" ? (
              <Check size={16} className="text-accent" />
            ) : (
              <Copy size={16} />
            )}
            <span className="hidden min-[400px]:inline">{copied === "email" ? "Copied" : "Copy"}</span>
          </button>
        </motion.div>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>

        {/* Profiles + resume */}
        <motion.div
          {...fadeUp(0.24)}
          className="mt-4 flex max-w-[520px] flex-wrap items-center justify-center gap-2"
        >
          {profiles.map((p) => (
            <a
              key={p.label}
              href={p.href}
              {...external}
              className="btn btn-light !gap-2 !px-4 !py-2.5"
            >
              {p.icon}
              {p.label}
            </a>
          ))}
          <a href={CONTACT.resume} {...external} className="btn btn-light !gap-2 !px-4 !py-2.5">
            <FileText size={15} />
            Resume
            <ArrowUpRight size={14} className="btn-arrow btn-arrow-ne" />
          </a>
          <a
            href="/suvesh_resume.pdf"
            download="Suvesh_Pandey_Resume.pdf"
            className="btn btn-light !gap-2 !px-4 !py-2.5"
          >
            <Download size={15} />
            PDF
          </a>
        </motion.div>

        {/* Quiet details */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} />
            India · open to remote
          </span>
          <button
            type="button"
            onClick={() => copy(phone, "phone")}
            className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Phone size={14} />
            <span className="tabular-nums">{phone}</span>
            <span className="text-[12px] text-accent">
              {copied === "phone" ? "Copied" : "Copy"}
            </span>
          </button>
        </motion.div>
      </div>

      <footer className="relative mt-20 w-full">
        {/* Hairline that fades out at both ends */}
        <div
          aria-hidden
          className="h-px w-full bg-gradient-to-r from-transparent via-[var(--line)] to-transparent"
        />
        {/* One row at every width: copyright on the left, back to top on the right */}
        <div className="mt-5 flex flex-nowrap items-center justify-between gap-3">
          <p className="min-w-0 truncate whitespace-nowrap text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} Suvesh Pandey
          </p>
          <button
            type="button"
            onClick={() => {
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn btn-light shrink-0 whitespace-nowrap !gap-2 !px-4 !py-2.5 !text-[13px]"
          >
            <ArrowUp size={15} className="btn-arrow btn-arrow-up" />
            <span className="hidden min-[360px]:inline">Back to top</span>
            <span className="min-[360px]:hidden">Top</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
