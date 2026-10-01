import Image from "next/image";
import { useId, type ReactNode } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import type { AppId } from "./apps-meta";

export type IconId = AppId | "github" | "linkedin" | "x" | "folder" | "disk" | "pdf" | "trash";

/* ──────────────────────────────────────────────────────────────
   Icon grid
   macOS icons sit on a 1024pt canvas with an 824pt continuous-curvature
   squircle centred inside it, so every icon carries the same breathing
   room and drop shadow. We reproduce that with a superellipse mask.
   ────────────────────────────────────────────────────────────── */

const SHAPE_RATIO = 824 / 1024;

function superellipse(n = 5, steps = 96) {
  let d = "";
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = 50 + 50 * Math.sign(c) * Math.pow(Math.abs(c), 2 / n);
    const y = 50 + 50 * Math.sign(s) * Math.pow(Math.abs(s), 2 / n);
    d += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}Z`;
}

export const SQUIRCLE = superellipse();
const MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='${SQUIRCLE}'/></svg>`
)}")`;
const maskStyle = {
  WebkitMaskImage: MASK,
  maskImage: MASK,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
} as const;

/** Squircle tile: masked artwork + specular sheen + glass rim + grounded shadow. */
export function Squircle({ size, bg, children, sheen = true }: { size: number; bg?: string; children?: ReactNode; sheen?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const s = Math.round(size * SHAPE_RATIO);
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <span
        className="relative block"
        style={{
          width: s,
          height: s,
          filter: `drop-shadow(0 ${Math.max(1, s * 0.025)}px ${Math.max(1, s * 0.035)}px rgb(0 0 0 / 0.3)) drop-shadow(0 ${s * 0.01}px ${s * 0.01}px rgb(0 0 0 / 0.18))`,
        }}
      >
        <span className="absolute inset-0 overflow-hidden" style={{ ...maskStyle, background: bg }}>
          {children}
          {sheen && (
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(130% 75% at 30% -12%, rgb(255 255 255 / 0.34), rgb(255 255 255 / 0) 58%), linear-gradient(180deg, rgb(255 255 255 / 0) 62%, rgb(0 0 0 / 0.08))",
              }}
            />
          )}
        </span>
        {/* Liquid Glass rim: bright top-left edge, faint bottom-right refraction */}
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id={`rim${uid}`} x1="0.15" y1="0" x2="0.85" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="0.35" stopColor="#fff" stopOpacity="0.12" />
              <stop offset="0.7" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d={SQUIRCLE} fill="none" stroke={`url(#rim${uid})`} strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
          <path d={SQUIRCLE} fill="none" stroke="rgb(0 0 0 / 0.16)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
    </span>
  );
}

/** Full-bleed 100×100 artwork inside a squircle */
function Art({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
      {children}
    </svg>
  );
}

/* ───────────────────────── Artwork ───────────────────────── */

