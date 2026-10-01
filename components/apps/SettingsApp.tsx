"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Check, Palette, Image as ImageIcon, Sun, Info, Search } from "lucide-react";
import { useOS, ACCENTS, type AccentId, type ThemeMode, type WallpaperChoice } from "@/components/os/store";
import { WALLPAPERS, WallpaperThumb } from "@/components/os/Wallpaper";
import { useWidth } from "@/components/os/useWidth";
import { SuveshBadge } from "@/components/os/SuveshMark";

type Pane = "appearance" | "wallpaper" | "displays" | "about";

const PANES: { id: Pane; name: string; icon: ReactNode; color: string }[] = [
  { id: "appearance", name: "Appearance", icon: <Palette size={13} />, color: "#1c1c1e" },
  { id: "wallpaper", name: "Wallpaper", icon: <ImageIcon size={13} />, color: "#32ade6" },
  { id: "displays", name: "Displays", icon: <Sun size={13} />, color: "#007aff" },
  { id: "about", name: "About", icon: <Info size={13} />, color: "#8e8e93" },
];

function Row({ label, children, sub }: { label: string; sub?: string; children: ReactNode }) {
  return (
    <div className="group-row flex items-center justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[13px] text-label">{label}</p>
        {sub && <p className="text-[11.5px] text-label-3">{sub}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function AppearanceThumb({ mode }: { mode: ThemeMode }) {
  const light = (
    <div className="h-full w-full bg-gradient-to-br from-[#f7b56b] to-[#7a4f86] p-1.5">
      <div className="h-full rounded-[4px] bg-white/90 shadow">
        <div className="flex gap-[3px] p-1">
          <i className="h-1 w-1 rounded-full bg-[#ff5f57]" />
          <i className="h-1 w-1 rounded-full bg-[#febc2e]" />
          <i className="h-1 w-1 rounded-full bg-[#28c840]" />
        </div>
      </div>
    </div>
  );
  const dark = (
    <div className="h-full w-full bg-gradient-to-br from-[#1a2152] to-[#05060f] p-1.5">
      <div className="h-full rounded-[4px] bg-[#2a2a30] shadow">
        <div className="flex gap-[3px] p-1">
          <i className="h-1 w-1 rounded-full bg-[#ff5f57]" />
          <i className="h-1 w-1 rounded-full bg-[#febc2e]" />
          <i className="h-1 w-1 rounded-full bg-[#28c840]" />
        </div>
      </div>
    </div>
  );
  if (mode === "light") return light;
  if (mode === "dark") return dark;
  return (
    <div className="relative h-full w-full">
      {light}
      <div className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]">{dark}</div>
    </div>
  );
}

export default function SettingsApp({ args }: { args?: { nonce: number; pane?: Pane } }) {
  const os = useOS();
  const [pane, setPane] = useState<Pane>("appearance");
  const [ref, width] = useWidth<HTMLDivElement>();
  const narrow = width < 620;

  const [seenNonce, setSeenNonce] = useState<number | undefined>(undefined);
  if (args?.nonce !== seenNonce) {
    setSeenNonce(args?.nonce);
    if (args?.pane) setPane(args.pane);
  }

  const current = PANES.find((p) => p.id === pane)!;

  return (
    <div ref={ref} className="flex h-full">
      {!narrow && (
        <aside className="mac-sidebar m-2 mr-0 flex w-[210px] shrink-0 flex-col overflow-hidden">
          <div data-drag className="h-[46px] shrink-0" />
          <div className="px-2.5">
            <label className="field mb-3 flex items-center gap-1.5 !py-[5px]">
              <Search size={13} className="text-label-3" />
              <span className="text-[12.5px] text-label-3">Search</span>
            </label>
            <button type="button" onClick={() => os.openApp("about")} className="side-item !h-auto gap-2.5 !py-1.5">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image src="/images/profilePic.jpg" alt="" fill sizes="72px" className="object-cover" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[13px] font-semibold">Suvesh Pandey</span>
                <span className="block truncate text-[11px] text-label-3">Portfolio Account</span>
              </span>
            </button>
            <div className="my-2 h-px" />
            {PANES.map((p) => (
              <button key={p.id} type="button" className="side-item" data-selected={pane === p.id} onClick={() => setPane(p.id)}>
                <span className="grid h-5 w-5 place-items-center rounded-[6px] text-white" style={{ background: p.color }}>
                  {p.icon}
                </span>
                {p.name}
              </button>
            ))}
          </div>
        </aside>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div data-drag className={`flex h-[52px] shrink-0 items-center gap-2 pr-4 ${narrow ? "pl-[88px]" : "pl-5"}`}>
          {narrow ? (
            <select
              value={pane}
              onChange={(e) => setPane(e.target.value as Pane)}
              aria-label="Settings pane"
              className="tool-capsule px-3 text-[13px] font-semibold text-label outline-none"
            >
              {PANES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          ) : (
            <h2 className="text-[15px] font-bold text-label">{current.name}</h2>
          )}
        </div>

        <div className="mac-scroll flex-1 px-5 pb-6">
          {pane === "appearance" && (
            <div className="flex flex-col gap-5">
              <div className="group-box">
                <div className="group-row px-4 py-3">
                  <p className="mb-3 text-[13px] text-label">Appearance</p>
                  <div className="flex gap-4">
                    {(["auto", "light", "dark"] as ThemeMode[]).map((m) => (
                      <button key={m} type="button" onClick={() => os.setThemeMode(m)} className="flex flex-col items-center gap-1.5">
                        <span
                          className={`block h-[52px] w-[76px] overflow-hidden rounded-[8px] ring-[0.5px] ring-black/20 ${
                            os.themeMode === m ? "outline outline-[3px] outline-offset-2 outline-[var(--accent)]" : ""
                          }`}
                        >
                          <AppearanceThumb mode={m} />
                        </span>
                        <span className={`text-[12px] capitalize ${os.themeMode === m ? "font-semibold text-label" : "text-label-2"}`}>{m}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Row label="Accent color" sub={ACCENTS[os.accent].name}>
                  <div className="flex gap-[7px]">
                    {(Object.keys(ACCENTS) as AccentId[]).map((a) => (
                      <button
                        key={a}
                        type="button"
                        aria-label={ACCENTS[a].name}
                        onClick={() => os.setAccent(a)}
                        className="grid h-[17px] w-[17px] place-items-center rounded-full shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.2)]"
                        style={{ background: ACCENTS[a][os.isDark ? "dark" : "light"] }}
                      >
                        {os.accent === a && <span className="h-[6px] w-[6px] rounded-full bg-white" />}
                      </button>
                    ))}
                  </div>
                </Row>
              </div>
              <p className="px-1 text-[11.5px] leading-relaxed text-label-3">
                Auto follows your system setting. Wallpaper set to Dynamic switches between Horizon and Silk with it.
              </p>
            </div>
          )}

          {pane === "wallpaper" && (
            <div className="flex flex-col gap-5">
              <div className="group-box flex items-center gap-4 p-3">
                <div className="h-[92px] w-[150px] shrink-0 overflow-hidden rounded-[8px] ring-[0.5px] ring-black/20">
                  <WallpaperThumb variant={os.wallpaperVariant} />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-label">
                    {os.wallpaper === "dynamic" ? "Flow Dynamic" : WALLPAPERS.find((w) => w.id === os.wallpaper)?.name}
                  </p>
                  <p className="text-[12px] text-label-3">
                    {os.wallpaper === "dynamic"
                      ? "Changes with light and dark appearance"
                      : WALLPAPERS.find((w) => w.id === os.wallpaper)?.caption}
                  </p>
                </div>
              </div>
              {(["Flow", "Golden Gate"] as const).map((group) => (
              <div key={group}>
                <p className="mb-2 px-1 text-[12px] font-semibold text-label-3">{group}</p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
                  {(
                    [...(group === "Flow" ? [{ id: "dynamic", name: "Dynamic" }] : []), ...WALLPAPERS.filter((w) => w.group === group)] as {
                      id: WallpaperChoice;
                      name: string;
                    }[]
                  ).map((w) => {
                    const sel = os.wallpaper === w.id;
                    return (
                      <button key={w.id} type="button" onClick={() => os.setWallpaper(w.id)} className="flex flex-col gap-1.5 text-left">
                        <span
                          className={`relative block aspect-[16/10] w-full overflow-hidden rounded-[8px] ring-[0.5px] ring-black/20 ${
                            sel ? "outline outline-[3px] outline-offset-2 outline-[var(--accent)]" : ""
                          }`}
                        >
                          {w.id === "dynamic" ? (
                            <>
                              <WallpaperThumb variant="horizon" />
                              <span className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]">
                                <WallpaperThumb variant="silk" />
                              </span>
                            </>
                          ) : (
                            <WallpaperThumb variant={w.id} />
                          )}
                          {sel && (
                            <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[var(--accent)] text-white">
                              <Check size={10} strokeWidth={3} />
                            </span>
                          )}
                        </span>
                        <span className="px-0.5 text-[12px] text-label">{w.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              ))}
            </div>
          )}

          {pane === "displays" && (
            <div className="group-box">
              <Row label="Brightness" sub="Dims the whole desktop">
                <input
                  type="range"
                  min={0.35}
                  max={1}
                  step={0.01}
                  value={os.brightness}
                  onChange={(e) => os.setBrightness(Number(e.target.value))}
                  aria-label="Brightness"
                  className="w-[180px] accent-[var(--accent)]"
                />
              </Row>
              <Row label="Resolution" sub="Looks like">
                <span className="text-[13px] text-label-2">
                  {os.viewport.w} × {os.viewport.h}
                </span>
              </Row>
            </div>
          )}

          {pane === "about" && (
            <div className="flex flex-col items-center pt-4 text-center">
              <div className="drop-shadow-lg">
                <SuveshBadge size={84} />
              </div>
              <h3 className="mt-4 text-[22px] font-bold tracking-tight text-label">macOS Golden Gate</h3>
              <p className="text-[12.5px] text-label-2">Version 27.0 · Portfolio Edition</p>
              <div className="group-box mt-5 w-full max-w-[420px] text-left">
                <Row label="Designed & built by">
                  <span className="text-[13px] text-label-2">Suvesh Pandey</span>
                </Row>
                <Row label="Framework">
                  <span className="text-[13px] text-label-2">Next.js 16 · React 19</span>
                </Row>
                <Row label="Styling">
                  <span className="text-[13px] text-label-2">Tailwind CSS 4</span>
                </Row>
                <Row label="Motion">
                  <span className="text-[13px] text-label-2">Motion for React</span>
                </Row>
              </div>
              <p className="mt-4 max-w-[380px] text-[11px] leading-relaxed text-label-3">
                An homage to macOS, made for fun. Not affiliated with Apple Inc.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
