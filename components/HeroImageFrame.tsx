"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SVG path: rounded rect (border around image) + short line extending from bottom-right.
 * A light (bright segment) travels along this path and lights up a portion of it.
 */
export default function HeroImageFrame({ children }: { children: React.ReactNode }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number | null>(null);

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
    }
  }, []);

  // Path: rounded rect only (no extending line). Corner radius matches image rounded-2xl.
  const pathD =
    "M 11 5 L 89 5 Q 95 5 95 11 L 95 89 Q 95 95 89 95 L 11 95 Q 5 95 5 89 L 5 11 Q 5 5 11 5";

  const lightLength = 80;
  const trailLength = 160;
  const length = pathLength ?? 400;
  const rampStartLength = 1; // start lighting at 1 unit, then 2, 3, 4... up to lightLength
  const rampPct = 0.065; // ~6.5% of loop for ramp up (1→80) and same for ramp down (80→1)

  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-[22rem] xl:h-[22rem] flex-shrink-0">
      {pathLength != null && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-frame-light-path {
              animation: hero-frame-travel 7s linear infinite;
            }
            .hero-frame-light-trail {
              animation: hero-frame-trail-travel 7s linear infinite;
            }
            @keyframes hero-frame-travel {
              0% {
                stroke-dasharray: ${rampStartLength} ${pathLength};
                stroke-dashoffset: 0;
              }
              ${rampPct * 100}% {
                stroke-dasharray: ${lightLength} ${pathLength};
                stroke-dashoffset: ${-pathLength * rampPct};
              }
              ${(1 - rampPct) * 100}% {
                stroke-dasharray: ${lightLength} ${pathLength};
                stroke-dashoffset: ${-pathLength * (1 - rampPct)};
              }
              100% {
                stroke-dasharray: ${rampStartLength} ${pathLength};
                stroke-dashoffset: ${-pathLength};
              }
            }
            @keyframes hero-frame-trail-travel {
              0% { stroke-dashoffset: ${lightLength}; }
              100% { stroke-dashoffset: ${-pathLength + lightLength}; }
            }
          `,
        }} />
      )}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id="hero-light-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-line-dim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.72 0.11 195 / 0.25)" />
            <stop offset="100%" stopColor="oklch(0.72 0.11 195 / 0.25)" />
          </linearGradient>
        </defs>
        {/* Full path: dim (always visible) */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#hero-line-dim)"
          strokeWidth="0.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Same path: bright moving segment (the "light") */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="oklch(0.72 0.11 195 / 0.4)"
          strokeWidth="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hero-light-glow)"
          className="hero-frame-light-path"
          style={{ strokeDasharray: `${lightLength} ${length}` }}
        />
      </svg>
      <div className="absolute inset-[11%] rounded-2xl overflow-hidden flex items-center justify-center bg-muted/50 backdrop-blur-sm z-10">
        {children}
      </div>
    </div>
  );
}
