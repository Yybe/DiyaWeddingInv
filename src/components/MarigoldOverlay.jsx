import { useRef, useEffect } from "react";
import marigoldVideo from "../assets/videos/marigold-petals.mp4";

/**
 * Marigold petal video overlay, positioned absolutely behind hero content.
 */
export default function MarigoldOverlay({ className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("loadedmetadata", playVideo);
    if (video.readyState >= 2) playVideo();

    return () => video.removeEventListener("loadedmetadata", playVideo);
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
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ivory)]/30 to-transparent" />
    </div>
  );
}
