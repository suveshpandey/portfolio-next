"use client";

import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

import FlowWallpaper, { FLOW_KEYFRAMES, type FlowVariant } from "./FlowWallpaper";
import SilkWallpaper, { SILK_KEYFRAMES } from "./SilkWallpaper";

type BridgeVariant = "dusk" | "day" | "night";
export type WallpaperVariant = FlowVariant | BridgeVariant | "silk";

const isFlow = (v: WallpaperVariant): v is FlowVariant => v === "horizon" || v === "midnight";

type Palette = {
  sky: [number, string][];
  sunOn: boolean;
  sun: { x: number; y: number; r: number; core: string; glow: string };
  cloud: string;
  cloudOpacity: number;
  farHills: string;
  headland: string;
  city: string;
  fog: string;
  fogOpacity: number;
  water: [number, string][];
  bridge: string;
  bridgeShade: string;
  lights: boolean;
  shimmer: string;
  foreground: string;
};

const PALETTES: Record<BridgeVariant, Palette> = {
  dusk: {
    sky: [
      [0, "#18203f"],
      [0.22, "#353a72"],
      [0.42, "#7a4f86"],
      [0.58, "#c96a7a"],
      [0.72, "#f08b62"],
      [0.86, "#ffbe72"],
      [1, "#ffe3a3"],
    ],
    sunOn: true,
    sun: { x: 1015, y: 575, r: 46, core: "#fff6d6", glow: "#ffb561" },
    cloud: "#ffb7a1",
    cloudOpacity: 0.38,
    farHills: "#7d5486",
    headland: "#3a2550",
    city: "#4a2c55",
    fog: "#ffd8bd",
    fogOpacity: 0.5,
    water: [
      [0, "#f6ad73"],
      [0.25, "#c77579"],
      [0.6, "#5b3e6c"],
      [1, "#1a1834"],
    ],
    bridge: "#5b1d27",
    bridgeShade: "#3a1320",
    lights: false,
    shimmer: "#ffe1a8",
    foreground: "#1d1228",
  },
  day: {
    sky: [
      [0, "#2c68b8"],
      [0.3, "#5a97d8"],
      [0.6, "#9dc6ec"],
      [0.85, "#d6e8f4"],
      [1, "#eef3f4"],
    ],
    sunOn: true,
    sun: { x: 1330, y: 170, r: 22, core: "#fffdf3", glow: "#fff6dc" },
    cloud: "#ffffff",
    cloudOpacity: 0.55,
    farHills: "#8aa0ae",
    headland: "#4d6a5c",
    city: "#8195a6",
    fog: "#ffffff",
    fogOpacity: 0.78,
    water: [
      [0, "#a9c7d8"],
      [0.3, "#6d98b4"],
      [0.7, "#2f5e80"],
      [1, "#173650"],
    ],
    bridge: "#c8412c",
    bridgeShade: "#96301f",
    lights: false,
    shimmer: "#ffffff",
    foreground: "#2d3f36",
  },
  night: {
    sky: [
      [0, "#01020a"],
      [0.3, "#070d28"],
      [0.58, "#131a4a"],
      [0.8, "#2a2462"],
      [0.93, "#4b3072"],
      [1, "#7c4a7a"],
    ],
    sunOn: true,
    sun: { x: 1265, y: 150, r: 24, core: "#f6f3e8", glow: "#9fb0ff" },
    cloud: "#4e548f",
    cloudOpacity: 0.26,
    farHills: "#1b1c3e",
    headland: "#0c0b1d",
    city: "#11112a",
    fog: "#7478b8",
    fogOpacity: 0.2,
    water: [
      [0, "#3a2f66"],
      [0.22, "#1a1b40"],
      [0.6, "#0b0c22"],
      [1, "#03040c"],
    ],
    bridge: "#2a1420",
    bridgeShade: "#170a12",
    lights: true,
    shimmer: "#ffcf7a",
    foreground: "#05050c",
  },
};

