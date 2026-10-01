"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { OSProvider, useOS } from "./store";
import Wallpaper from "./Wallpaper";
import MenuBar from "./MenuBar";
import { SuveshBadge } from "./SuveshMark";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import MenuPanel, { type MenuItem } from "./Menu";
import AppIcon, { type IconId } from "./AppIcon";
import { APPS, DOCK_ORDER, MENU_H, MOBILE_DOCK, type AppId } from "./apps-meta";
import AboutApp from "@/components/apps/AboutApp";
import FinderApp from "@/components/apps/FinderApp";
import NotesApp from "@/components/apps/NotesApp";
import SkillsApp from "@/components/apps/SkillsApp";
import TerminalApp from "@/components/apps/TerminalApp";
import ActivityApp from "@/components/apps/ActivityApp";
import MailApp from "@/components/apps/MailApp";
import PreviewApp from "@/components/apps/PreviewApp";
import SettingsApp from "@/components/apps/SettingsApp";
import { EXPERIENCE } from "@/lib/content";
import { CONTACT } from "@/lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const APP_COMPONENTS: Record<AppId, ComponentType<{ args?: any }>> = {
  about: AboutApp,
  projects: FinderApp,
  notes: NotesApp,
  skills: SkillsApp,
  terminal: TerminalApp,
  activity: ActivityApp,
  mail: MailApp,
  resume: PreviewApp,
  settings: SettingsApp,
};

/* ───────────────────────── Boot ───────────────────────── */

function BootScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 2100);
    return () => window.clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      onClick={onDone}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
      >
        <SuveshBadge size={96} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-6 text-[13px] font-medium uppercase tracking-[0.42em] text-white/70"
      >
        Suvesh&nbsp;Pandey
      </motion.p>
      <div className="mt-10 h-[4px] w-[180px] overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: [0.3, 0.1, 0.3, 1], delay: 0.15 }}
        />
      </div>
      <span className="sr-only">Starting up — click to skip</span>
    </motion.div>
  );
}

/* ───────────────────────── Notifications ───────────────────────── */

function Toasts() {
  const { toasts, dismissToast } = useOS();
  return (
    <div className="pointer-events-none fixed right-2 z-[9700] flex w-[min(360px,calc(100vw-16px))] flex-col gap-2" style={{ top: MENU_H + 8 }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            type="button"
            key={t.id}
            layout
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onClick={() => dismissToast(t.id)}
            className="glass-strong glass-rim pointer-events-auto flex items-start gap-3 rounded-[22px] p-3 text-left"
          >
            <span className="shrink-0">
              <AppIcon id={t.icon ?? "about"} size={44} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13px] font-semibold text-label">{t.title}</span>
                <span className="shrink-0 text-[11px] text-label-3">now</span>
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-label-2">{t.body}</span>
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Widgets ───────────────────────── */

function Widget({ children, className = "", onClick, label }: { children: ReactNode; className?: string; onClick?: () => void; label: string }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`glass glass-rim wallpaper-glass overflow-hidden rounded-[24px] text-left text-[var(--ink)] [text-shadow:var(--ink-shadow)] ${className}`}
    >
      {children}
    </motion.button>
  );
}

