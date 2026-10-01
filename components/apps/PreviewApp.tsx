"use client";

import { useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { CONTACT } from "@/lib";
import { RESUME_DRIVE_ID } from "@/lib/content";
import { useWidth } from "@/components/os/useWidth";

export default function PreviewApp() {
  const [loaded, setLoaded] = useState(false);
  const [ref, width] = useWidth<HTMLDivElement>();
  const compact = width < 520;

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div data-drag className="flex h-[52px] shrink-0 items-center gap-2 pl-[88px] pr-3">
        <div className="min-w-0 leading-tight">
          <h2 className="truncate text-[13.5px] font-bold text-label">Resume.pdf</h2>
          {!compact && <p className="truncate text-[11px] text-label-3">Suvesh Pandey · Software Engineer</p>}
        </div>
        <div className="flex-1" />
        <div className="tool-capsule">
          <a
            href={`https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_ID}`}
            className="tool-btn gap-1.5 text-[12.5px]"
            aria-label="Download résumé"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={15} />
            {!compact && "Download"}
          </a>
          <a href={CONTACT.resume} className="tool-btn gap-1.5 text-[12.5px]" aria-label="Open in Google Drive" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} />
            {!compact && "Open"}
          </a>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-[#8e8e93]/25 p-2 pt-0">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center text-label-3">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}
        <iframe
          title="Suvesh Pandey — résumé"
          src={`https://drive.google.com/file/d/${RESUME_DRIVE_ID}/preview`}
          onLoad={() => setLoaded(true)}
          className="h-full w-full rounded-[12px] bg-white shadow-[0_8px_30px_-10px_rgb(0_0_0/0.4)]"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
