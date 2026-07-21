import marigoldVideo from "../assets/videos/marigold-petals.mp4";

/**
 * Subtle looping petal video, positioned absolutely behind hero content.
 * Muted + autoplay + playsInline so it can autoplay on mobile browsers,
 * and lazy-loaded via preload="none" isn't used here since it needs to
 * start immediately, but metadata-only preload keeps initial weight low.
 */
export default function MarigoldOverlay({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <video
        className="w-full h-full object-cover opacity-40 mix-blend-multiply"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={marigoldVideo} type="video/mp4" />
      </video>
      {/* Ivory wash so text stays legible over the petals */}
      <div className="absolute inset-0 bg-[var(--color-ivory)]/55" />
    </div>
  );
}
