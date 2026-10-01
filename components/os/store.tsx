"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { APPS, DOCK_RESERVE, MENU_H, MOBILE_BP, type AppId } from "./apps-meta";
import { WALLPAPERS, WALLPAPER_TONE, type WallpaperVariant } from "./Wallpaper";

export type WinState = {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Launch arguments (e.g. which project to show). `nonce` lets apps react to re-opens. */
  args?: { nonce: number; [k: string]: unknown };
};

type State = {
  windows: Partial<Record<AppId, WinState>>;
  topZ: number;
  /** Bumped on every launch so the Dock can bounce the icon */
  launches: Partial<Record<AppId, number>>;
};

type Action =
  | { type: "open"; id: AppId; rect: { x: number; y: number; w: number; h: number }; maximized: boolean; args?: Record<string, unknown> }
  | { type: "close"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "minimize"; id: AppId }
  | { type: "toggleMax"; id: AppId }
  | { type: "rect"; id: AppId; rect: Partial<Pick<WinState, "x" | "y" | "w" | "h">> }
  | { type: "closeAll" };

let nonce = 0;

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "open": {
      const existing = state.windows[a.id];
      const z = state.topZ + 1;
      const args = a.args ? { ...a.args, nonce: ++nonce } : existing?.args;
      if (existing) {
        return {
          ...state,
          topZ: z,
          windows: { ...state.windows, [a.id]: { ...existing, minimized: false, z, args } },
        };
      }
      return {
        topZ: z,
        launches: { ...state.launches, [a.id]: (state.launches[a.id] ?? 0) + 1 },
        windows: {
          ...state.windows,
          [a.id]: { id: a.id, minimized: false, maximized: a.maximized, z, ...a.rect, args },
        },
      };
    }
    case "close": {
      const windows = { ...state.windows };
      delete windows[a.id];
      return { ...state, windows };
    }
    case "focus": {
      const w = state.windows[a.id];
      if (!w || (w.z === state.topZ && !w.minimized)) return state;
      const z = state.topZ + 1;
      return { ...state, topZ: z, windows: { ...state.windows, [a.id]: { ...w, z, minimized: false } } };
    }
    case "minimize": {
      const w = state.windows[a.id];
      if (!w) return state;
      return { ...state, windows: { ...state.windows, [a.id]: { ...w, minimized: true } } };
    }
    case "toggleMax": {
      const w = state.windows[a.id];
      if (!w) return state;
      const z = state.topZ + 1;
      return { ...state, topZ: z, windows: { ...state.windows, [a.id]: { ...w, z, maximized: !w.maximized } } };
    }
    case "rect": {
      const w = state.windows[a.id];
      if (!w) return state;
      return { ...state, windows: { ...state.windows, [a.id]: { ...w, ...a.rect } } };
    }
    case "closeAll":
      return { ...state, windows: {} };
  }
}

export type ThemeMode = "light" | "dark" | "auto";
export type WallpaperChoice = WallpaperVariant | "dynamic";

export const ACCENTS = {
  blue: { name: "Blue", light: "#007aff", dark: "#0a84ff" },
  purple: { name: "Purple", light: "#8944ab", dark: "#a550a7" },
  pink: { name: "Pink", light: "#e3407f", dark: "#f74f9e" },
  red: { name: "Red", light: "#e0383e", dark: "#ff5257" },
  orange: { name: "Orange", light: "#f7821b", dark: "#f7821b" },
  yellow: { name: "Yellow", light: "#d9a400", dark: "#ffc600" },
  green: { name: "Green", light: "#28a745", dark: "#34c759" },
  graphite: { name: "Graphite", light: "#8c8c8c", dark: "#8c8c8c" },
} as const;
export type AccentId = keyof typeof ACCENTS;

export type Toast = { id: number; title: string; body: string; icon?: AppId };

type OS = {
  windows: Partial<Record<AppId, WinState>>;
  launches: Partial<Record<AppId, number>>;
  activeId: AppId | null;
  openApp: (id: AppId, args?: Record<string, unknown>) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  setRect: (id: AppId, rect: Partial<Pick<WinState, "x" | "y" | "w" | "h">>) => void;
  closeAll: () => void;

  isMobile: boolean;
  viewport: { w: number; h: number };

  themeMode: ThemeMode;
  setThemeMode: (m: ThemeMode) => void;
  isDark: boolean;

  wallpaper: WallpaperChoice;
  setWallpaper: (w: WallpaperChoice) => void;
  wallpaperVariant: WallpaperVariant;
  wallpaperTone: "light" | "dark";

  spotlightOpen: boolean;
  setSpotlightOpen: (v: boolean) => void;

  toasts: Toast[];
  notify: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;

  brightness: number;
  setBrightness: (v: number) => void;

  accent: AccentId;
  setAccent: (a: AccentId) => void;

  restart: () => void;
  bootKey: number;
};

