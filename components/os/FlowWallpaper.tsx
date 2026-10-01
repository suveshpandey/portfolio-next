"use client";

import { useId } from "react";

export type FlowVariant = "horizon" | "midnight";

type Band = {
  /** Top edge of the band, left → right, in a 1600×1000 space */
  crest: string;
  stops: string[];
  opacity: number;
  /** drift animation name + duration (s) */
  drift: string;
  dur: number;
};

type Palette = {
  sky: string[];
  glow: { x: string; y: string; color: string; opacity: number };
  top: { stops: string[]; opacity: number };
  bands: Band[];
  shadow: number;
  rim: number;
  grain: number;
  /** strength of the darkening toward each band's lower edge */
  shade: number;
};

// Diagonal sweeps (lower-left → upper-right) with varied curvature, so the layers read
// as folds of one fabric rather than parallel stripes.
const CRESTS = [
  "M-100 520C150 380 420 330 700 380C980 430 1220 300 1700 110",
  "M-100 700C230 610 480 520 790 565C1090 610 1330 470 1700 330",
  "M-100 870C270 790 570 705 890 745C1190 782 1430 690 1700 610",
];
const TOP_EDGE = "M1700 60C1400 185 1100 95 800 175C520 250 240 205 -100 305";

const PALETTES: Record<FlowVariant, Palette> = {
  horizon: {
    sky: ["#eef2ff", "#f6ecf6", "#fdeee4"],
    glow: { x: "24%", y: "16%", color: "#ffffff", opacity: 0.95 },
    top: { stops: ["#d5e2ff", "#e6d8ff", "#ffdcec"], opacity: 0.92 },
    bands: [
      { crest: CRESTS[0], stops: ["#c2d3ff", "#dcc6ff", "#ffcfe2"], opacity: 1, drift: "wp-drift-a", dur: 46 },
      { crest: CRESTS[1], stops: ["#8db0ff", "#a494ff", "#e49cf6"], opacity: 0.95, drift: "wp-drift-b", dur: 58 },
      { crest: CRESTS[2], stops: ["#ffa290", "#ffbd92", "#ffdeb2"], opacity: 0.97, drift: "wp-drift-c", dur: 52 },
    ],
    shadow: 0.11,
    rim: 0.75,
    grain: 0.06,
    shade: 0.04,
  },
  midnight: {
    sky: ["#060918", "#0c1231", "#171239"],
    glow: { x: "78%", y: "24%", color: "#5b6cff", opacity: 0.35 },
    top: { stops: ["#152463", "#231a58", "#301a52"], opacity: 0.9 },
    bands: [
      { crest: CRESTS[0], stops: ["#1f2d6e", "#35297f", "#512874"], opacity: 0.95, drift: "wp-drift-a", dur: 46 },
      { crest: CRESTS[1], stops: ["#1b58a8", "#3a4cd0", "#7440bf"], opacity: 0.92, drift: "wp-drift-b", dur: 58 },
      { crest: CRESTS[2], stops: ["#c95a8f", "#8249d2", "#3264d6"], opacity: 0.9, drift: "wp-drift-c", dur: 52 },
    ],
    shadow: 0.5,
    rim: 0.28,
    grain: 0.09,
    shade: 0.14,
  },
};

const VB = "0 0 1600 1000";

function Grad({ id, stops, vertical }: { id: string; stops: string[]; vertical?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0.35"}>
      {stops.map((c, i) => (
        <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />
      ))}
    </linearGradient>
  );
}

/** One full-bleed layer. Oversized so its slow drift never exposes an edge. */
function Layer({ children, drift, dur, static: isStatic }: { children: React.ReactNode; drift?: string; dur?: number; static?: boolean }) {
  return (
    <svg
      viewBox={VB}
      preserveAspectRatio="xMidYMid slice"
      className="absolute -inset-[5%] h-[110%] w-[110%]"
      style={
        isStatic
          ? undefined
          : { animation: `${drift} ${dur}s ease-in-out infinite alternate`, willChange: "transform" }
      }
      aria-hidden
    >
      {children}
    </svg>
  );
}

