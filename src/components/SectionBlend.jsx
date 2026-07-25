/**
 * SectionBlend — an SVG organic wave divider that visually blends one section
 * into the next. Placed between sections, it overlaps both and creates a
 * smooth, continuous canvas feel instead of an abrupt hard edge.
 *
 * Props:
 *   direction  – "up" (default) or "down" — which way the wave curves
 *   fillColor  – CSS color value (defaults to var(--color-cream))
 *   className  – forwarded to the wrapper
 */
export default function SectionBlend({
  direction = "up",
  fillColor = "var(--color-cream)",
  className = "",
}) {
  // Two path variants. "up" curves upward at the top, "down" curves downward.
  // Both are designed as a 1440-wide strip that stretches full-width.
  const paths = {
    up: "M0,40 C240,120 480,0 720,60 C960,120 1200,0 1440,40 L1440,0 L0,0 Z",
    down: "M0,60 C240,0 480,100 720,40 C960,0 1200,80 1440,60 L1440,0 L0,0 Z",
  };

  return (
    <div
      className={`relative w-full h-12 sm:h-16 md:h-20 -mb-px overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ color: fillColor }}
      >
        <path d={paths[direction]} fill="currentColor" />
      </svg>
    </div>
  );
}
