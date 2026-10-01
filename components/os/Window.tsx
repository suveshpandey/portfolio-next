"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { motion } from "motion/react";
import { APPS, DOCK_RESERVE, MENU_H, type AppId } from "./apps-meta";
import { useOS, type WinState } from "./store";

type Dir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const HANDLES: { dir: Dir; className: string; cursor: string }[] = [
  { dir: "n", className: "top-[-4px] left-3 right-3 h-2", cursor: "ns-resize" },
  { dir: "s", className: "bottom-[-4px] left-3 right-3 h-2", cursor: "ns-resize" },
  { dir: "e", className: "right-[-4px] top-3 bottom-3 w-2", cursor: "ew-resize" },
  { dir: "w", className: "left-[-4px] top-3 bottom-3 w-2", cursor: "ew-resize" },
  { dir: "ne", className: "right-[-5px] top-[-5px] h-4 w-4", cursor: "nesw-resize" },
  { dir: "sw", className: "left-[-5px] bottom-[-5px] h-4 w-4", cursor: "nesw-resize" },
  { dir: "nw", className: "left-[-5px] top-[-5px] h-4 w-4", cursor: "nwse-resize" },
  { dir: "se", className: "right-[-5px] bottom-[-5px] h-4 w-4", cursor: "nwse-resize" },
];

export function TrafficLights({ id, className = "" }: { id: AppId; className?: string }) {
  const { closeApp, minimizeApp, toggleMaximize, isMobile } = useOS();
  const resizable = APPS[id].resizable !== false;
  return (
    <div className={`traffic-group flex items-center gap-2 ${className}`} data-no-drag>
      <button
        type="button"
        aria-label="Close window"
        onClick={() => closeApp(id)}
        className="traffic"
        style={{ background: "#ff5f57" }}
      >
        <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden>
          <path d="M.8.8l4.4 4.4M5.2.8L.8 5.2" stroke="#4d0000" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Minimize window"
        onClick={() => minimizeApp(id)}
        className="traffic"
        style={{ background: "#febc2e" }}
      >
        <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden>
          <path d="M.6 3h4.8" stroke="#985700" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Zoom window"
        disabled={!resizable || isMobile}
        onClick={() => toggleMaximize(id)}
        className="traffic disabled:!bg-[color-mix(in_srgb,var(--label)_18%,transparent)]"
        style={{ background: "#28c840" }}
      >
        <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden>
          <path d="M1 1h2.6L1 3.6Z M5 5H2.4L5 2.4Z" fill="#006500" />
        </svg>
      </button>
    </div>
  );
}

/**
 * `win` comes in as a prop (not read from the store) so that while AnimatePresence plays the
 * close animation, the exiting window keeps rendering its last known frame.
 */
