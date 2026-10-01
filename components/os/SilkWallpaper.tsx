"use client";

import { useId } from "react";

/**
 * "Silk" — tall indigo folds lit along their edges, like fabric catching a rim light.
 * Every fold is a sheet bounded by one S-curve. Sheets stack left → right; each one:
 *   1. is filled with a gradient that is brightest right at its edge,
 *   2. carries a wide, blurred inner glow hugging that edge (clipped to the sheet),
 *   3. casts a soft shadow leftwards onto the fold behind it,
 *   4. gets a thin lavender rim highlight on the edge itself.
 */

type Fold = {
  edge: string;
  /** how the sheet closes from the end of its edge back to the start (which side it fills) */
  close: string;
  /** gradient from the lit edge → the far side */
  fill: [string, string];
  glow: string;
  glowOpacity: number;
  rim: number;
  /** direction the fold's shadow falls onto the one behind */
  shadow: [number, number];
  drift: string;
  dur: number;
};

// Folds cross and overlap at different angles (like draped fabric) instead of marching in step.
const FOLDS: Fold[] = [
  {
    // broad back fold sweeping off the left edge
    edge: "M470 -80C455 130 330 300 120 420C20 478 -60 520 -120 560",
    close: "L-120 1080L1720 1080L1720 -80Z",
    fill: ["#2c2b5a", "#16172f"],
    glow: "#8a86e6",
    glowOpacity: 0.3,
    rim: 0.6,
    shadow: [-10, -14],
    drift: "silk-a",
    dur: 64,
  },
  {
    // tall S through the middle
    edge: "M760 -80C790 110 690 230 640 330C565 475 690 650 1070 1080",
    close: "L1720 1080L1720 -80Z",
    fill: ["#33326a", "#191a37"],
    glow: "#948ff2",
    glowOpacity: 0.34,
    rim: 0.75,
    shadow: [-18, 4],
    drift: "silk-b",
    dur: 72,
  },
  {
    // crosses back over the S, falling to the lower left
    edge: "M1060 -80C1005 200 1130 380 1015 600C945 735 830 880 790 1080",
    close: "L1720 1080L1720 -80Z",
    fill: ["#3a3a74", "#1c1d40"],
    glow: "#a09cf6",
    glowOpacity: 0.36,
    rim: 0.85,
    shadow: [-18, 0],
    drift: "silk-c",
    dur: 58,
  },
  {
    // the lighter slate fold on the right
    edge: "M1410 -80C1335 180 1475 345 1425 565C1385 745 1305 905 1255 1080",
    close: "L1720 1080L1720 -80Z",
    fill: ["#5a6592", "#2f3762"],
    glow: "#bcc1f7",
    glowOpacity: 0.32,
    rim: 0.8,
    shadow: [-16, 0],
    drift: "silk-d",
    dur: 68,
  },
];

// huge fixed filter region so blurs and shadows are never clipped to a path's bounding box
const REGION = { filterUnits: "userSpaceOnUse", x: -300, y: -300, width: 2200, height: 1600 } as const;

export default function SilkWallpaper({ animate = true }: { animate?: boolean }) {
  const u = useId().replace(/:/g, "");

  const layerStyle = (f?: Fold) =>
    animate && f ? { animation: `${f.drift} ${f.dur}s ease-in-out infinite alternate`, willChange: "transform" } : undefined;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#121329]">
      {/* backdrop: deep indigo with a cool lift toward the right */}
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute -inset-[5%] h-[110%] w-[110%]" aria-hidden>
        <defs>
          <linearGradient id={`bg${u}`} x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0" stopColor="#1d1c3d" />
            <stop offset="0.55" stopColor="#15162f" />
            <stop offset="1" stopColor="#1f2446" />
          </linearGradient>
        </defs>
        <rect x="-100" y="-100" width="1800" height="1200" fill={`url(#bg${u})`} />
      </svg>

      {FOLDS.map((f, i) => {
        const sheet = `${f.edge}${f.close}`;
        return (
          <svg
            key={i}
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
            className="absolute -inset-[5%] h-[110%] w-[110%]"
            style={layerStyle(f)}
            aria-hidden
          >
            <defs>
              {/* objectBoundingBox: x=0 is the leftmost point of the sheet, i.e. near the lit edge */}
              <linearGradient id={`f${u}${i}`} x1="0" y1="0.2" x2="0.55" y2="0.5">
                <stop offset="0" stopColor={f.fill[0]} />
                <stop offset="1" stopColor={f.fill[1]} />
              </linearGradient>
              <clipPath id={`c${u}${i}`}>
                <path d={sheet} />
              </clipPath>
              <filter id={`s${u}${i}`} {...REGION}>
                <feDropShadow dx={f.shadow[0]} dy={f.shadow[1]} stdDeviation="36" floodColor="#05060f" floodOpacity="0.8" />
              </filter>
              <filter id={`g${u}${i}`} {...REGION}>
                <feGaussianBlur stdDeviation="48" />
              </filter>
              <filter id={`h${u}${i}`} {...REGION}>
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <filter id={`r${u}${i}`} {...REGION}>
                <feGaussianBlur stdDeviation="0.55" />
              </filter>
              <linearGradient id={`rg${u}${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c9c7ff" stopOpacity="0.35" />
                <stop offset="0.45" stopColor="#c9c7ff" stopOpacity="1" />
                <stop offset="1" stopColor="#c9c7ff" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            <path d={sheet} fill={`url(#f${u}${i})`} filter={`url(#s${u}${i})`} />
            {/* inner glow hugging the edge */}
            <g clipPath={`url(#c${u}${i})`}>
              <path d={f.edge} fill="none" stroke={f.glow} strokeOpacity={f.glowOpacity} strokeWidth="170" filter={`url(#g${u}${i})`} />
              <path d={f.edge} fill="none" stroke={f.glow} strokeOpacity={f.glowOpacity * 0.8} strokeWidth="34" filter={`url(#h${u}${i})`} />
            </g>
            {/* crisp rim light */}
            <path d={f.edge} fill="none" stroke={`url(#rg${u}${i})`} strokeOpacity={Math.min(1, f.rim * 1.15)} strokeWidth="1.9" filter={`url(#r${u}${i})`} />
          </svg>
        );
      })}

      {/* vignette + grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 55% 45%, transparent 55%, rgb(4 5 14 / 0.55) 100%)" }}
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay opacity-[0.22]" aria-hidden>
        <filter id={`n${u}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#n${u})`} />
      </svg>
    </div>
  );
}

export const SILK_KEYFRAMES = `
  @keyframes silk-a { from { transform: translate3d(0,0,0) } to { transform: translate3d(1.2%, -0.8%, 0) scale(1.02) } }
  @keyframes silk-b { from { transform: translate3d(0,0,0) scale(1.015) } to { transform: translate3d(-1.4%, 0.6%, 0) } }
  @keyframes silk-c { from { transform: translate3d(0,0,0) } to { transform: translate3d(1.1%, 0.9%, 0) scale(1.02) } }
  @keyframes silk-d { from { transform: translate3d(0,0,0) scale(1.02) } to { transform: translate3d(-1%, -0.7%, 0) } }
`;