function FinderArt() {
  const u = useId().replace(/:/g, "");
  return (
    <Art>
      <defs>
        <linearGradient id={`fr${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fb2ff" />
          <stop offset="1" stopColor="#1467e5" />
        </linearGradient>
        <linearGradient id={`fl${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4faff" />
          <stop offset="1" stopColor="#bcdcf8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#fr${u})`} />
      {/* the profile: forehead, nose, chin */}
      <path d="M0 0H56C53 14 50 27 47.5 40C46.6 44.5 45 49 42 53.5C44.8 54.4 48.6 54.8 52.5 54.6C51.2 70 51.4 85 53 100H0Z" fill={`url(#fl${u})`} />
      <rect x="27" y="25" width="6.4" height="17" rx="3.2" fill="#1c2a44" />
      <rect x="69" y="25" width="6.4" height="17" rx="3.2" fill="#0c2552" />
      <path d="M21 67C33 77.5 48 80.5 62 78.5C69.5 77.4 75.8 74.6 81 70.6" fill="none" stroke="#1c2a44" strokeWidth="3.6" strokeLinecap="round" />
    </Art>
  );
}

function NotesArt() {
  const u = useId().replace(/:/g, "");
  return (
    <Art>
      <defs>
        <linearGradient id={`ny${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe46b" />
          <stop offset="1" stopColor="#fcc21b" />
        </linearGradient>
        <linearGradient id={`np${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eeeeee" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#np${u})`} />
      <rect width="100" height="29" fill={`url(#ny${u})`} />
      <rect y="28" width="100" height="1.2" fill="#000" opacity=".08" />
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={4 + i * 6.2} cy="33" r="1.15" fill="#c9c9c9" />
      ))}
      {[48, 62, 76, 90].map((y) => (
        <rect key={y} x="0" y={y} width="100" height="1.1" fill="#d6d6d6" />
      ))}
    </Art>
  );
}

function AppsArt() {
  const colors = [
    ["#ff6b6b", "#e8383d"],
    ["#ffb347", "#ff8c1a"],
    ["#ffe066", "#f5c518"],
    ["#5ee07a", "#2dbd4e"],
    ["#5ec8ff", "#1e90ff"],
    ["#a78bfa", "#7c4dff"],
    ["#ff7eb6", "#f0437f"],
    ["#4de0c6", "#15b89a"],
    ["#9aa4b8", "#6b7489"],
  ];
  const u = useId().replace(/:/g, "");
  return (
    <Art>
      <defs>
        <linearGradient id={`ab${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f7fa" />
          <stop offset="1" stopColor="#d5d7df" />
        </linearGradient>
        {colors.map(([a, b], i) => (
          <linearGradient key={i} id={`ag${u}${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        ))}
      </defs>
      <rect width="100" height="100" fill={`url(#ab${u})`} />
      {colors.map((_, i) => (
        <rect key={i} x={19 + (i % 3) * 22} y={19 + Math.floor(i / 3) * 22} width="18" height="18" rx="5.4" fill={`url(#ag${u}${i})`} />
      ))}
    </Art>
  );
}

function TerminalArt() {
  const u = useId().replace(/:/g, "");
  return (
    <Art>
      <defs>
        <linearGradient id={`ts${u}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#35353a" />
          <stop offset="0.5" stopColor="#17171a" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
        <radialGradient id={`tg${u}`} cx="0.28" cy="0.08" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#ts${u})`} />
      <rect width="100" height="100" fill={`url(#tg${u})`} />
      {/* the prompt, set like a real caret: chevron + underscore */}
      <path d="M23 29L39.5 41.5L23 54" fill="none" stroke="#fff" strokeWidth="7.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="45" y="48.4" width="25" height="6.4" rx="3.2" fill="#fff" />
    </Art>
  );
}

function ActivityArt() {
  const u = useId().replace(/:/g, "");
  // one continuous trace: idle baseline, a warm-up blip, the big spike, then settling
  const trace = "M2 62H20L25.5 52L31 72L39.5 20L48 74L54.5 46L60 62H72L77 54L82 62H98";
  return (
    <Art>
      <defs>
        <linearGradient id={`ab${u}`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#22262b" />
          <stop offset="0.55" stopColor="#101317" />
          <stop offset="1" stopColor="#07090b" />
        </linearGradient>
        <linearGradient id={`al${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1fc957" />
          <stop offset="0.5" stopColor="#4ae86f" />
          <stop offset="1" stopColor="#b9ff7d" />
        </linearGradient>
        <linearGradient id={`af${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3ee06a" stopOpacity="0.42" />
          <stop offset="1" stopColor="#3ee06a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`as${u}`} cx="0.3" cy="0.04" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`av${u}`} cx="0.5" cy="0.5" r="0.62">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <filter id={`ag${u}`} filterUnits="userSpaceOnUse" x="-60" y="-60" width="220" height="220">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
        <filter id={`ad${u}`} filterUnits="userSpaceOnUse" x="-60" y="-60" width="220" height="220">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <clipPath id={`ac${u}`}>
          <rect width="100" height="100" />
        </clipPath>
      </defs>

      <rect width="100" height="100" fill={`url(#ab${u})`} />

      <g clipPath={`url(#ac${u})`}>
        {/* monitor grid */}
        <g stroke="#4ae86f" strokeOpacity="0.1" strokeWidth="0.7">
          {[18, 34, 50, 66, 82].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} />
          ))}
          {[16, 32, 48, 64, 80, 96].map((x) => (
            <line key={x} y1="0" y2="100" x1={x} x2={x} />
          ))}
        </g>
        <line x1="0" x2="100" y1="62" y2="62" stroke="#4ae86f" strokeOpacity="0.2" strokeWidth="0.9" />

        {/* area under the curve */}
        <path d={`${trace}V100H2Z`} fill={`url(#af${u})`} />

        {/* glow, then the crisp trace on top */}
        <path d={trace} fill="none" stroke="#3ee06a" strokeOpacity="0.85" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter={`url(#ag${u})`} />
        <path d={trace} fill="none" stroke={`url(#al${u})`} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* live cursor at the leading edge */}
        <circle cx="98" cy="62" r="6" fill="#b9ff7d" opacity="0.55" filter={`url(#ad${u})`} />
        <circle cx="98" cy="62" r="2.6" fill="#eaffd4" />
      </g>

      {/* screen sheen + vignette */}
      <rect width="100" height="100" fill={`url(#as${u})`} />
      <rect width="100" height="100" fill={`url(#av${u})`} />
    </Art>
  );
}