// Geometry (viewBox 1600 × 1000)
const DECK = 600;
const WATER = 642;
const TOWERS = [560, 1140];
const TOP = 250;
const MAIN = { p0: [560, 258], c: [850, 930], p2: [1140, 258] } as const;
const SIDE_L = { p0: [560, 258], c: [320, 478], p2: [-60, 592] } as const;
const SIDE_R = { p0: [1140, 258], c: [1380, 478], p2: [1660, 592] } as const;

type Quad = { p0: readonly number[]; c: readonly number[]; p2: readonly number[] };
const qPoint = (q: Quad, t: number) => {
  const u = 1 - t;
  return [
    u * u * q.p0[0] + 2 * u * t * q.c[0] + t * t * q.p2[0],
    u * u * q.p0[1] + 2 * u * t * q.c[1] + t * t * q.p2[1],
  ];
};
const qPath = (q: Quad) => `M ${q.p0[0]} ${q.p0[1]} Q ${q.c[0]} ${q.c[1]} ${q.p2[0]} ${q.p2[1]}`;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useGeometry() {
  return useMemo(() => {
    const suspenders: number[][] = [];
    const addSpan = (q: Quad, n: number) => {
      for (let i = 1; i < n; i++) {
        const [x, y] = qPoint(q, i / n);
        if (y < DECK - 2 && x > -40 && x < 1640) suspenders.push([x, y]);
      }
    };
    addSpan(MAIN, 46);
    addSpan(SIDE_L, 26);
    addSpan(SIDE_R, 26);

    const rand = mulberry32(27);
    const stars = Array.from({ length: 170 }, () => ({
      x: rand() * 1600,
      y: rand() * 560,
      r: rand() * 1.3 + 0.3,
      o: rand() * 0.7 + 0.3,
      tw: rand() > 0.82,
      d: rand() * 4,
    }));
    const shimmer = Array.from({ length: 70 }, () => ({
      x: rand() * 1600,
      y: WATER + 8 + Math.pow(rand(), 1.6) * 330,
      w: rand() * 60 + 12,
      o: rand() * 0.35 + 0.08,
    }));
    const buildings: { x: number; w: number; h: number; lit: number[][] }[] = [];
    let bx = 1250;
    while (bx < 1620) {
      const w = 8 + rand() * 16;
      const h = 8 + Math.pow(rand(), 2) * (bx > 1420 && bx < 1520 ? 70 : 34);
      const lit: number[][] = [];
      for (let yy = 3; yy < h - 2; yy += 4)
        for (let xx = 2; xx < w - 2; xx += 4) if (rand() > 0.55) lit.push([xx, yy]);
      buildings.push({ x: bx, w, h, lit });
      bx += w + rand() * 3;
    }
    const deckLights = Array.from({ length: 64 }, (_, i) => -30 + i * 26);
    const bigStars = Array.from({ length: 9 }, () => ({
      x: rand() * 1600,
      y: rand() * 420,
      r: rand() * 0.8 + 1.5,
    }));
    // warm columns of light falling from the deck lamps and the city onto the water
    const reflections = [
      ...deckLights.filter((_, i) => i % 2 === 0).map((x) => ({ x, len: 60 + rand() * 90, o: 0.1 + rand() * 0.16, w: 2.6 })),
      ...Array.from({ length: 14 }, () => ({ x: 1240 + rand() * 380, len: 40 + rand() * 120, o: 0.06 + rand() * 0.12, w: 2 })),
    ];
    return { suspenders, stars, shimmer, buildings, deckLights, bigStars, reflections };
  }, []);
}

