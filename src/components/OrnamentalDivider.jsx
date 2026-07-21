/**
 * A lightweight inline-SVG ornamental divider inspired by Indian mandala
 * line-work. No image asset required, so it stays crisp at any size and
 * costs nothing extra to load.
 */
export default function OrnamentalDivider({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 select-none ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="3" fill="var(--color-gold)" />
        <path
          d="M14 2c2 4 6 6 6 12s-4 8-6 12c-2-4-6-6-6-12s4-8 6-12z"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M2 14c4-2 6-6 12-6s8 4 12 6c-4 2-6 6-12 6s-8-4-12-6z"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
      <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
    </div>
  );
}
