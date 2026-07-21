import ChromaKeyVideo from "./ChromaKeyVideo";
import marigoldVideo from "../assets/videos/marigold-petals.mp4";

/**
 * Subtle looping petal overlay, positioned absolutely behind hero content.
 * Uses canvas-based chroma key to remove the greenscreen/grey background
 * from the video so only the petals are visible over the ivory wash.
 */
export default function MarigoldOverlay({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <ChromaKeyVideo
        src={marigoldVideo}
        keyColor={[0, 255, 0]}
        tolerance={0.35}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full mix-blend-screen opacity-50"
      />
      {/* Ivory wash so text stays legible over the petals */}
      <div className="absolute inset-0 bg-[var(--color-ivory)]/55" />
    </div>
  );
}