export default function FlowWallpaper({ variant, animate = true }: { variant: FlowVariant; animate?: boolean }) {
  const p = PALETTES[variant];
  const u = useId().replace(/:/g, "");

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* sky + ambient glow */}
      <Layer static>
        <defs>
          <Grad id={`sky${u}`} stops={p.sky} vertical />
          <radialGradient id={`glow${u}`} cx={p.glow.x} cy={p.glow.y} r="55%">
            <stop offset="0" stopColor={p.glow.color} stopOpacity={p.glow.opacity} />
            <stop offset="1" stopColor={p.glow.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="1000" fill={`url(#sky${u})`} />
        <rect width="1600" height="1000" fill={`url(#glow${u})`} />
      </Layer>

      {/* ribbon falling from the top edge */}
      <Layer drift="wp-drift-top" dur={60} static={!animate}>
        <defs>
          <Grad id={`top${u}`} stops={p.top.stops} />
          <filter id={`tsh${u}`} x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="24" floodColor={variant === "horizon" ? "#7a6aa8" : "#000"} floodOpacity={p.shadow * 0.6} />
          </filter>
          <filter id={`soft${u}`}>
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <path d={`M-100 -100H1700V60${TOP_EDGE.slice(TOP_EDGE.indexOf("C"))}Z`} fill={`url(#top${u})`} opacity={p.top.opacity} filter={`url(#tsh${u})`} />
        <path d={TOP_EDGE} fill="none" stroke="#fff" strokeOpacity={p.rim * 0.8} strokeWidth="2" filter={`url(#soft${u})`} />
      </Layer>

      {/* flowing bands, back to front; each casts a soft shadow onto the one behind */}
      {p.bands.map((b, i) => (
        <Layer key={i} drift={b.drift} dur={b.dur} static={!animate}>
          <defs>
            <Grad id={`b${u}${i}`} stops={b.stops} />
            <linearGradient id={`shade${u}${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
              <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity={p.shade} />
            </linearGradient>
            <filter id={`sh${u}${i}`} x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="-12" stdDeviation="26" floodColor={variant === "horizon" ? "#6d5fa3" : "#000"} floodOpacity={p.shadow} />
            </filter>
            <filter id={`rim${u}${i}`}>
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>
          <g opacity={b.opacity}>
            <path d={`${b.crest}L1700 1100L-100 1100Z`} fill={`url(#b${u}${i})`} filter={`url(#sh${u}${i})`} />
            <path d={`${b.crest}L1700 1100L-100 1100Z`} fill={`url(#shade${u}${i})`} />
          </g>
          <path d={b.crest} fill="none" stroke="#fff" strokeOpacity={p.rim} strokeWidth="2.2" filter={`url(#rim${u}${i})`} />
        </Layer>
      ))}

      {/* film grain keeps large gradients from banding and adds a printed, premium feel */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity: p.grain * 3 }} aria-hidden>
        <filter id={`grain${u}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${u})`} />
      </svg>
    </div>
  );
}

export const FLOW_KEYFRAMES = `
  @keyframes wp-drift-top { from { transform: translate3d(0,0,0) } to { transform: translate3d(-1.6%, 1.2%, 0) } }
  @keyframes wp-drift-a { from { transform: translate3d(0,0,0) scale(1) } to { transform: translate3d(1.8%, -1.4%, 0) scale(1.03) } }
  @keyframes wp-drift-b { from { transform: translate3d(0,0,0) scale(1.02) } to { transform: translate3d(-2%, -0.8%, 0) scale(1) } }
  @keyframes wp-drift-c { from { transform: translate3d(0,0,0) } to { transform: translate3d(1.4%, -1.8%, 0) scale(1.025) } }
`;
