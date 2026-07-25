import { useRef, useEffect } from "react";
import marigoldVideo from "../assets/videos/marigold-petals.mp4";

/**
 * Marigold petal video overlay, positioned absolutely behind hero content.
 * Always mounted on page load (not conditionally rendered) so the video
 * starts buffering immediately while the envelope covers the viewport.
 */
export default function MarigoldOverlay({ className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playback as soon as possible — the browser will have already
    // begun preloading because the <video> element was mounted at page
    // load (not gated behind the envelope opening).
    const playVideo = () => {
      video.play().catch(() => {});
    };

    // If data is already buffered, play immediately
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => video.removeEventListener("canplay", playVideo);
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={marigoldVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* Longer gradient that blends hero video into the cream section below */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ivory)]/40 via-transparent via-60% to-[var(--color-cream)]" />
    </div>
  );
}
