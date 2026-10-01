"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Wifi, Bluetooth, Moon, Sun, Image as ImageIcon, BatteryFull, Radio, SunDim, Hammer, Mail } from "lucide-react";
import MenuPanel, { type MenuItem } from "./Menu";
import { APPS, DOCK_ORDER, MENU_H } from "./apps-meta";
import { useOS } from "./store";
import { CONTACT } from "@/lib";
import { SuveshGlyph } from "./SuveshMark";
import { WALLPAPERS } from "./Wallpaper";

function Clock({ compact }: { compact: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // client-only clock: reading the time during SSR would cause a hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(t);
  }, []);
  if (!now) return <span className="w-[140px]" />;
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (compact) return <span>{time}</span>;
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return (
    <span className="tabular-nums">
      {date.replace(",", "")}&nbsp;&nbsp;{time}
    </span>
  );
}

function Round({ on, children }: { on?: boolean; children: ReactNode }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
        on ? "bg-[var(--accent)] text-white" : "bg-black/10 text-label dark:bg-white/15"
      }`}
    >
      {children}
    </span>
  );
}

function ControlCenter({ onDone }: { onDone: () => void }) {
  const { isDark, setThemeMode, wallpaper, setWallpaper, wallpaperVariant, brightness, setBrightness, openApp } = useOS();
  const cycleWallpaper = () => {
    const i = WALLPAPERS.findIndex((w) => w.id === wallpaperVariant);
    setWallpaper(WALLPAPERS[(i + 1) % WALLPAPERS.length].id);
  };
  const tile = "glass rounded-[20px] p-2.5";
  return (
    <div className="glass-strong glass-rim w-[min(340px,calc(100vw-16px))] rounded-[26px] p-3 text-label">
      <div className="grid grid-cols-2 gap-2.5">
        <div className={`${tile} flex flex-col gap-2.5`}>
          {[
            { icon: <Wifi size={15} />, t: "Wi-Fi", s: "GoldenGate-5G" },
            { icon: <Bluetooth size={15} />, t: "Bluetooth", s: "On" },
            { icon: <Radio size={15} />, t: "AirDrop", s: "Contacts Only" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-2">
              <Round on>{r.icon}</Round>
              <div className="min-w-0 leading-tight">
                <p className="text-[12px] font-semibold">{r.t}</p>
                <p className="truncate text-[11px] text-label-2">{r.s}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <button type="button" onClick={() => setThemeMode(isDark ? "light" : "dark")} className={`${tile} flex items-center gap-2 text-left`}>
            <Round on={isDark}>{isDark ? <Moon size={15} /> : <Sun size={15} />}</Round>
            <div className="leading-tight">
              <p className="text-[12px] font-semibold">Dark Mode</p>
              <p className="text-[11px] text-label-2">{isDark ? "On" : "Off"}</p>
            </div>
          </button>
          <button type="button" onClick={cycleWallpaper} className={`${tile} flex items-center gap-2 text-left`}>
            <Round>
              <ImageIcon size={15} />
            </Round>
            <div className="min-w-0 leading-tight">
              <p className="text-[12px] font-semibold">Wallpaper</p>
              <p className="truncate text-[11px] text-label-2">
                {wallpaper === "dynamic" ? "Dynamic" : WALLPAPERS.find((w) => w.id === wallpaper)?.name}
              </p>
            </div>
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            openApp("mail");
            onDone();
          }}
          className={`${tile} col-span-2 flex items-center gap-2.5 text-left`}
        >
          <Round on>
            <Hammer size={15} />
          </Round>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[12px] font-semibold">Focus: Building</p>
            <p className="text-[11px] text-label-2">Open to full-time &amp; remote roles</p>
          </div>
          <Mail size={15} className="text-label-2" />
        </button>
        <div className={`${tile} col-span-2`}>
          <p className="mb-2 px-1 text-[12px] font-semibold">Display</p>
          <div className="relative flex h-7 items-center overflow-hidden rounded-full bg-black/20 dark:bg-white/15">
            <div className="absolute inset-y-0 left-0 rounded-full bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.1)]" style={{ width: `${((brightness - 0.35) / 0.65) * 100}%` }} />
            <SunDim size={14} className="relative ml-2 text-black/60" />
            <input
              type="range"
              aria-label="Display brightness"
              min={0.35}
              max={1}
              step={0.01}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuBar() {
  const os = useOS();
  const { activeId, openApp, closeApp, minimizeApp, toggleMaximize, windows, isMobile, isDark, setThemeMode } = os;
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const appName = activeId ? APPS[activeId].name : "Finder";
  const close = () => setOpen(null);

  const menus: { key: string; label: ReactNode; bold?: boolean; items: MenuItem[]; desktopOnly?: boolean }[] = [
    {
      key: "system",
      label: <SuveshGlyph size={16} />,
      items: [
        { label: "About This Portfolio", onClick: () => openApp("about") },
        { type: "sep" },
        { label: "System Settings…", onClick: () => openApp("settings") },
        { type: "sep" },
        { label: "Open Resume.pdf", onClick: () => openApp("resume") },
        { label: "GitHub Profile", onClick: () => window.open(CONTACT.github, "_blank", "noopener,noreferrer") },
        { type: "sep" },
        { label: "Restart…", onClick: os.restart },
        { label: "Close All Windows", shortcut: "⌥⌘W", onClick: os.closeAll },
      ],
    },
    {
      key: "app",
      label: appName,
      bold: true,
      items: [
        { label: `About ${appName}`, onClick: () => openApp("about") },
        { type: "sep" },
        { label: "Settings…", shortcut: "⌘,", onClick: () => openApp("settings") },
        { type: "sep" },
        { label: `Hide ${appName}`, shortcut: "⌘H", onClick: activeId ? () => minimizeApp(activeId) : undefined },
        { label: `Quit ${appName}`, shortcut: "⌘Q", onClick: activeId ? () => closeApp(activeId) : undefined },
      ],
    },
    {
      key: "file",
      label: "File",
      desktopOnly: true,
      items: [
        { label: "New Terminal Window", shortcut: "⌘N", onClick: () => openApp("terminal") },
        { label: "Open Projects…", shortcut: "⌘O", onClick: () => openApp("projects") },
        { label: "Open Resume.pdf", onClick: () => openApp("resume") },
        { type: "sep" },
        { label: "Close Window", shortcut: "⌘W", onClick: activeId ? () => closeApp(activeId) : undefined },
      ],
    },
    {
      key: "edit",
      label: "Edit",
      desktopOnly: true,
      items: [
        { label: "Undo", shortcut: "⌘Z" },
        { label: "Redo", shortcut: "⇧⌘Z" },
        { type: "sep" },
        { label: "Cut", shortcut: "⌘X" },
        { label: "Copy", shortcut: "⌘C" },
        { label: "Paste", shortcut: "⌘V" },
        { type: "sep" },
        { label: "Copy Email Address", onClick: () => navigator.clipboard?.writeText(CONTACT.email) },
      ],
    },
    {
      key: "view",
      label: "View",
      desktopOnly: true,
      items: [
        { label: "Enter Full Screen", shortcut: "⌃⌘F", onClick: activeId ? () => toggleMaximize(activeId) : undefined },
        { type: "sep" },
        { label: "Dark Mode", checked: isDark, onClick: () => setThemeMode(isDark ? "light" : "dark") },
        { label: "Change Wallpaper…", onClick: () => openApp("settings", { pane: "wallpaper" }) },
        { type: "sep" },
        { label: "Spotlight Search", shortcut: "⌘K", onClick: () => os.setSpotlightOpen(true) },
      ],
    },
    {
      key: "window",
      label: "Window",
      desktopOnly: true,
      items: [
        { label: "Minimize", shortcut: "⌘M", onClick: activeId ? () => minimizeApp(activeId) : undefined },
        { label: "Zoom", onClick: activeId ? () => toggleMaximize(activeId) : undefined },
        { type: "sep" },
        ...DOCK_ORDER.filter((id) => windows[id]).map((id) => ({
          label: APPS[id].label,
          checked: id === activeId,
          onClick: () => openApp(id),
        })),
        ...(Object.keys(windows).length ? [{ type: "sep" as const }] : []),
        {
          label: "Bring All to Front",
          onClick: Object.keys(windows).length
            ? () => DOCK_ORDER.filter((id) => windows[id]).forEach((id) => openApp(id))
            : undefined,
        },
      ],
    },
    {
      key: "help",
      label: "Help",
      desktopOnly: true,
      items: [
        {
          label: "Keyboard Shortcuts",
          onClick: () =>
            os.notify({
              title: "Keyboard Shortcuts",
              body: "⌘K Spotlight · Double-click a title bar to zoom · Esc closes menus",
              icon: "settings",
            }),
        },
        { label: "Contact Suvesh…", onClick: () => openApp("mail") },
      ],
    },
  ];

  const statusBtn = "menubar-item !px-2";

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-[9750] flex items-center justify-between px-2 sm:px-3"
      style={{ height: MENU_H }}
    >
      {/* Tahoe-style transparent bar; a soft scrim keeps labels legible on bright wallpapers */}
      <div className="menubar-scrim pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />

      <nav className="relative flex min-w-0 items-center" aria-label="Menu bar">
        {menus
          .filter((m) => !(isMobile && m.desktopOnly))
          .map((m) => (
            <div key={m.key} className="relative">
              <button
                type="button"
                data-open={open === m.key}
                aria-haspopup="menu"
                aria-expanded={open === m.key}
                aria-label={m.key === "system" ? "System menu" : undefined}
                onClick={() => setOpen(open === m.key ? null : m.key)}
                onMouseEnter={() => open && open !== m.key && setOpen(m.key)}
                className={`menubar-item ${m.bold ? "font-bold" : ""} ${m.key === "system" ? "!px-3" : ""}`}
              >
                {m.label}
              </button>
              <AnimatePresence>
                {open === m.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.14 }}
                    className="absolute left-0 top-[calc(100%+5px)]"
                  >
                    <MenuPanel items={m.items} onDone={close} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </nav>

      <div className="relative flex items-center">
        {!isMobile && (
          <>
            <span className={statusBtn} aria-label="Battery full">
              <BatteryFull size={20} strokeWidth={1.6} />
            </span>
            <span className={statusBtn} aria-label="Wi-Fi connected">
              <Wifi size={16} strokeWidth={2} />
            </span>
          </>
        )}
        <button type="button" aria-label="Spotlight" onClick={() => os.setSpotlightOpen(true)} className={statusBtn}>
          <Search size={15} strokeWidth={2.2} />
        </button>
        <div className="relative">
          <button
            type="button"
            aria-label="Control Center"
            data-open={open === "cc"}
            onClick={() => setOpen(open === "cc" ? null : "cc")}
            className={statusBtn}
          >
            <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="2" y="3.5" width="16" height="5.5" rx="2.75" />
              <circle cx="14.8" cy="6.25" r="1.4" fill="currentColor" />
              <rect x="2" y="11" width="16" height="5.5" rx="2.75" />
              <circle cx="5.2" cy="13.75" r="1.4" fill="currentColor" />
            </svg>
          </button>
          <AnimatePresence>
            {open === "cc" && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
                className="absolute right-0 top-[calc(100%+5px)] origin-top-right"
              >
                <ControlCenter onDone={close} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="menubar-item select-none">
          <Clock compact={isMobile} />
        </span>
      </div>
    </header>
  );
}
