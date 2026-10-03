"use client";
import { CONTACT } from "@/lib";
import { motion } from "framer-motion";
import { Mail, Send, Copy, Check, MapPin, Phone, ArrowUp } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import { useState } from "react";

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <Check size={15} className="shrink-0 text-green-500" />
  ) : (
    <Copy size={15} className="shrink-0 text-muted-foreground" />
  );
}

export default function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      })
      .catch(() => {});
  };

  const openEmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`, "_blank");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const phone = `+91 ${CONTACT.phoneNo}`;

  return (
    <section id="contact" className="section-wrapper w-full">
      <div className="section-heading">
        <TextReveal as="h2" stagger={0.05} className="section-title">
          Get in touch
        </TextReveal>
        <TextReveal as="p" delay={0.08} stagger={0.015} className="section-subtitle">
          I&apos;m open to new roles and interesting AI / full-stack projects. The fastest
          way to reach me is email.
        </TextReveal>
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="section-card w-full p-5 sm:p-8"
      >
        <div className="flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-muted/60 px-3.5 py-2.5 sm:w-fit sm:justify-start sm:py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <TextReveal as="span" stagger={0.025} className="text-xs font-medium text-foreground">
            Available for full-time &amp; remote roles
          </TextReveal>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={openEmail}
            className="group flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-xl bg-foreground px-4 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:px-6 sm:text-base"
          >
            {/* Envelope slides up and out on hover while the send icon rises into its place */}
            <span className="relative h-[18px] w-[18px] shrink-0 overflow-hidden">
              <Mail
                size={18}
                className="absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full"
              />
              <Send
                size={18}
                className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
              />
            </span>
            <TextReveal as="span" delay={0.1} className="truncate">
              {CONTACT.email}
            </TextReveal>
          </button>
          <button
            type="button"
            onClick={() => copyToClipboard(CONTACT.email, "email")}
            aria-label="Copy email address"
            className="flex w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-background/40 transition-colors hover:border-foreground/25"
          >
            <CopyIcon copied={copiedField === "email"} />
          </button>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => copyToClipboard(phone, "phone")}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 text-left transition-colors hover:border-foreground/25"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-muted-foreground" />
              <TextReveal as="span" stagger={0.03} className="truncate text-sm text-foreground">
                {phone}
              </TextReveal>
            </span>
            <CopyIcon copied={copiedField === "phone"} />
          </button>

          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background/40 px-4 py-3">
            <MapPin size={16} className="shrink-0 text-muted-foreground" />
            <TextReveal as="span" stagger={0.03} className="truncate text-sm text-foreground">
              India · Open to remote
            </TextReveal>
          </div>
        </div>
      </motion.div>

      <footer className="mt-12 flex w-full flex-col items-center justify-between gap-3 border-t border-dashed border-border pt-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} · Suvesh Pandey</p>
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      </footer>
    </section>
  );
}
