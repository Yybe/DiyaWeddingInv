import React, { useEffect, useRef, useState } from "react";

/**
 * WeddingEnvelope
 * -----------------------------------------------------------------------
 * A full-screen "closed envelope" onboarding overlay for a wedding site.
 * A wax seal stamped with the couple's initials sits at the center of the
 * envelope's back, where all four paper flaps meet (the classic closed-
 * envelope look). Tapping the seal folds the top flap open, the invitation
 * card rises up out of the pocket, then the whole envelope fades and
 * scales away to reveal whatever sits underneath it in the DOM (your real
 * site).
 *
 * HOW TO USE ON YOUR EXISTING SITE
 * -----------------------------------------------------------------------
 * Render <WeddingEnvelope /> as the LAST thing in your root layout, on
 * top of your real page (it positions itself with fixed inset:0, so it
 * just needs to be a sibling that comes after your page content in the
 * DOM — that's already handled here via z-index too).
 *
 *   function App() {
 *     return (
 *       <>
 *         <YourRealWeddingSite />
 *         <WeddingEnvelope
 *           bride="D"
 *           groom="A"
 *           onOpen={() => { ... optional: fire analytics, play a chime, etc }}
 *         />
 *       </>
 *     );
 *   }
 *
 * The component removes itself from the DOM (returns null) once the
 * fade-out finishes, so your site underneath becomes fully interactive
 * automatically — you don't need to manage any show/hide state yourself.
 * If you'd rather control unmounting from a parent, pass `onOpen` and
 * conditionally render <WeddingEnvelope/> yourself instead.
 *
 * No Tailwind or external CSS required — styles are self-contained.
 */