export default function Window({ id, win, children }: { id: AppId; win: WinState; children: ReactNode }) {
  const { activeId, focusApp, setRect, toggleMaximize, viewport, isMobile } = useOS();
  const meta = APPS[id];
  const active = activeId === id;
  const resizable = meta.resizable !== false && !isMobile;
  const maximized = win.maximized || isMobile;

  // animate the frame only while zooming, not while dragging
  const [zooming, setZooming] = useState(false);
  const prevMax = useRef(maximized);
  useEffect(() => {
    if (prevMax.current !== maximized) {
      prevMax.current = maximized;
      setZooming(true);
      const t = window.setTimeout(() => setZooming(false), 420);
      return () => window.clearTimeout(t);
    }
  }, [maximized]);

  const frame = maximized
    ? isMobile
      ? { left: 0, top: MENU_H, width: viewport.w, height: viewport.h - MENU_H - 84 }
      : { left: 8, top: MENU_H + 1, width: viewport.w - 16, height: viewport.h - MENU_H - DOCK_RESERVE + 3 }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  // Genie-ish minimize: shrink toward this app's Dock icon
  const minimizeTarget = useMemo(() => {
    if (!win.minimized || typeof document === "undefined") return { x: 0, y: 300 };
    const el = document.querySelector(`[data-dock-id="${id}"]`);
    if (!el) return { x: 0, y: 300 };
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - (frame.left + frame.width / 2),
      y: r.top + r.height / 2 - (frame.top + frame.height / 2),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.minimized]);

  const startDrag = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (!target.closest("[data-drag]") || target.closest("button, a, input, textarea, select, [data-no-drag]")) return;
    if (maximized) return;
    e.preventDefault();
    document.body.classList.add("is-dragging");
    const sx = e.clientX;
    const sy = e.clientY;
    const ox = win.x;
    const oy = win.y;
    const move = (ev: PointerEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setRect(id, {
        x: Math.min(vw - 120, Math.max(-win.w + 120, ox + ev.clientX - sx)),
        y: Math.min(vh - 60, Math.max(MENU_H + 2, oy + ev.clientY - sy)),
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.style.cursor = "";
      document.body.classList.remove("is-dragging");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-drag]") || target.closest("button, a, input, textarea, [data-no-drag]")) return;
    if (resizable) toggleMaximize(id);
  };

  const startResize = (dir: Dir) => (e: RPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);
    const sx = e.clientX;
    const sy = e.clientY;
    const o = { x: win.x, y: win.y, w: win.w, h: win.h };
    const cursor = HANDLES.find((h) => h.dir === dir)!.cursor;
    document.body.style.cursor = cursor;
    document.body.classList.add("is-dragging");
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      const next = { ...o };
      if (dir.includes("e")) next.w = Math.max(meta.minW, o.w + dx);
      if (dir.includes("s")) next.h = Math.max(meta.minH, Math.min(window.innerHeight - o.y - 8, o.h + dy));
      if (dir.includes("w")) {
        next.w = Math.max(meta.minW, o.w - dx);
        next.x = o.x + (o.w - next.w);
      }
      if (dir.includes("n")) {
        const h = Math.max(meta.minH, o.h - dy);
        const y = o.y + (o.h - h);
        if (y >= MENU_H + 2) {
          next.h = h;
          next.y = y;
        }
      }
      setRect(id, next);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.style.cursor = "";
      document.body.classList.remove("is-dragging");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <motion.section
      role="dialog"
      aria-label={meta.label}
      data-active={active}
      className={`mac-window absolute flex flex-col overflow-visible ${maximized ? "is-maximized" : ""}`}
      style={{
        ...frame,
        zIndex: win.z,
        transition: zooming ? "left .4s cubic-bezier(.2,.9,.25,1), top .4s cubic-bezier(.2,.9,.25,1), width .4s cubic-bezier(.2,.9,.25,1), height .4s cubic-bezier(.2,.9,.25,1)" : undefined,
        pointerEvents: win.minimized ? "none" : undefined,
        transformOrigin: "50% 50%",
      }}
      initial={{ opacity: 0, scale: 0.92, y: 14 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.08, x: minimizeTarget.x, y: minimizeTarget.y, transition: { duration: 0.45, ease: [0.5, 0, 0.75, 0] } }
          : { opacity: 1, scale: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } }
      }
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18, ease: "easeIn" } }}
      onPointerDownCapture={() => focusApp(id)}
      onPointerDown={startDrag}
      onDoubleClick={onDoubleClick}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[inherit]">
        {meta.customChrome ? (
          <>
            {!meta.ownLights && <TrafficLights id={id} className="absolute left-[18px] top-[19px] z-30" />}
            {children}
          </>
        ) : (
          <>
            <header data-drag className="relative flex h-[52px] shrink-0 items-center justify-center px-5">
              <TrafficLights id={id} className="absolute left-[18px] top-1/2 -translate-y-1/2" />
              <h2 className={`text-[13px] font-semibold ${active ? "text-label" : "text-label-3"}`}>{meta.label}</h2>
            </header>
            <div className="relative min-h-0 flex-1">{children}</div>
          </>
        )}
      </div>

      {resizable &&
        !maximized &&
        HANDLES.map((h) => (
          <div
            key={h.dir}
            data-no-drag
            onPointerDown={startResize(h.dir)}
            className={`absolute z-40 ${h.className}`}
            style={{ cursor: h.cursor }}
          />
        ))}
    </motion.section>
  );
}