const Ctx = createContext<OS | null>(null);

export function useOS() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOS must be used inside <OSProvider>");
  return ctx;
}

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {}
}

export function OSProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: {}, topZ: 10, launches: {} });
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const [themeMode, setThemeModeState] = useState<ThemeMode>("auto");
  const [systemDark, setSystemDark] = useState(true);
  const [wallpaper, setWallpaperState] = useState<WallpaperChoice>("dynamic");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [brightness, setBrightness] = useState(1);
  const [bootKey, setBootKey] = useState(0);
  const [accent, setAccentState] = useState<AccentId>("blue");

  // viewport
  useEffect(() => {
    const read = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  // theme — `theme` key is shared with the no-flash script in app/layout.tsx.
  // Persisted prefs are read after mount so server and client render the same first frame.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const saved = readStorage("theme");
    if (saved === "light" || saved === "dark") setThemeModeState(saved);
    const wp = readStorage("wallpaper");
    if (wp === "dynamic" || WALLPAPERS.some((w) => w.id === wp)) setWallpaperState(wp as WallpaperChoice);
    const ac = readStorage("accent");
    if (ac && ac in ACCENTS) setAccentState(ac as AccentId);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const isDark = themeMode === "auto" ? systemDark : themeMode === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    if (accent === "blue") root.style.removeProperty("--accent");
    else root.style.setProperty("--accent", ACCENTS[accent][isDark ? "dark" : "light"]);
  }, [accent, isDark]);

  const setAccent = useCallback((a: AccentId) => {
    setAccentState(a);
    writeStorage("accent", a);
  }, []);

  const setThemeMode = useCallback((m: ThemeMode) => {
    setThemeModeState(m);
    writeStorage("theme", m === "auto" ? null : m);
  }, []);

  const setWallpaper = useCallback((w: WallpaperChoice) => {
    setWallpaperState(w);
    writeStorage("wallpaper", w);
  }, []);

  const wallpaperVariant: WallpaperVariant =
    wallpaper === "dynamic" ? (isDark ? "silk" : "horizon") : wallpaper;
  const wallpaperTone = WALLPAPER_TONE[wallpaperVariant];

  const isMobile = viewport.w < MOBILE_BP;

  const openApp = useCallback(
    (id: AppId, args?: Record<string, unknown>) => {
      const meta = APPS[id];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < MOBILE_BP;
      const availH = vh - MENU_H - DOCK_RESERVE;
      const w = Math.min(meta.w, vw - 32);
      const h = Math.min(meta.h, availH - 16);
      const openCount = Object.keys(state.windows).length;
      const cascade = (openCount % 6) * 28;
      const x = Math.max(16, Math.round((vw - w) / 2 - 90 + cascade));
      const y = Math.max(MENU_H + 10, Math.round(MENU_H + (availH - h) / 2 - 20 + cascade));
      dispatch({ type: "open", id, rect: { x, y, w, h }, maximized: mobile, args });
    },
    [state.windows]
  );

  const closeApp = useCallback((id: AppId) => dispatch({ type: "close", id }), []);
  const focusApp = useCallback((id: AppId) => dispatch({ type: "focus", id }), []);
  const minimizeApp = useCallback((id: AppId) => dispatch({ type: "minimize", id }), []);
  const toggleMaximize = useCallback((id: AppId) => dispatch({ type: "toggleMax", id }), []);
  const setRect = useCallback(
    (id: AppId, rect: Partial<Pick<WinState, "x" | "y" | "w" | "h">>) => dispatch({ type: "rect", id, rect }),
    []
  );
  const closeAll = useCallback(() => dispatch({ type: "closeAll" }), []);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const notify = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 7000);
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: "closeAll" });
    setSpotlightOpen(false);
    setBootKey((k) => k + 1);
  }, []);

  const activeId = useMemo(() => {
    let best: WinState | null = null;
    for (const w of Object.values(state.windows)) {
      if (w && !w.minimized && (!best || w.z > best.z)) best = w;
    }
    return best?.id ?? null;
  }, [state.windows]);

  const value: OS = {
    windows: state.windows,
    launches: state.launches,
    activeId,
    openApp,
    closeApp,
    focusApp,
    minimizeApp,
    toggleMaximize,
    setRect,
    closeAll,
    isMobile,
    viewport,
    themeMode,
    setThemeMode,
    isDark,
    wallpaper,
    setWallpaper,
    wallpaperVariant,
    wallpaperTone,
    spotlightOpen,
    setSpotlightOpen,
    toasts,
    notify,
    dismissToast,
    brightness,
    setBrightness,
    accent,
    setAccent,
    restart,
    bootKey,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