function MailArt() {
  const u = useId().replace(/:/g, "");
  return (
    <Art>
      <defs>
        <linearGradient id={`mb${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#62cbff" />
          <stop offset="1" stopColor="#1473f0" />
        </linearGradient>
        <linearGradient id={`me${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e3eefb" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#mb${u})`} />
      <rect x="15" y="27" width="70" height="47" rx="6" fill={`url(#me${u})`} />
      <path d="M17 72L42 50M83 72L58 50" stroke="#c4dcf6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16.5 30.5L46 54Q50 57.2 54 54L83.5 30.5" fill="none" stroke="#9ec6f0" strokeWidth="2.6" strokeLinejoin="round" />
    </Art>
  );
}

/** Preview: two snapshots (one of the Golden Gate at sunset) under a loupe */
function PreviewArt() {
  const u = useId().replace(/:/g, "");
  return (
    <Art>
      <defs>
        <linearGradient id={`pb${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfbfd" />
          <stop offset="1" stopColor="#dfe3ea" />
        </linearGradient>
        <linearGradient id={`p1${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c93e8" />
          <stop offset="1" stopColor="#a9d4ff" />
        </linearGradient>
        <linearGradient id={`p2${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4a9a" />
          <stop offset=".55" stopColor="#f08a62" />
          <stop offset="1" stopColor="#ffd08a" />
        </linearGradient>
        <radialGradient id={`pl${u}`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".75" />
          <stop offset="1" stopColor="#bfe0ff" stopOpacity=".25" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#pb${u})`} />
      <g transform="rotate(-9 44 44)">
        <rect x="16" y="20" width="56" height="42" rx="2.5" fill="#fff" stroke="#000" strokeOpacity=".12" />
        <rect x="19.5" y="23.5" width="49" height="35" fill={`url(#p1${u})`} />
        <path d="M19.5 50L33 38L44 48L52 42L68.5 55V58.5H19.5Z" fill="#3f7a4b" />
      </g>
      <g transform="rotate(7 55 56)">
        <rect x="26" y="34" width="58" height="44" rx="2.5" fill="#fff" stroke="#000" strokeOpacity=".14" />
        <rect x="29.5" y="37.5" width="51" height="37" fill={`url(#p2${u})`} />
        <g fill="#6b1e28">
          <rect x="41" y="44" width="2.4" height="28" />
          <rect x="66" y="44" width="2.4" height="28" />
          <rect x="29.5" y="64" width="51" height="2" />
        </g>
        <path d="M42.2 45Q54.9 70 67.2 45M42.2 45Q36 57 29.5 62M67.2 45Q74 57 80.5 62" fill="none" stroke="#6b1e28" strokeWidth="1" />
        <rect x="29.5" y="66" width="51" height="8.5" fill="#3b2f5e" opacity=".55" />
      </g>
      {/* loupe */}
      <path d="M72 72L86 86" stroke="#4a4a4f" strokeWidth="7" strokeLinecap="round" />
      <circle cx="62" cy="62" r="15" fill={`url(#pl${u})`} stroke="#5a5a60" strokeWidth="4" />
      <path d="M53 55A12 12 0 0 1 61 50" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity=".9" />
    </Art>
  );
}

function SettingsArt() {
  const u = useId().replace(/:/g, "");
  const teeth = 8;
  return (
    <Art>
      <defs>
        <linearGradient id={`sb${u}`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f2f2f5" />
          <stop offset="0.55" stopColor="#d2d2d9" />
          <stop offset="1" stopColor="#a8a8b0" />
        </linearGradient>
        <linearGradient id={`sg${u}`} x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#84848c" />
          <stop offset="0.5" stopColor="#5a5a62" />
          <stop offset="1" stopColor="#35353b" />
        </linearGradient>
        <radialGradient id={`sm${u}`} cx=".5" cy=".4" r=".7">
          <stop offset="0" stopColor="#f2f2f5" />
          <stop offset="1" stopColor="#b9b9c0" />
        </radialGradient>
        <linearGradient id={`sh${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`sd${u}`} filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
          <feDropShadow dx="0" dy="1.6" stdDeviation="2.4" floodColor="#2b2b31" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width="100" height="100" fill={`url(#sb${u})`} />
      <g filter={`url(#sd${u})`}>
        <g fill={`url(#sg${u})`}>
          {Array.from({ length: teeth }, (_, i) => (
            <rect
              key={i}
              x="43.6"
              y="9.5"
              width="12.8"
              height="20"
              rx="4.4"
              transform={`rotate(${(i * 360) / teeth} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="30.5" />
        </g>
        {/* hollow centre lets the background through, like the real gear */}
        <circle cx="50" cy="50" r="12.6" fill={`url(#sb${u})`} />
        <circle cx="50" cy="50" r="12.6" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="1.6" />
      </g>
      {/* top-lit edge on the gear body */}
      <circle cx="50" cy="50" r="29.6" fill="none" stroke={`url(#sh${u})`} strokeWidth="1.6" />
    </Art>
  );
}

function FolderGlyphArt({ size }: { size: number }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden style={{ filter: "drop-shadow(0 1.5px 2px rgb(0 0 0 / .28))" }}>
      <defs>
        <linearGradient id={`fb${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ab0f5" />
          <stop offset="1" stopColor="#2f8de6" />
        </linearGradient>
        <linearGradient id={`ff${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd6ff" />
          <stop offset="1" stopColor="#62b4f7" />
        </linearGradient>
      </defs>
      <path d="M8 22C8 18.7 10.7 16 14 16H37C38.8 16 40.4 16.8 41.5 18.2L45.5 23H86C89.3 23 92 25.7 92 29V78C92 81.3 89.3 84 86 84H14C10.7 84 8 81.3 8 78Z" fill={`url(#fb${u})`} />
      <path d="M8 34C8 30.7 10.7 28 14 28H86C89.3 28 92 30.7 92 34V78C92 81.3 89.3 84 86 84H14C10.7 84 8 81.3 8 78Z" fill={`url(#ff${u})`} />
      <path d="M9 30.5H91" stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
    </svg>
  );
}
/** Plain macOS folder (desktop / Finder sidebar size) */
export function FolderGlyph({ size }: { size: number }) {
  return <FolderGlyphArt size={size} />;
}

export function DiskGlyph({ size }: { size: number }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden style={{ filter: "drop-shadow(0 1.5px 2px rgb(0 0 0 / .3))" }}>
      <defs>
        <linearGradient id={`dk${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fafafc" />
          <stop offset="1" stopColor="#c4c4cb" />
        </linearGradient>
      </defs>
      <rect x="6" y="19" width="52" height="28" rx="5" fill={`url(#dk${u})`} stroke="#8e8e96" strokeWidth=".6" />
      <rect x="6.3" y="39" width="51.4" height="7.7" rx="3.5" fill="#a9a9b1" />
      <circle cx="50" cy="42.8" r="1.5" fill="#34c759" />
      <rect x="12" y="25" width="20" height="2.6" rx="1.3" fill="#a5a5ad" />
    </svg>
  );
}

export function PdfGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden style={{ filter: "drop-shadow(0 1.5px 2px rgb(0 0 0 / .25))" }}>
      <path d="M15 5h24l12 12v40a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" fill="#fff" />
      <path d="M39 5v9a3 3 0 0 0 3 3h9" fill="#e5e5ea" />
      <rect x="17" y="23" width="24" height="2.2" rx="1.1" fill="#d1d1d6" />
      <rect x="17" y="29" width="29" height="2.2" rx="1.1" fill="#d1d1d6" />
      <rect x="17" y="35" width="26" height="2.2" rx="1.1" fill="#d1d1d6" />
      <rect x="15" y="44" width="21" height="9" rx="2" fill="#ff3b30" />
      <text x="25.5" y="51" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="-apple-system, sans-serif">
        PDF
      </text>
    </svg>
  );
}

/** Translucent ribbed bin — the Trash has no squircle, just like the real Dock. */
function TrashGlyph({ size }: { size: number }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden style={{ filter: "drop-shadow(0 2px 3px rgb(0 0 0 / .3))" }}>
      <defs>
        <linearGradient id={`tb${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dfe3ea" stopOpacity=".75" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity=".92" />
          <stop offset="1" stopColor="#cfd4dc" stopOpacity=".75" />
        </linearGradient>
      </defs>
      {/* body, tapering toward the base */}
      <path
        d="M27.5 24H72.5L69 87Q68.7 92.5 63 92.5H37Q31.3 92.5 31 87Z"
        fill={`url(#tb${u})`}
        stroke="#8d939c"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {/* ribs follow the taper */}
      <g stroke="#8b929c" strokeOpacity="0.4" strokeWidth="2.4" strokeLinecap="round">
        {[34, 42, 50, 58, 66].map((x) => (
          <line key={x} x1={x} y1="31" x2={50 + (x - 50) * 0.84} y2="86" />
        ))}
      </g>
      {/* glass highlights down each side */}
      <path d="M31.5 28L34.6 86" stroke="#fff" strokeOpacity="0.75" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M68.4 28L65.4 86" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      {/* rim + dark interior */}
      <ellipse cx="50" cy="24" rx="23.5" ry="5.6" fill="#9aa0aa" opacity="0.35" />
      <ellipse cx="50" cy="23.2" rx="23.5" ry="5.6" fill="#f2f5f9" stroke="#8d939c" strokeOpacity="0.65" strokeWidth="1" />
      <ellipse cx="50" cy="23.4" rx="18.6" ry="3.7" fill="#3f4650" opacity="0.5" />
    </svg>
  );
}

/* ───────────────────────── Public component ───────────────────────── */

export default function AppIcon({ id, size = 56 }: { id: IconId; size?: number }) {
  switch (id) {
    case "about":
      return (
        <Squircle size={size} bg="#e9c7a6">
          <Image src="/images/profilePic.jpg" alt="" fill sizes={`${size * 2}px`} className="object-cover" />
        </Squircle>
      );
    case "projects":
      return (
        <Squircle size={size}>
          <FinderArt />
        </Squircle>
      );
    case "notes":
      return (
        <Squircle size={size}>
          <NotesArt />
        </Squircle>
      );
    case "skills":
      return (
        <Squircle size={size}>
          <AppsArt />
        </Squircle>
      );
    case "terminal":
      return (
        <Squircle size={size}>
          <TerminalArt />
        </Squircle>
      );
    case "activity":
      return (
        <Squircle size={size}>
          <ActivityArt />
        </Squircle>
      );
    case "mail":
      return (
        <Squircle size={size}>
          <MailArt />
        </Squircle>
      );
    case "resume":
      return (
        <Squircle size={size}>
          <PreviewArt />
        </Squircle>
      );
    case "settings":
      return (
        <Squircle size={size}>
          <SettingsArt />
        </Squircle>
      );
    case "github":
      return (
        <Squircle size={size} bg="linear-gradient(180deg,#2f343b,#0d1117)">
          <span className="absolute inset-0 grid place-items-center">
            <FaGithub size={Math.round(size * SHAPE_RATIO * 0.56)} color="#fff" />
          </span>
        </Squircle>
      );
    case "linkedin":
      return (
        <Squircle size={size} bg="linear-gradient(180deg,#2d8fe6,#0a5fb4)">
          <span className="absolute inset-0 grid place-items-center">
            <FaLinkedinIn size={Math.round(size * SHAPE_RATIO * 0.52)} color="#fff" />
          </span>
        </Squircle>
      );
    case "x":
      return (
        <Squircle size={size} bg="linear-gradient(180deg,#2b2b2f,#000)">
          <span className="absolute inset-0 grid place-items-center">
            <BsTwitterX size={Math.round(size * SHAPE_RATIO * 0.42)} color="#fff" />
          </span>
        </Squircle>
      );
    case "folder":
      return <FolderGlyph size={size} />;
    case "disk":
      return <DiskGlyph size={size} />;
    case "pdf":
      return <PdfGlyph size={size} />;
    case "trash":
      return <TrashGlyph size={size} />;
  }
}
