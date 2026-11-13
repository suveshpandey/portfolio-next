"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { CONTACT } from "@/lib";
import { getLenis } from "@/lib/lenis";
import TextReveal from "@/components/TextReveal";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

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

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Phone",
      value: (
        <span className="flex items-center justify-between gap-4">
          <span>{phone}</span>
          <button
            type="button"
            onClick={() => copy(phone, "phone")}
            className="link-underline text-[13px] text-muted-foreground"
          >
            {copied === "phone" ? "Copied" : "Copy"}
          </button>
        </span>
      ),
    },
    { label: "Based in", value: "India, open to remote" },
    {
      label: "Elsewhere",
      value: (
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={CONTACT.github} {...external} className="link-underline">
            GitHub ↗
          </a>
          <a href={CONTACT.linkedin} {...external} className="link-underline">
            LinkedIn ↗
          </a>
          <a href={CONTACT.twitter} {...external} className="link-underline">
            X ↗
          </a>
        </span>
      ),
    },
    {
      label: "Resume",
      value: (
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={CONTACT.resume} {...external} className="link-underline">
            View on Drive ↗
          </a>
          <a
            href="/suvesh_resume.pdf"
            download="Suvesh_Pandey_Resume.pdf"
            className="link-underline"
          >
            Download PDF ↓
          </a>
        </span>
      ),
    },
  ];

  return (
    <section id="contact" className="section-wrapper w-full">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left: the ask */}
        <div>
          <p className="eyebrow mb-6">
            <span className="status-dot" aria-hidden />
            Available for work
          </p>
          <TextReveal
            as="h2"
            stagger={0.05}
            className="text-[clamp(2.6rem,5.6vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.05em] text-foreground"
          >
            Let&apos;s build <span className="text-accent">something.</span>
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.1}
            stagger={0.02}
            className="mt-7 max-w-[440px] text-base leading-[1.75] text-muted-foreground"
          >
            I&apos;m open to full-time and remote roles, and to interesting AI and
            full-stack projects. Email is the fastest way to reach me.
          </TextReveal>
        </div>

        {/* Right: the details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="lg:pt-2"
        >
          <a
            href={mailto}
            {...external}
            className="group flex items-center justify-between gap-4 border-b border-foreground pb-5 text-[clamp(1.15rem,2.3vw,1.7rem)] font-medium tracking-[-0.02em] text-foreground transition-colors hover:text-accent hover:border-accent"
          >
            <span className="min-w-0 break-all">{CONTACT.email}</span>
            <span
              aria-hidden
              className="shrink-0 text-[1.4em] leading-none transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
          <button
            type="button"
            onClick={() => copy(CONTACT.email, "email")}
            className="link-underline mt-3 text-[13px] text-muted-foreground"
          >
            {copied === "email" ? "Copied to clipboard" : "Copy email address"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </span>

          <dl className="mt-10 border-t border-border text-[15px]">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[96px_1fr] items-baseline gap-4 border-b border-border py-4"
              >
                <dt className="text-[13px] text-muted-foreground">{row.label}</dt>
                <dd className="min-w-0 text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <footer className="mt-20 flex w-full flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Suvesh Pandey</p>
        <button
          type="button"
          onClick={() => {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(0, { duration: 1.4 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="link-underline inline-flex items-center gap-1.5"
        >
          Back to top <span aria-hidden>↑</span>
        </button>
      </footer>
    </section>
  );
}
