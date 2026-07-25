import ChromaKeyVideo from "./ChromaKeyVideo";
import marigoldVideo from "../assets/videos/marigold-petals.mp4";

/**
 * Marigold petal video overlay rendered via canvas-based chroma key.
 * Keys out black so petals appear to float naturally over the hero background.
 */
export default function MarigoldOverlay({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <ChromaKeyVideo
        src={marigoldVideo}
        keyColor={[0, 0, 0]}
        tolerance={0.3}
        className="w-full h-full"
        style={{ position: "absolute", inset: 0 }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ivory)]/30 to-transparent" />
    </div>
  );
}