function CalendarWidget() {
  const [now, setNow] = useState<Date | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only date avoids a hydration mismatch
  useEffect(() => setNow(new Date()), []);
  if (!now) return <div className="h-full" />;
  const y = now.getFullYear();
  const m = now.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="flex h-full flex-col p-3.5">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#ff6b5a]">
        {now.toLocaleDateString("en-US", { month: "long" })}
      </p>
      <div className="mt-1.5 grid grid-cols-7 gap-y-[3px] text-center text-[9.5px] font-medium">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-[var(--ink-3)]">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span
            key={i}
            className={`mx-auto grid h-[15px] w-[15px] place-items-center rounded-full ${
              d === now.getDate() ? "bg-[#ff453a] font-bold text-white [text-shadow:none]" : "text-[var(--ink)]"
            }`}
          >
            {d ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function Widgets() {
  const { openApp } = useOS();
  const latest = EXPERIENCE[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="absolute left-5 hidden w-[344px] flex-col gap-4 lg:flex"
      style={{ top: MENU_H + 18 }}
    >
      <Widget label="About Suvesh" onClick={() => openApp("about")} className="flex h-[158px] w-full flex-col justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
            <Image src="/images/profilePic.jpg" alt="" fill sizes="104px" className="object-cover" />
          </span>
          <div className="min-w-0">
            <p className="text-[17px] font-bold leading-tight">Suvesh Pandey</p>
            <p className="text-[12.5px] text-[var(--ink-2)]">Software Engineer · AI &amp; Full-Stack</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium">
            <span className="h-2 w-2 rounded-full bg-[#34c759] shadow-[0_0_8px_#34c759]" /> Open to work
          </span>
          <span className="text-[12px] text-[var(--ink-2)]">India · Remote</span>
        </div>
      </Widget>
      <div className="grid grid-cols-2 gap-4">
        <Widget
          label="Now building"
          onClick={() => openApp("notes", { folder: "experience", note: latest.id })}
          className="flex h-[164px] flex-col p-3.5"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--ink-accent)]">Now building</p>
          <p className="mt-1.5 text-[15px] font-bold leading-tight">Euron CRM</p>
          <p className="mt-1 text-[11.5px] leading-snug text-[var(--ink-2)]">
            Real-time AI voice agent &amp; autonomous AI sales agent
          </p>
          <p className="mt-auto text-[11px] text-[var(--ink-3)]">{latest.role}</p>
        </Widget>
        <Widget label="Calendar" className="h-[164px]">
          <CalendarWidget />
        </Widget>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Desktop icons ───────────────────────── */

const DESKTOP_ICONS: { key: string; icon: IconId; label: string; app: AppId }[] = [
  { key: "hd", icon: "disk", label: "Suvesh HD", app: "about" },
  { key: "projects", icon: "folder", label: "Projects", app: "projects" },
  { key: "resume", icon: "pdf", label: "Resume.pdf", app: "resume" },
  { key: "terminal", icon: "terminal", label: "Terminal", app: "terminal" },
];

const MOBILE_LINKS: { icon: IconId; label: string; href: string }[] = [
  { icon: "github", label: "GitHub", href: CONTACT.github },
  { icon: "linkedin", label: "LinkedIn", href: CONTACT.linkedin },
  { icon: "x", label: "X", href: CONTACT.twitter },
];

/** Phones: an iOS-style home screen of every app */
function HomeGrid() {
  const { openApp } = useOS();
  const tiles = [
    ...DOCK_ORDER.filter((id) => !MOBILE_DOCK.includes(id)).map((id) => ({
      key: id,
      icon: id as IconId,
      label: APPS[id].label.replace(".pdf", ""),
      run: () => openApp(id),
    })),
    ...MOBILE_LINKS.map((l) => ({
      key: l.icon,
      icon: l.icon,
      label: l.label,
      run: () => window.open(l.href, "_blank", "noopener,noreferrer"),
    })),
  ];
  return (
    <div className="absolute inset-x-0 grid grid-cols-4 gap-y-5 px-4" style={{ top: MENU_H + 22 }}>
      {tiles.map((t, i) => (
        <motion.button
          key={t.key}
          type="button"
          onClick={t.run}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 + i * 0.03, type: "spring", stiffness: 380, damping: 24 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center gap-1.5"
        >
          <AppIcon id={t.icon} size={74} />
          <span className="max-w-[76px] truncate text-[11.5px] font-medium text-[var(--ink)] [text-shadow:var(--label-shadow)]">
            {t.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

function DesktopIcons({ selected, setSelected }: { selected: string | null; setSelected: (k: string | null) => void }) {
  const { openApp } = useOS();
  const coarse = () => window.matchMedia("(pointer: coarse)").matches;
  return (
    <div className="absolute right-3 flex flex-col items-center gap-3" style={{ top: MENU_H + 14 }}>
      {DESKTOP_ICONS.map((d) => {
        const sel = selected === d.key;
        return (
          <button
            key={d.key}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (coarse()) openApp(d.app);
              else setSelected(d.key);
            }}
            onDoubleClick={() => openApp(d.app)}
            onKeyDown={(e) => e.key === "Enter" && openApp(d.app)}
            className="flex w-[84px] flex-col items-center gap-1 outline-none"
          >
            <span className={`grid h-[64px] w-[64px] place-items-center rounded-[10px] ${sel ? "bg-black/20 ring-1 ring-white/25" : ""}`}>
              <AppIcon id={d.icon} size={d.icon === "terminal" ? 66 : 62} />
            </span>
            <span
              className={`max-w-full truncate rounded-[4px] px-1.5 text-[12px] font-medium [text-shadow:var(--label-shadow)] ${
                sel ? "bg-[var(--accent)] text-white [text-shadow:none]" : "text-[var(--ink)]"
              }`}
            >
              {d.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Desktop ───────────────────────── */

function DesktopInner() {
  const os = useOS();
  const { windows, openApp, notify, setSpotlightOpen, spotlightOpen, wallpaperVariant, bootKey, isMobile } = os;
  const [booting, setBooting] = useState(true);
  const [ready, setReady] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const welcomed = useRef(false);

  // Skip the boot chime on repeat visits within a session
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
    } catch {}
    // deep links (?app=projects&project=InferLoop.AI) go straight to the desktop
    if (new URLSearchParams(window.location.search).has("app")) seen = true;
    /* eslint-disable react-hooks/set-state-in-effect -- sessionStorage is only readable after mount */
    if (seen && bootKey === 0) setBooting(false);
    else setBooting(true);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [bootKey]);

  const finishBoot = () => {
    try {
      sessionStorage.setItem("booted", "1");
    } catch {}
    setBooting(false);
  };

  // First launch: open About and say hello
  useEffect(() => {
    if (!ready || booting) return;
    if (welcomed.current && bootKey === 0) return;
    welcomed.current = true;
    const params = new URLSearchParams(window.location.search);
    const linked = bootKey === 0 ? params.get("app") : null;
    const t1 = window.setTimeout(() => {
      if (linked && linked in APPS) {
        const project = params.get("project");
        const note = params.get("note");
        openApp(linked as AppId, project ? { project } : note ? { note, folder: params.get("folder") ?? "experience" } : undefined);
      } else if (window.innerWidth >= 768) openApp("about");
    }, 350);
    // phones get a self-explanatory home grid, so only desktops get the hint
    const t2 = window.setTimeout(() => {
      if (window.innerWidth < 768) return;
      notify({
        title: "Welcome to Golden Gate",
        body: "Open apps from the Dock, double-click desktop icons, or press ⌘K to search.",
        icon: "about",
      });
    }, 1300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, booting, bootKey]);

  // ⌘K / Ctrl+K → Spotlight
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen(!spotlightOpen);
      } else if (e.key === "Escape") {
        setCtx(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spotlightOpen, setSpotlightOpen]);

  const ctxItems: MenuItem[] = [
    { label: "New Terminal Window", onClick: () => openApp("terminal") },
    { label: "Open Projects", onClick: () => openApp("projects") },
    { type: "sep" },
    { label: "Get Info", onClick: () => openApp("about") },
    { label: "Change Wallpaper…", onClick: () => openApp("settings", { pane: "wallpaper" }) },
    { label: "Use Dark Mode", checked: os.isDark, onClick: () => os.setThemeMode(os.isDark ? "light" : "dark") },
    { type: "sep" },
    { label: "Spotlight Search", shortcut: "⌘K", onClick: () => setSpotlightOpen(true) },
  ];

  const openIds = DOCK_ORDER.filter((id) => windows[id]);

  return (
    <div className="fixed inset-0 overflow-hidden" data-wallpaper={wallpaperVariant} data-tone={os.wallpaperTone}>
      <Wallpaper variant={wallpaperVariant} />

      {/* Desktop surface */}
      <main
        className="absolute inset-0"
        aria-label="Desktop"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedIcon(null);
            setCtx(null);
          }
        }}
        onContextMenu={(e) => {
          if (e.target !== e.currentTarget) return;
          e.preventDefault();
          setCtx({ x: Math.min(e.clientX, window.innerWidth - 240), y: Math.min(e.clientY, window.innerHeight - 240) });
        }}
      >
        <h1 className="sr-only">Suvesh Pandey — Software Engineer building AI-powered products</h1>
        {!booting && (
          <>
            <Widgets />
            {isMobile ? <HomeGrid /> : <DesktopIcons selected={selectedIcon} setSelected={setSelectedIcon} />}
          </>
        )}
      </main>

      {/* Windows */}
      <div className="pointer-events-none absolute inset-0 [&>*]:pointer-events-auto">
        <AnimatePresence>
          {openIds.map((id) => {
            const App = APP_COMPONENTS[id];
            return (
              <Window key={id} id={id} win={windows[id]!}>
                <App args={windows[id]?.args} />
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {ctx && (
        <div className="fixed z-[9600]" style={{ left: ctx.x, top: ctx.y }}>
          <MenuPanel items={ctxItems} onDone={() => setCtx(null)} />
        </div>
      )}

      {!booting && (
        <>
          <MenuBar />
          <Dock />
        </>
      )}
      <Spotlight />
      <Toasts />

      {/* Display brightness */}
      <div
        className="pointer-events-none fixed inset-0 z-[9900] bg-black transition-opacity duration-200"
        style={{ opacity: 1 - os.brightness }}
      />

      <AnimatePresence>{(!ready || booting) && <BootScreen key={`boot-${bootKey}`} onDone={finishBoot} />}</AnimatePresence>

      <noscript>
        <div className="fixed inset-0 z-[10001] grid place-items-center bg-black p-8 text-center text-white">
          <p>
            Suvesh Pandey — Software Engineer. This portfolio is an interactive desktop and needs JavaScript. Reach me at
            jpsuvesh29@gmail.com.
          </p>
        </div>
      </noscript>
      <span className="sr-only">{isMobile ? "Mobile layout" : "Desktop layout"}. Apps: {DOCK_ORDER.map((id) => APPS[id].label).join(", ")}.</span>
    </div>
  );
}

export default function Desktop() {
  return (
    <OSProvider>
      <DesktopInner />
    </OSProvider>
  );
}
