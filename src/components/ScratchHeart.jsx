import { useEffect, useRef, useState, useCallback } from "react";

const SIZE = 120;

/** Draws a heart path on the given 2D context, centered in a SIZE x SIZE box. */
function drawHeartPath(ctx) {
  ctx.beginPath();
  const topCurveHeight = SIZE * 0.3;
  ctx.moveTo(SIZE / 2, topCurveHeight);
  ctx.bezierCurveTo(SIZE / 2, topCurveHeight - SIZE * 0.35, 0, topCurveHeight - SIZE * 0.1, 0, topCurveHeight + SIZE * 0.05);
  ctx.bezierCurveTo(0, SIZE * 0.55, SIZE * 0.25, SIZE * 0.75, SIZE / 2, SIZE * 0.98);
  ctx.bezierCurveTo(SIZE * 0.75, SIZE * 0.75, SIZE, SIZE * 0.55, SIZE, topCurveHeight + SIZE * 0.05);
  ctx.bezierCurveTo(SIZE, topCurveHeight - SIZE * 0.1, SIZE / 2, topCurveHeight - SIZE * 0.35, SIZE / 2, topCurveHeight);
  ctx.closePath();
}

/**
 * A single heart-shaped scratch card. Reveals `children` beneath a gold
 * foil layer as the user scratches (pointer drag) over it. Calls
 * onRevealed() once enough of the heart area has been cleared.
 */
export default function ScratchHeart({ label, children, onRevealed, revealThreshold = 0.55 }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const scratching = useRef(false);
  const revealedRef = useRef(false);

  const setup = useCallback((canvas) => {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    // Clip all drawing to the heart shape
    drawHeartPath(ctx);
    ctx.clip();

    // Gold foil scratch layer
    const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    grad.addColorStop(0, "#E9C876");
    grad.addColorStop(0.5, "#C9A24B");
    grad.addColorStop(1, "#A97F32");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);

    ctx.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) setup(canvas);
  }, [setup]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const scratchAt = (x, y) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkRevealProgress = () => {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const data = ctx.getImageData(0, 0, SIZE * dpr, SIZE * dpr).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 8) {
      total++;
      if (data[i] < 40) cleared++;
    }
    if (total > 0 && cleared / total > revealThreshold) {
      revealedRef.current = true;
      setRevealed(true);
      onRevealed?.();
    }
  };

  const handleStart = (e) => {
    scratching.current = true;
    const { x, y } = getPos(e, canvasRef.current);
    scratchAt(x, y);
  };
  const handleMove = (e) => {
    if (!scratching.current) return;
    const { x, y } = getPos(e, canvasRef.current);
    scratchAt(x, y);
  };
  const handleEnd = () => {
    if (!scratching.current) return;
    scratching.current = false;
    checkRevealProgress();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative"
        style={{ width: SIZE, height: SIZE, clipPath: "none" }}
      >
        {/* Revealed content underneath */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold text-[var(--color-maroon)]"
          style={{
            clipPath:
              "path('M60 36 C60 15 0 21 0 42 C0 66 30 90 60 117.6 C90 90 120 66 120 42 C120 21 60 15 60 36 Z')",
            background:
              "linear-gradient(160deg, var(--color-cream) 0%, var(--color-ivory) 100%)",
          }}
        >
          {children}
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none cursor-pointer"
          style={{ opacity: revealed ? 0 : 1, transition: "opacity 0.6s ease" }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          role="img"
          aria-label={`Scratch to reveal the wedding ${label}`}
        />

        {!revealed && (
          <span className="absolute inset-0 flex items-center justify-center font-utility text-[9px] tracking-widest uppercase text-[var(--color-ivory)]/90 pointer-events-none">
            Scratch
          </span>
        )}
      </div>
      <span className="font-utility text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold-deep)]">
        {label}
      </span>
    </div>
  );
}
