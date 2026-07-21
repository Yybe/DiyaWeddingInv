import { useRef, useEffect, useCallback } from "react";

/**
 * Canvas-based chroma key video renderer.
 *
 * Instead of rendering the <video> element directly, each frame is painted
 * to a <canvas> where pixels within tolerance of the key color are made
 * transparent. Self-sizes to fill the parent container with cover-scaling.
 *
 * Props:
 *   src         – video source URL
 *   keyColor    – [R, G, B] of the color to key out (default [0,255,0] green)
 *   tolerance   – 0-1, how close a pixel must be to keyColor (default 0.35)
 *   className   – forwarded to the container div
 *   style       – forwarded to the container div
 *   ...rest     – forwarded to the hidden <video> (autoPlay, muted, loop, etc.)
 */
export default function ChromaKeyVideo({
  src,
  keyColor = [0, 255, 0],
  tolerance = 0.35,
  className = "",
  style,
  ...rest
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!video || !canvas || !container) return;
    if (video.paused || video.ended) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    // Size canvas to container while maintaining aspect ratio (cover)
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (!cw || !ch) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const scale = Math.max(cw / vw, ch / vh);
    const drawW = Math.ceil(vw * scale);
    const drawH = Math.ceil(vh * scale);
    const offsetX = Math.round((cw - drawW) / 2);
    const offsetY = Math.round((ch - drawH) / 2);

    if (canvas.width !== drawW || canvas.height !== drawH) {
      canvas.width = drawW;
      canvas.height = drawH;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Clear with full transparency
    ctx.clearRect(0, 0, drawW, drawH);

    // Draw video frame scaled to fill (cover)
    ctx.drawImage(video, 0, 0, vw, vh, 0, 0, drawW, drawH);

    // Chroma key: set alpha=0 for pixels near keyColor
    const imageData = ctx.getImageData(0, 0, drawW, drawH);
    const data = imageData.data;

    const [kr, kg, kb] = keyColor;
    const maxDist = Math.sqrt(3 * 255 * 255);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const dr = r - kr;
      const dg = g - kg;
      const db = b - kb;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);

      if (dist / maxDist < tolerance) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Position the canvas within the container
    canvas.style.position = "absolute";
    canvas.style.left = `${offsetX}px`;
    canvas.style.top = `${offsetY}px`;

    rafRef.current = requestAnimationFrame(processFrame);
  }, [keyColor, tolerance]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      rafRef.current = requestAnimationFrame(processFrame);
    };
    const onPause = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onPause);

    // Autoplay if ready
    if (video.readyState >= 2 && video.paused) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onPause);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [processFrame]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ display: "none" }}
        {...rest}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
