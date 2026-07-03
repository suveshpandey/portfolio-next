"use client";
import { CONTACT } from "@/lib";
import { motion } from "framer-motion";
import { Mail, Copy, Check, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const openEmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`, "_blank");
  };

  const phone = `+91 ${CONTACT.phoneNo}`;

  return (
    <section id="contact" className="section-wrapper w-full">
      <div className="section-heading">
        <h2 className="section-title">Get in touch</h2>
        <p className="section-subtitle">
          I&apos;m open to new roles and interesting AI / full-stack projects. The fastest
          way to reach me is email.
        </p>
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="section-card w-full p-6 sm:p-8"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-muted/60 px-3.5 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-medium text-foreground">
            Available for full-time &amp; remote roles
          </span>
        </div>

        <button
          type="button"
          onClick={openEmail}
          className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:text-base"
        >
          <Mail size={18} className="transition-transform group-hover:-translate-y-0.5" />
          {CONTACT.email}
        </button>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => copyToClipboard(phone, "phone")}
            className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 text-left transition-colors hover:border-foreground/25"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-muted-foreground" />
              <span className="truncate text-sm text-foreground">{phone}</span>
            </span>
            {copiedField === "phone" ? (
              <Check size={15} className="shrink-0 text-green-500" />
            ) : (
              <Copy size={15} className="shrink-0 text-muted-foreground" />
            )}
          </button>

          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background/40 px-4 py-3">
            <MapPin size={16} className="shrink-0 text-muted-foreground" />
            <span className="truncate text-sm text-foreground">India · Open to remote</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 w-full">
        <p className="text-center text-sm text-muted-foreground">
          © 2026 · Suvesh Pandey
        </p>
      </div>
    </section>
  );
}
