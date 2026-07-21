import { useRef, useState } from "react";
import { gsap } from "gsap";
import invitation from "../data/invitation";
import ganeshSymbol from "../assets/images/ganesh-symbol.png";

/**
 * Full-screen opening envelope. Tapping the wax seal triggers a GSAP timeline:
 * seal presses in -> cracks -> flap unfolds -> card slides up and reveals the site.
 * onOpened() is called once the timeline finishes so the parent can unmount this.
 */
export default function Envelope({ onOpened }) {
  const rootRef = useRef(null);
  const sealRef = useRef(null);
  const crackRef = useRef(null);
  const flapRef = useRef(null);
  const cardRef = useRef(null);
  const [isOpening, setIsOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setHidden(true);
        onOpened?.();
      },
    });

    // 1. Seal presses inward, satisfying tactile squash
    tl.to(sealRef.current, { scale: 0.88, duration: 0.15, ease: "power1.in" })
      // 2. Seal cracks and breaks apart
      .to(sealRef.current, { scale: 1.15, opacity: 0, duration: 0.35, ease: "back.in(1.5)" })
      .to(crackRef.current, { opacity: 1, duration: 0.1 }, "<")
      // 3. Envelope flap unfolds open (3D rotate from top edge)
      .to(
        flapRef.current,
        { rotateX: -165, duration: 0.9, ease: "power3.inOut" },
        "-=0.1"
      )
      // 4. Invitation card slides upward and out of the envelope
      .to(
        cardRef.current,
        { y: "-68%", duration: 1, ease: "power3.inOut" },
        "-=0.55"
      )
      // 5. Whole envelope fades away to reveal the site underneath
      .to(rootRef.current, { opacity: 0, duration: 0.5, ease: "power1.out" }, "-=0.15");
  };

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-maroon-deep)] px-4"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient maroon backdrop with subtle radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#6b1b26,#3a0d12)]" />

      <div
        className="relative w-full max-w-sm aspect-[5/7] sm:max-w-md sm:aspect-[3/4]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── Envelope body (back panel) ── */}
        <div className="paper-grain absolute inset-0 rounded-md bg-[var(--color-ivory)] shadow-[0_20px_60px_rgba(0,0,0,0.55)] border border-[var(--color-gold)]/60 overflow-hidden">
          {/* Double decorative inner border */}
          <div className="absolute inset-3 border border-[var(--color-gold)]/40 rounded" />
          <div className="absolute inset-4 border border-[var(--color-gold)]/20 rounded" />
          {/* Subtle embossed floral corners */}
          <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_10%_10%,var(--color-gold)_0,transparent_35%),radial-gradient(circle_at_90%_10%,var(--color-gold)_0,transparent_35%),radial-gradient(circle_at_10%_90%,var(--color-gold)_0,transparent_35%),radial-gradient(circle_at_90%_90%,var(--color-gold)_0,transparent_35%)]" />
        </div>

        {/* ── Invitation card (slides upward on open) ── */}
        <div
          ref={cardRef}
          className="paper-grain absolute inset-x-3 bottom-5 top-[20%] rounded-sm bg-[var(--color-cream)] border border-[var(--color-gold)]/70 shadow-[0_4px_12px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center px-5 py-4 text-center"
          style={{ zIndex: 2 }}
        >
          {/* Card inner decorative border */}
          <div className="absolute inset-2 border border-[var(--color-gold)]/30 rounded pointer-events-none" />

          <img
            src={ganeshSymbol}
            alt=""
            aria-hidden="true"
            className="w-10 h-10 mb-3 opacity-90"
          />
          <p className="font-display text-2xl text-[var(--color-maroon)] font-medium leading-snug">
            {invitation.couple.tagline}
          </p>
          {/* Gold divider line */}
          <div className="w-8 h-px bg-[var(--color-gold)]/50 my-3" />
          <p className="font-utility text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold-deep)]">
            {invitation.weddingDate.display}
          </p>
        </div>

        {/* ── Envelope flap (top triangle, hinges from top edge) ── */}
        <div
          ref={flapRef}
          className="absolute inset-x-0 top-0 h-[45%] origin-top"
          style={{
            transformStyle: "preserve-3d",
            zIndex: 3,
            clipPath: "polygon(0 0, 100% 0, 52% 100%)",
            backgroundColor: "var(--color-cream)",
            backgroundImage:
              "linear-gradient(160deg, var(--color-cream) 0%, var(--color-cream-deep) 100%)",
            boxShadow: "0 8px 20px rgba(90,20,20,0.2)",
            borderBottom: "1px solid rgba(201,162,75,0.4)",
          }}
        />
        {/* Flap fold crease hint */}
        <div
          className="absolute top-[44.5%] left-[8%] right-[8%] h-px bg-[var(--color-gold)]/20 pointer-events-none"
          style={{ zIndex: 4 }}
        />

        {/* ── Wax seal + tap target, centered on the flap ── */}
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          aria-label="Tap to open the wedding invitation"
          className="tap-target absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 group"
          style={{ zIndex: 4 }}
        >
          <span className="font-utility text-[10px] tracking-[0.3em] uppercase text-[var(--color-ivory)]/90 drop-shadow-md">
            Tap to Open
          </span>
          <span className="relative w-20 h-20 sm:w-24 sm:h-24 block">
            <span
              ref={sealRef}
              className="absolute inset-0 rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-4px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 group-active:scale-95"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #b83045, var(--color-maroon-deep) 72%)",
              }}
            >
              <span className="font-display text-xl sm:text-2xl text-[var(--color-gold-soft)] font-semibold drop-shadow-sm">
                {invitation.couple.initials}
              </span>
            </span>
            {/* Crack overlay, revealed the moment the seal breaks */}
            <span
              ref={crackRef}
              className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 90deg, transparent 0deg, rgba(0,0,0,0.35) 2deg, transparent 4deg, transparent 178deg, rgba(0,0,0,0.35) 180deg, transparent 182deg)",
              }}
            />
          </span>
        </button>

        {/* Outer gold decorative border frame */}
        <div
          className="absolute -inset-1 rounded-lg border-2 border-[var(--color-gold)]/30 pointer-events-none"
          style={{ zIndex: 1 }}
        />
      </div>
    </div>
  );
}
