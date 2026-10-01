"use client";

import { useState } from "react";
import { Send, Paperclip, Check, Phone, MapPin, Mail } from "lucide-react";
import { CONTACT } from "@/lib";
import { useOS } from "@/components/os/store";

export default function MailApp() {
  const { notify } = useOS();
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const phone = `+91 ${CONTACT.phoneNo}`;

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1800);
    });
  };

  const send = () => {
    const fullBody = body + (from.trim() ? `\n\n— ${from.trim()}` : "");
    const url =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}` +
      `&su=${encodeURIComponent(subject || "Hello Suvesh")}` +
      `&body=${encodeURIComponent(fullBody)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    notify({ title: "Message ready", body: "Your draft opened in Gmail — just hit send.", icon: "mail" });
  };

  const row = "flex items-center gap-2 border-b-[0.5px] border-[var(--separator)] px-5 min-h-[38px]";

  return (
    <div className="flex h-full flex-col">
      <div data-drag className="flex h-[52px] shrink-0 items-center gap-2 pl-[88px] pr-3">
        <button
          type="button"
          aria-label="Send"
          onClick={send}
          className="grid h-[30px] w-[36px] place-items-center rounded-full bg-[var(--accent)] text-white shadow-sm transition hover:brightness-110"
        >
          <Send size={15} className="-ml-px" />
        </button>
        <h2 className="ml-1 text-[15px] font-bold text-label">New Message</h2>
        <div className="flex-1" />
        <span className="tool-btn" aria-hidden>
          <Paperclip size={15} />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-[var(--content)]">
        <div className={row}>
          <span className="w-[62px] shrink-0 text-right text-[13px] text-label-3">To:</span>
          <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-[var(--accent-soft)] px-2.5 py-[2px] text-[13px] text-[var(--accent)]">
            Suvesh Pandey
            <span className="hidden text-[12px] opacity-75 sm:inline">&lt;{CONTACT.email}&gt;</span>
          </span>
        </div>
        <label className={row}>
          <span className="w-[62px] shrink-0 text-right text-[13px] text-label-3">From:</span>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Your name"
            className="selectable w-full bg-transparent text-[13px] text-label outline-none placeholder:text-label-3"
          />
        </label>
        <label className={row}>
          <span className="w-[62px] shrink-0 text-right text-[13px] text-label-3">Subject:</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Let's build something"
            className="selectable w-full bg-transparent text-[13px] text-label outline-none placeholder:text-label-3"
          />
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          aria-label="Message"
          placeholder={"Hi Suvesh,\n\nI'm reaching out about…"}
          className="selectable mac-scroll min-h-0 flex-1 resize-none bg-transparent px-5 py-4 text-[14px] leading-[1.6] text-label outline-none placeholder:text-label-3"
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 border-t-[0.5px] border-[var(--separator)] px-4 py-2.5">
        <span className="mr-1 inline-flex items-center gap-1.5 text-[12px] text-label-2">
          <span className="h-2 w-2 rounded-full bg-[#34c759]" /> Available for full-time &amp; remote roles
          <span className="inline-flex items-center gap-0.5 text-label-3">
            · <MapPin size={11} /> India
          </span>
        </span>
        <div className="flex-1" />
        <button type="button" className="btn !h-[26px] !px-3 !text-[12px]" onClick={() => copy(CONTACT.email, "email")}>
          {copied === "email" ? <Check size={13} className="text-[#34c759]" /> : <Mail size={13} />}
          {copied === "email" ? "Copied" : "Copy email"}
        </button>
        <button type="button" className="btn !h-[26px] !px-3 !text-[12px]" onClick={() => copy(phone, "phone")}>
          {copied === "phone" ? <Check size={13} className="text-[#34c759]" /> : <Phone size={13} />}
          {copied === "phone" ? "Copied" : phone}
        </button>
      </div>
    </div>
  );
}