function Bridge({ p, g, id }: { p: Palette; g: ReturnType<typeof useGeometry>; id: string }) {
  return (
    <g>
      {/* approach piers */}
      {[...Array(9)].map((_, i) => {
        const x = 40 + i * 58;
        return <rect key={`pl${i}`} x={x} y={DECK + 12} width={7} height={WATER - DECK - 8} fill={p.bridgeShade} />;
      })}
      {[...Array(8)].map((_, i) => {
        const x = 1200 + i * 58;
        return <rect key={`pr${i}`} x={x} y={DECK + 12} width={7} height={WATER - DECK - 8} fill={p.bridgeShade} />;
      })}

      {/* suspenders */}
      <g stroke={p.bridge} strokeWidth={1.1} opacity={0.9}>
        {g.suspenders.map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={x} y2={DECK} />
        ))}
      </g>

      {/* main cables */}
      <g fill="none" stroke={p.bridge} strokeWidth={4.2} strokeLinecap="round">
        <path d={qPath(MAIN)} />
        <path d={qPath(SIDE_L)} />
        <path d={qPath(SIDE_R)} />
      </g>

      {/* deck + truss */}
      <rect x={-60} y={DECK} width={1720} height={9} fill={p.bridge} />
      <rect x={-60} y={DECK + 9} width={1720} height={6} fill={p.bridgeShade} />
      <g stroke={p.bridgeShade} strokeWidth={1}>
        {[...Array(110)].map((_, i) => (
          <line key={i} x1={-60 + i * 16} y1={DECK + 9} x2={-52 + i * 16} y2={DECK + 15} />
        ))}
      </g>

      {/* towers */}
      {TOWERS.map((cx) => (
        <g key={cx}>
          {/* legs, slightly flared toward the base */}
          <path
            d={`M ${cx - 30} ${WATER + 6} L ${cx - 25} ${TOP} L ${cx - 12} ${TOP} L ${cx - 13} ${WATER + 6} Z`}
            fill={p.bridge}
          />
          <path
            d={`M ${cx + 13} ${WATER + 6} L ${cx + 12} ${TOP} L ${cx + 25} ${TOP} L ${cx + 30} ${WATER + 6} Z`}
            fill={p.bridge}
          />
          {/* shading on the right face of each leg */}
          <path d={`M ${cx - 16} ${WATER + 6} L ${cx - 15.5} ${TOP} L ${cx - 12} ${TOP} L ${cx - 13} ${WATER + 6} Z`} fill={p.bridgeShade} />
          <path d={`M ${cx + 26} ${WATER + 6} L ${cx + 22} ${TOP} L ${cx + 25} ${TOP} L ${cx + 30} ${WATER + 6} Z`} fill={p.bridgeShade} />
          {/* stepped art-deco caps */}
          <rect x={cx - 27} y={TOP - 7} width={54} height={9} rx={1.5} fill={p.bridge} />
          <rect x={cx - 22} y={TOP - 13} width={44} height={7} rx={1.5} fill={p.bridge} />
          {/* portal struts */}
          {[300, 372, 444, 516, 626].map((y) => (
            <g key={y}>
              <rect x={cx - 13} y={y} width={26} height={10} fill={p.bridge} />
              <rect x={cx - 13} y={y + 7} width={26} height={3} fill={p.bridgeShade} />
            </g>
          ))}
          {/* pier base */}
          <rect x={cx - 40} y={WATER - 4} width={80} height={12} rx={2} fill={p.bridgeShade} />
          {p.lights && (
            <>
              <circle cx={cx} cy={TOP - 16} r={3.2} fill="#ff4d4d" className="wp-blink" />
              <circle cx={cx} cy={TOP - 16} r={9} fill="#ff4d4d" opacity={0.25} className="wp-blink" />
            </>
          )}
        </g>
      ))}

      {p.lights && (
        <>
          {/* soft halos first, then the crisp filaments on top */}
          <g filter={`url(#${id}-lamp)`} opacity="0.85">
            {g.deckLights.map((x) => (
              <circle key={x} cx={x} cy={DECK - 2} r={3.4} fill="#ffc373" />
            ))}
            {g.suspenders
              .filter((_, i) => i % 3 === 0)
              .map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={2.2} fill="#ffb865" />
              ))}
          </g>
          <g>
            {g.deckLights.map((x) => (
              <circle key={x} cx={x} cy={DECK - 2} r={1.5} fill="#fff1d4" />
            ))}
            {g.suspenders
              .filter((_, i) => i % 3 === 0)
              .map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={1.05} fill="#ffe1ad" opacity={0.9} />
              ))}
          </g>
        </>
      )}
    </g>
  );
}

