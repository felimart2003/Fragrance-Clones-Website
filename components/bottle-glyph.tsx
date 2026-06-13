/** A stylized frosted perfume-bottle silhouette rendered on the card/hero art. */
export function BottleGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 150"
      className={className}
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* cap */}
      <rect x="40" y="6" width="20" height="16" rx="3" fill="rgba(255,255,255,0.85)" />
      {/* collar */}
      <rect x="43" y="22" width="14" height="8" fill="rgba(255,255,255,0.6)" />
      {/* body */}
      <rect
        x="22"
        y="30"
        width="56"
        height="112"
        rx="16"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
      />
      {/* liquid */}
      <rect x="22" y="74" width="56" height="68" rx="16" fill="rgba(255,255,255,0.16)" />
      {/* highlight */}
      <rect x="30" y="40" width="9" height="80" rx="4.5" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}