export default function WeddingEnvelope({
  bride = "D",
  groom = "A",
  hint = "Tap the seal to open",
  onOpen,
}) {
  // closed -> opening -> fading -> done
  const [stage, setStage] = useState("closed");
  const prefersReducedMotion = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => timers.current.forEach(clearTimeout);
  }, []);

  const handleOpen = () => {
    if (stage !== "closed") return;

    const fast = prefersReducedMotion.current;
    setStage("opening");

    timers.current.push(
      setTimeout(() => setStage("fading"), fast ? 60 : 1150)
    );
    timers.current.push(
      setTimeout(() => {
        setStage("done");
        onOpen && onOpen();
      }, fast ? 260 : 1150 + 850)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  if (stage === "done") return null;

  return (
    <div
      className={`wenv-overlay wenv-stage-${stage}`}
      aria-hidden={stage === "fading" || stage === "done"}
    >
      <div className="wenv-stage-wrap">
        <div className="wenv-envelope">
          <div className="wenv-card">
            <span className="wenv-card-mono">
              {bride}
              <span className="wenv-amp">&amp;</span>
              {groom}
            </span>
            <span className="wenv-card-sub">together with their families</span>
          </div>

          <div className="wenv-body">
            <div className="wenv-tri wenv-tri-left" />
            <div className="wenv-tri wenv-tri-right" />
            <div className="wenv-tri wenv-tri-bottom" />
            <div className="wenv-flap" />
          </div>

          <button
            type="button"
            className="wenv-seal"
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            aria-label={`Open the invitation, sealed for ${bride} and ${groom}`}
            disabled={stage !== "closed"}
          >
            <span className="wenv-seal-initials">
              {bride}
              <span className="wenv-amp">&amp;</span>
              {groom}
            </span>
          </button>
        </div>

        <p className="wenv-hint" aria-hidden={stage !== "closed"}>
          {hint}
        </p>
      </div>

      <style>{`
        .wenv-overlay {
          position: fixed;
          inset: 0;
          height: 100dvh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 50% 30%, #2f2a24 0%, #201c17 70%, #17130f 100%);
          z-index: 2147483000;
          padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
          transition: opacity 0.75s ease;
          opacity: 1;
        }
        .wenv-stage-fading { opacity: 0; }
        .wenv-stage-fading .wenv-stage-wrap { transform: scale(1.04); }

        .wenv-stage-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(18px, 4vh, 30px);
          transition: transform 1s cubic-bezier(.22,.61,.36,1);
          padding: 0 20px;
        }

        .wenv-envelope {
          width: clamp(260px, 82vw, 400px);
          aspect-ratio: 3 / 2;
          position: relative;
          perspective: 1600px;
          filter: drop-shadow(0 20px 36px rgba(0,0,0,0.5));
        }

        /* ---- the letter, hidden inside the pocket until opened ---- */
        .wenv-card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 76%;
          height: 70%;
          background: linear-gradient(180deg, #fffdf8, #f7f0e2);
          border-radius: 3px;
          box-shadow: 0 10px 22px rgba(40, 28, 10, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transform: translate(-50%, -22%);
          opacity: 0;
          z-index: 2;
          transition: transform 1.05s cubic-bezier(.22,1,.36,1) 0.35s,
                      opacity 0.5s ease 0.35s;
        }
        .wenv-stage-opening .wenv-card,
        .wenv-stage-fading .wenv-card {
          transform: translate(-50%, -78%);
          opacity: 1;
        }

        .wenv-card-mono {
          font-family: "Playfair Display", Georgia, "Times New Roman", serif;
          font-style: italic;
          font-size: clamp(19px, 5.2vw, 28px);
          color: #6d1f27;
          letter-spacing: 0.04em;
        }
        .wenv-card-sub {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(9px, 2.2vw, 11px);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8a7960;
        }
        .wenv-amp {
          margin: 0 0.22em;
          font-style: italic;
          opacity: 0.85;
        }

        /* ---- envelope back: four paper flaps meeting at the centre ---- */
        .wenv-body {
          position: absolute;
          inset: 0;
          border-radius: 6px;
          overflow: hidden;
          background: #dcc79c;
          transform-style: preserve-3d;
          box-shadow: inset 0 0 0 1px rgba(120, 92, 51, 0.18);
          z-index: 1;
        }

        .wenv-tri {
          position: absolute;
          inset: 0;
        }
        .wenv-tri-left {
          background: linear-gradient(115deg, #e6d6b3, #d8c197);
          clip-path: polygon(0 0, 0 100%, 50% 50%);
        }
        .wenv-tri-right {
          background: linear-gradient(245deg, #e6d6b3, #d8c197);
          clip-path: polygon(100% 0, 100% 100%, 50% 50%);
        }
        .wenv-tri-bottom {
          background: linear-gradient(0deg, #f2e6c8, #e2cf9f);
          clip-path: polygon(0 100%, 100% 100%, 50% 50%);
          box-shadow: inset 0 8px 10px -8px rgba(90, 66, 32, 0.35);
        }

        .wenv-flap {
          position: absolute;
          inset: 0;
          clip-path: polygon(0 0, 100% 0, 50% 50%);
          background: linear-gradient(200deg, #f2e6c8 0%, #e0ca9c 100%);
          box-shadow: inset 0 -10px 14px -10px rgba(90, 66, 32, 0.4);
          transform-origin: 50% 0%;
          transform: rotateX(0deg);
          backface-visibility: hidden;
          transition: transform 1.1s cubic-bezier(.22,.61,.36,1);
          z-index: 3;
        }
        .wenv-stage-opening .wenv-flap,
        .wenv-stage-fading .wenv-flap {
          transform: rotateX(-172deg);
        }

        /* ---- wax seal, centred where all four flaps meet ---- */
        .wenv-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(62px, 16.5vw, 80px);
          height: clamp(62px, 16.5vw, 80px);
          transform: translate(-50%, -50%);
          border-radius: 46% 54% 52% 48% / 53% 46% 54% 47%;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 32% 28%, #a5343a, #711018 62%, #530910 100%);
          box-shadow:
            0 7px 16px rgba(0,0,0,0.42),
            inset 0 2px 3px rgba(255,255,255,0.28),
            inset 0 -7px 11px rgba(0,0,0,0.4);
          cursor: pointer;
          z-index: 4;
          transition: transform 1.1s cubic-bezier(.22,.61,.36,1), opacity 0.45s ease 0.05s;
          -webkit-tap-highlight-color: transparent;
        }
        .wenv-seal::before {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: inherit;
          border: 1px solid rgba(244, 234, 214, 0.4);
        }
        .wenv-seal:active { transform: translate(-50%, -50%) scale(0.94); }
        .wenv-seal:focus-visible { outline: 3px solid #f4ead6; outline-offset: 4px; }
        .wenv-stage-opening .wenv-seal,
        .wenv-stage-fading .wenv-seal {
          transform: translate(-50%, -50%) rotateX(-172deg) scale(0.85);
          opacity: 0;
          pointer-events: none;
        }

        .wenv-seal-initials {
          position: relative;
          font-family: "Playfair Display", Georgia, "Times New Roman", serif;
          font-style: italic;
          font-size: clamp(15px, 3.8vw, 19px);
          color: #f2e2c2;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 0 rgba(0,0,0,0.4), 0 -1px 0 rgba(255,255,255,0.15);
        }

        .wenv-hint {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(11px, 3vw, 13px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #cdbfa2;
          text-align: center;
          transition: opacity 0.4s ease;
        }
        .wenv-stage-opening .wenv-hint,
        .wenv-stage-fading .wenv-hint {
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .wenv-flap, .wenv-card, .wenv-seal, .wenv-hint, .wenv-overlay, .wenv-stage-wrap {
            transition-duration: 0.15s !important;
          }
        }
      `}</style>
    </div>
  );
}