function Scene({ variant }: { variant: BridgeVariant }) {
  const p = PALETTES[variant];
  const g = useGeometry();
  const id = `wp-${variant}`;

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2={WATER} gradientUnits="userSpaceOnUse">
          {p.sky.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1={WATER} x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          {p.water.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor={p.sun.glow} stopOpacity={variant === "night" ? 0.35 : 0.9} />
          <stop offset="0.35" stopColor={p.sun.glow} stopOpacity={variant === "night" ? 0.12 : 0.35} />
          <stop offset="1" stopColor={p.sun.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-cityglow`} cx="0.5" cy="1" r="0.8">
          <stop offset="0" stopColor="#ff9d5c" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur-lg`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={`${id}-blur-md`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={`${id}-blur-sm`}>
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={`${id}-lamp`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="2000" height="1400">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <linearGradient id={`${id}-reflect`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-galaxy`}>
          <stop offset="0" stopColor="#8f9ae8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8f9ae8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-moon`} cx="0.38" cy="0.34" r="0.78">
          <stop offset="0" stopColor="#fffdf4" />
          <stop offset="0.65" stopColor="#efeadb" />
          <stop offset="1" stopColor="#cfc9b6" />
        </radialGradient>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0.45" stopColor="#dfe4ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#dfe4ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-waterclip`}>
          <rect x="0" y={WATER} width="1600" height={1000 - WATER} />
        </clipPath>
      </defs>

      {/* sky */}
      <rect width="1600" height={WATER + 4} fill={`url(#${id}-sky)`} />

      {/* a faint galactic band sweeping across the sky */}
      {variant === "night" && (
        <g opacity="0.55" filter={`url(#${id}-blur-lg)`}>
          <ellipse cx="520" cy="230" rx="560" ry="86" fill={`url(#${id}-galaxy)`} transform="rotate(-24 520 230)" />
          <ellipse cx="1180" cy="120" rx="420" ry="60" fill={`url(#${id}-galaxy)`} transform="rotate(-18 1180 120)" opacity="0.7" />
        </g>
      )}

      {/* stars */}
      {variant === "night" &&
        g.stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#fff"
            opacity={s.o * (1 - s.y / 700)}
            className={s.tw ? "wp-twinkle" : undefined}
            style={s.tw ? { animationDelay: `${s.d}s` } : undefined}
          />
        ))}

      {/* a handful of brighter stars catch a flare */}
      {variant === "night" &&
        g.bigStars.map((s, i) => (
          <g key={`b${i}`} opacity={0.9}>
            <circle cx={s.x} cy={s.y} r={s.r * 2.6} fill="#cdd6ff" opacity="0.18" filter={`url(#${id}-blur-sm)`} />
            <circle cx={s.x} cy={s.y} r={s.r} fill="#fff" />
            <path
              d={`M${s.x - s.r * 5} ${s.y}H${s.x + s.r * 5}M${s.x} ${s.y - s.r * 5}V${s.y + s.r * 5}`}
              stroke="#fff"
              strokeOpacity="0.28"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </g>
        ))}

      {/* sun / moon glow */}
      {p.sunOn && (
        <>
          <circle cx={p.sun.x} cy={p.sun.y} r={p.sun.r * 9} fill={`url(#${id}-sun)`} />
          <circle cx={p.sun.x} cy={p.sun.y} r={p.sun.r} fill={p.sun.core} opacity={variant === "day" ? 0.75 : 1} filter={variant === "day" ? `url(#${id}-blur-sm)` : undefined} />
          {variant === "night" && (
            <>
              <circle cx={p.sun.x} cy={p.sun.y} r={p.sun.r * 2.9} fill={`url(#${id}-halo)`} opacity="0.45" />
              {/* full moon: gentle limb shading plus a few maria */}
              <circle cx={p.sun.x} cy={p.sun.y} r={p.sun.r} fill={`url(#${id}-moon)`} />
              <g fill="#cbc6b6" opacity="0.38">
                <circle cx={p.sun.x - 8.5} cy={p.sun.y - 3} r="4.6" />
                <circle cx={p.sun.x + 2} cy={p.sun.y - 11} r="2.6" />
                <circle cx={p.sun.x + 8} cy={p.sun.y + 2} r="3.2" />
                <circle cx={p.sun.x - 3} cy={p.sun.y + 10} r="2.1" />
                <circle cx={p.sun.x - 12} cy={p.sun.y + 8} r="1.5" />
              </g>
            </>
          )}
        </>
      )}

      {/* cloud streaks */}
      <g fill={p.cloud} opacity={p.cloudOpacity} filter={`url(#${id}-blur-md)`}>
        <ellipse cx="300" cy="250" rx="260" ry="14" />
        <ellipse cx="760" cy="180" rx="330" ry="11" />
        <ellipse cx="1220" cy="300" rx="300" ry="16" />
        <ellipse cx="1450" cy="410" rx="220" ry="10" />
        <ellipse cx="520" cy="420" rx="240" ry="9" />
      </g>

      {/* distant range */}
      <path
        d="M -20 646 L -20 598 C 140 575 300 600 470 592 C 640 584 780 606 980 598 C 1160 590 1300 610 1460 596 C 1540 590 1590 596 1620 600 L 1620 646 Z"
        fill={p.farHills}
        opacity={0.8}
      />

      {/* San Francisco skyline (right shore) */}
      {variant === "night" && <ellipse cx="1440" cy="620" rx="260" ry="90" fill={`url(#${id}-cityglow)`} />}
      <g>
        {g.buildings.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${618 - b.h})`}>
            <rect width={b.w} height={b.h + 6} fill={p.city} />
            {variant === "night" &&
              b.lit.map(([x, y], j) => <rect key={j} x={x} y={y} width={1.6} height={1.6} fill="#ffd28a" opacity={0.85} />)}
          </g>
        ))}
      </g>
      <path
        d="M 1170 646 C 1250 628 1330 616 1440 614 C 1520 612 1580 616 1620 618 L 1620 646 Z"
        fill={p.headland}
        opacity={0.92}
      />

      {/* Marin Headlands (left) */}
      <path
        d="M -20 646 L -20 470 C 60 440 150 408 250 432 C 330 452 390 500 450 560 C 490 600 520 628 560 646 Z"
        fill={p.headland}
      />
      <path
        d="M -20 646 L -20 540 C 90 512 180 520 260 560 C 320 590 370 620 420 646 Z"
        fill={p.foreground}
        opacity={0.55}
      />

      {/* fog bank behind the deck */}
      <g fill={p.fog} opacity={p.fogOpacity} filter={`url(#${id}-blur-lg)`}>
        <ellipse cx="200" cy="600" rx="340" ry="34" />
        <ellipse cx="760" cy="626" rx="420" ry="28" />
        <ellipse cx="1320" cy="610" rx="360" ry="30" />
      </g>

      <Bridge p={p} g={g} id={id} />

      {/* water */}
      <rect y={WATER} width="1600" height={1000 - WATER} fill={`url(#${id}-water)`} />

      {/* reflection */}
      <g clipPath={`url(#${id}-waterclip)`} opacity={variant === "day" ? 0.22 : 0.3}>
        <g transform={`translate(0 ${WATER * 2}) scale(1 -1)`} filter={`url(#${id}-blur-sm)`}>
          <Bridge p={p} g={g} id={id} />
        </g>
      </g>

      {/* sun column on water */}
      {variant !== "day" && (
        <ellipse
          cx={variant === "night" ? p.sun.x : p.sun.x}
          cy={WATER + 120}
          rx={variant === "night" ? 30 : 70}
          ry={150}
          fill={p.shimmer}
          opacity={variant === "night" ? 0.08 : 0.3}
          filter={`url(#${id}-blur-md)`}
        />
      )}

      {/* lamp light spilling down onto the water */}
      {variant === "night" && (
        <g clipPath={`url(#${id}-waterclip)`}>
          {g.reflections.map((r, i) => (
            <rect
              key={i}
              x={r.x - r.w / 2}
              y={WATER}
              width={r.w}
              height={r.len}
              fill={`url(#${id}-reflect)`}
              opacity={r.o}
              filter={`url(#${id}-blur-sm)`}
            />
          ))}
        </g>
      )}

      {/* shimmer */}
      <g fill={p.shimmer}>
        {g.shimmer.map((s, i) => (
          <rect key={i} x={s.x} y={s.y} width={s.w} height={1.4} rx={0.7} opacity={s.o * (variant === "day" ? 0.8 : 1)} />
        ))}
      </g>

      {/* low fog over the water */}
      <g fill={p.fog} opacity={p.fogOpacity * 0.6} filter={`url(#${id}-blur-lg)`}>
        <ellipse cx="420" cy="662" rx="520" ry="20" />
        <ellipse cx="1180" cy="668" rx="480" ry="18" />
      </g>

      {/* foreground bluff (Battery Spencer vantage) */}
      <path
        d="M -20 1010 L -20 790 C 90 772 190 790 280 842 C 360 888 420 950 470 1010 Z"
        fill={p.foreground}
      />
      <path
        d="M 1620 1010 L 1620 860 C 1540 850 1470 872 1400 920 C 1360 950 1330 980 1310 1010 Z"
        fill={p.foreground}
        opacity={0.9}
      />

      {/* vignette */}
      <rect width="1600" height="1000" fill="url(#vignette)" />
    </svg>
  );
}

function WallpaperImpl({ variant }: { variant: WallpaperVariant }) {
  return (
    <div className="fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      <svg width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.8">
            <stop offset="0.6" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.35" />
          </radialGradient>
        </defs>
      </svg>
      <AnimatePresence initial={false}>
        <motion.div
          key={variant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {variant === "silk" ? <SilkWallpaper /> : isFlow(variant) ? <FlowWallpaper variant={variant} /> : <Scene variant={variant} />}
        </motion.div>
      </AnimatePresence>
      <style>{`
        @keyframes wp-twinkle { 0%,100% { opacity: .15 } 50% { opacity: 1 } }
        .wp-twinkle { animation: wp-twinkle 3.2s ease-in-out infinite; }
        @keyframes wp-blink { 0%, 60%, 100% { opacity: .25 } 70%, 90% { opacity: 1 } }
        .wp-blink { animation: wp-blink 2.4s linear infinite; }
        ${FLOW_KEYFRAMES}
        ${SILK_KEYFRAMES}
      `}</style>
    </div>
  );
}

const Wallpaper = memo(WallpaperImpl);
export default Wallpaper;

export const WALLPAPERS: { id: WallpaperVariant; name: string; caption: string; group: "Flow" | "Golden Gate" }[] = [
  { id: "silk", name: "Silk", caption: "Indigo folds with lavender edge light", group: "Flow" },
  { id: "horizon", name: "Horizon", caption: "Soft pastel light, slowly drifting", group: "Flow" },
  { id: "midnight", name: "Midnight", caption: "Deep indigo with a violet glow", group: "Flow" },
  { id: "dusk", name: "Golden Hour", caption: "Sunset over the Golden Gate", group: "Golden Gate" },
  { id: "day", name: "Karl the Fog", caption: "Morning marine layer", group: "Golden Gate" },
  { id: "night", name: "Night", caption: "Bridge lights and city glow", group: "Golden Gate" },
];

/** Whether labels drawn straight on the wallpaper (menu bar, widgets) need dark ink */
export const WALLPAPER_TONE: Record<WallpaperVariant, "light" | "dark"> = {
  silk: "dark",
  horizon: "light",
  midnight: "dark",
  dusk: "dark",
  day: "dark",
  night: "dark",
};

/** Small static preview for System Settings */
export function WallpaperThumb({ variant }: { variant: WallpaperVariant }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {variant === "silk" ? (
        <SilkWallpaper animate={false} />
      ) : isFlow(variant) ? (
        <FlowWallpaper variant={variant} animate={false} />
      ) : (
        <Scene variant={variant} />
      )}
    </div>
  );
}
