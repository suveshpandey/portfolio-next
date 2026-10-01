import { useId } from "react";
import { SQUIRCLE } from "./AppIcon";

/**
 * Suvesh monogram — an "S" constructed from two true circular arcs (a 17pt upper bowl over a
 * 19pt lower one, the typographic convention) meeting at a shared tangent, with the terminals
 * sheared off the horizontal. One continuous stroke, so it reads at 15px in the menu bar and
 * still feels drawn at 96px on the boot screen.
 */
export const S_PATH = "M66.4 26.6A17 17 0 1 0 50 48A19 19 0 1 1 31.6 71.9";

export function SuveshGlyph({ size = 16, weight = 13 }: { size?: number; weight?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden fill="none">
      <path d={S_PATH} stroke="currentColor" strokeWidth={weight} strokeLinecap="round" />
    </svg>
  );
}

/** The monogram as an app-icon badge: indigo glass squircle, white mark, specular rim. */
export function SuveshBadge({ size = 96, glow = true }: { size?: number; glow?: boolean }) {
  const u = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`bg${u}`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#8f8cf0" />
          <stop offset="0.45" stopColor="#5b53cf" />
          <stop offset="1" stopColor="#241e63" />
        </linearGradient>
        <radialGradient id={`sheen${u}`} cx="0.3" cy="0.02" r="0.85">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`rim${u}`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.45" />
        </linearGradient>
        <filter id={`gl${u}`} filterUnits="userSpaceOnUse" x="-60" y="-60" width="220" height="220">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <clipPath id={`cp${u}`}>
          <path d={SQUIRCLE} />
        </clipPath>
      </defs>
      <g clipPath={`url(#cp${u})`}>
        <path d={SQUIRCLE} fill={`url(#bg${u})`} />
        <path d={SQUIRCLE} fill={`url(#sheen${u})`} />
        {glow && <path d={S_PATH} stroke="#cfccff" strokeOpacity="0.32" strokeWidth="12.5" strokeLinecap="round" fill="none" filter={`url(#gl${u})`} />}
        <path d={S_PATH} stroke="#fff" strokeWidth="12.5" strokeLinecap="round" fill="none" />
      </g>
      <path d={SQUIRCLE} fill="none" stroke={`url(#rim${u})`} strokeWidth="1.2" />
    </svg>
  );
}
