/**
 * Small decorative hero illustration: a laptop with a blinking caret and a plant on a shelf,
 * with a couple of soft clouds drifting behind. Pure SVG + CSS animation, no client JS.
 */
export default function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 210"
      role="img"
      aria-label="A laptop and a small plant on a shelf"
      className={className}
    >
      {/* Soft clouds */}
      <g className="drift" style={{ filter: "blur(5px)" }}>
        <ellipse cx="108" cy="46" rx="42" ry="15" fill="#fff" opacity="0.75" />
        <ellipse cx="140" cy="36" rx="30" ry="14" fill="#fff" opacity="0.8" />
        <ellipse cx="170" cy="48" rx="36" ry="13" fill="#fff" opacity="0.7" />
      </g>
      <g className="drift" style={{ filter: "blur(4px)", animationDelay: "-4s" }}>
        <ellipse cx="248" cy="74" rx="22" ry="8" fill="#fff" opacity="0.6" />
        <ellipse cx="262" cy="68" rx="14" ry="8" fill="#fff" opacity="0.65" />
      </g>

      {/* Sparkles */}
      <g fill="#fff" opacity="0.9">
        <circle cx="70" cy="92" r="2" />
        <circle cx="262" cy="112" r="1.6" />
        <circle cx="52" cy="124" r="1.4" />
      </g>

      {/* Laptop */}
      <g className="float-soft">
        <rect x="92" y="82" width="116" height="74" rx="8" fill="#2b2552" />
        <rect x="98" y="88" width="104" height="62" rx="4" fill="#352e66" />
        <rect x="108" y="98" width="46" height="5" rx="2.5" fill="#a5b4fc" />
        <rect x="116" y="110" width="68" height="5" rx="2.5" fill="#f9a8d4" />
        <rect x="116" y="122" width="38" height="5" rx="2.5" fill="#86efac" />
        <rect x="108" y="134" width="30" height="5" rx="2.5" fill="#fcd34d" />
        <rect className="blink-caret" x="142" y="132" width="5" height="9" rx="1" fill="#fff" />
        <path d="M80 156 H220 a0 0 0 0 1 0 0 v2 a7 7 0 0 1 -7 7 H87 a7 7 0 0 1 -7 -7 z" fill="#ece7f8" />
        <rect x="136" y="156" width="28" height="3" rx="1.5" fill="#cfc7e6" />
      </g>

      {/* Plant */}
      <g>
        <path d="M236 150 q-16 -22 -6 -42 q14 12 6 42z" fill="#6fcf97" />
        <path d="M240 150 q10 -26 28 -34 q4 22 -28 34z" fill="#4fb883" />
        <path d="M238 150 q-2 -30 8 -52 q14 22 -8 52z" fill="#86e0a8" />
        <path d="M226 150 h28 l-4 22 a4 4 0 0 1 -4 3 h-12 a4 4 0 0 1 -4 -3 z" fill="#e9a58a" />
        <rect x="224" y="146" width="32" height="7" rx="3.5" fill="#f0b79f" />
      </g>

      {/* Shelf */}
      <rect x="44" y="170" width="232" height="11" rx="5.5" fill="#6d4d63" />
      <rect x="44" y="170" width="232" height="3.5" rx="1.75" fill="#85637a" />
      <ellipse cx="160" cy="193" rx="96" ry="5" fill="#4a3a8f" opacity="0.12" />
    </svg>
  );
}
