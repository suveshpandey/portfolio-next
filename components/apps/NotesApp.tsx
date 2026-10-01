"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Folder, ChevronLeft, SquarePen, Share, GraduationCap, Search, Lock } from "lucide-react";
import { EXPERIENCE, EDUCATION } from "@/lib/content";
import { useWidth } from "@/components/os/useWidth";

type FolderId = "experience" | "education";
const NOTES_YELLOW = "#e0a100";

type NoteRow = { id: string; title: string; date: string; snippet: string };

const FOLDERS: { id: FolderId; name: string; rows: NoteRow[] }[] = [
  {
    id: "experience",
    name: "Experience",
    rows: EXPERIENCE.map((e) => ({ id: e.id, title: `${e.role} — ${e.company}`, date: e.duration, snippet: e.summary })),
  },
  {
    id: "education",
    name: "Education",
    rows: EDUCATION.map((e) => ({ id: e.id, title: e.degree, date: e.duration, snippet: e.school })),
  },
];

function NoteBody({ folder, id }: { folder: FolderId; id: string }) {
  if (folder === "experience") {
    const e = EXPERIENCE.find((x) => x.id === id) ?? EXPERIENCE[0];
    return (
      <article className="selectable">
        <p className="mb-5 text-center text-[11.5px] text-label-3">{e.duration}</p>
        <div className="flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[11px] ring-[0.5px] ring-black/15">
            <Image src={e.logo} alt={`${e.company} logo`} fill sizes="88px" className="object-cover" />
          </span>
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-label">{e.role}</h1>
            <p className="text-[13.5px] text-label-2">
              {e.company} · {e.duration}
            </p>
          </div>
        </div>
        <ul className="mt-6 flex flex-col gap-3">
          {e.points.map((pt, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-[1.65] text-label-2">
              <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: NOTES_YELLOW }} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }
  const e = EDUCATION.find((x) => x.id === id) ?? EDUCATION[0];
  return (
    <article className="selectable">
      <p className="mb-5 text-center text-[11.5px] text-label-3">{e.duration}</p>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[11px] bg-[#ffd84d] text-black/70 ring-[0.5px] ring-black/10">
          <GraduationCap size={22} />
        </span>
        <div className="min-w-0">
          <h1 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-label">{e.degree}</h1>
          <p className="text-[13.5px] text-label-2">{e.school}</p>
        </div>
      </div>
      <div className="group-box mt-6">
        {[
          ["Institution", e.school],
          ["Duration", e.duration],
          ["Result", e.detail],
        ].map(([k, v]) => (
          <div key={k} className="group-row flex items-start justify-between gap-6 px-4 py-2.5 text-[13px]">
            <span className="text-label">{k}</span>
            <span className="text-right text-label-2">{v}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function NotesApp({ args }: { args?: { nonce: number; folder?: FolderId; note?: string } }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const single = width < 560;
  const withSidebar = width >= 820;
  const [folder, setFolder] = useState<FolderId>("experience");
  const [note, setNote] = useState<string>(EXPERIENCE[0].id);
  const [mobileShowNote, setMobileShowNote] = useState(false);

  const [seenNonce, setSeenNonce] = useState<number | undefined>(undefined);
  if (args?.nonce !== seenNonce) {
    setSeenNonce(args?.nonce);
    if (args) {
      const f = args.folder ?? "experience";
      setFolder(f);
      setNote(args.note ?? FOLDERS.find((x) => x.id === f)!.rows[0].id);
      setMobileShowNote(!!args.note);
    }
  }

  const rows = FOLDERS.find((f) => f.id === folder)!.rows;

  const pickFolder = (f: FolderId) => {
    setFolder(f);
    setNote(FOLDERS.find((x) => x.id === f)!.rows[0].id);
  };

  const isMobile = single;
  const list = (
    <div className={`flex h-full flex-col ${single ? "w-full" : "w-[260px] shrink-0"}`}>
      <div data-drag className={`flex h-[52px] shrink-0 items-center gap-2 pr-3 ${withSidebar ? "pl-4" : "pl-[88px]"}`}>
        {!withSidebar ? (
          <div className="tool-capsule p-0.5">
            {FOLDERS.map((f) => (
              <button key={f.id} type="button" className="tool-btn !h-[26px] text-[12px]" data-on={folder === f.id} onClick={() => pickFolder(f.id)}>
                {f.name}
              </button>
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-[15px] font-bold text-label">{FOLDERS.find((f) => f.id === folder)!.name}</h2>
            <span className="text-[12px] text-label-3">{rows.length} notes</span>
          </>
        )}
      </div>
      <div className="mac-scroll flex-1 px-2.5 pb-3">
        {rows.map((r, i) => {
          const sel = r.id === note && (!isMobile || mobileShowNote);
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setNote(r.id);
                setMobileShowNote(true);
              }}
              className={`relative w-full rounded-[10px] px-3.5 py-2.5 text-left transition-colors ${
                sel ? "bg-[rgb(255_204_0/0.32)] dark:bg-[rgb(255_204_0/0.22)]" : "hover:bg-[var(--hover)]"
              }`}
            >
              <p className="truncate text-[13px] font-semibold text-label">{r.title}</p>
              <p className="mt-0.5 flex gap-2 text-[12px]">
                <span className="shrink-0 text-label">{r.date.split(" – ")[0]}</span>
                <span className="line-clamp-1 text-label-3">{r.snippet}</span>
              </p>
              {i < rows.length - 1 && !sel && (
                <span className="absolute inset-x-3.5 -bottom-px h-[0.5px] bg-[var(--separator)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const content = (
    <div className={`flex min-w-0 flex-1 flex-col ${single ? "" : "border-l-[0.5px] border-[var(--separator)]"}`}>
      <div data-drag className={`flex h-[52px] shrink-0 items-center gap-1 px-3 ${isMobile ? "pl-[88px]" : ""}`}>
        {isMobile && (
          <button type="button" className="tool-btn gap-0.5 !px-1 text-[13px]" style={{ color: NOTES_YELLOW }} onClick={() => setMobileShowNote(false)}>
            <ChevronLeft size={18} /> Notes
          </button>
        )}
        <div className="flex-1" />
        <span className="tool-btn" aria-hidden>
          <Lock size={15} />
        </span>
        <span className="tool-btn" aria-hidden>
          <Share size={15} />
        </span>
        <span className="tool-btn" aria-hidden>
          <SquarePen size={15} />
        </span>
        <span className={`tool-capsule ml-1 w-[150px] gap-1.5 px-3 ${width >= 900 ? "inline-flex" : "hidden"}`}>
          <Search size={13} /> <span className="text-[12.5px] text-label-3">Search</span>
        </span>
      </div>
      <div className="mac-scroll flex-1 bg-[var(--content)] px-6 pb-10 pt-3 sm:px-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${folder}-${note}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mx-auto max-w-[640px]"
          >
            <NoteBody folder={folder} id={note} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="flex h-full">
      {withSidebar && (
        <aside className="mac-sidebar m-2 mr-0 flex w-[180px] shrink-0 flex-col overflow-hidden">
          <div data-drag className="h-[46px] shrink-0" />
          <div className="px-2.5">
            <p className="side-heading">iCloud</p>
            {FOLDERS.map((f) => (
              <button key={f.id} type="button" className="side-item" data-selected={folder === f.id} onClick={() => pickFolder(f.id)}>
                <Folder size={15} style={{ color: NOTES_YELLOW }} />
                {f.name}
                <span className="ml-auto text-[12px] text-label-3">{f.rows.length}</span>
              </button>
            ))}
          </div>
        </aside>
      )}
      {single ? (mobileShowNote ? content : list) : (
        <>
          {list}
          {content}
        </>
      )}
    </div>
  );
}
