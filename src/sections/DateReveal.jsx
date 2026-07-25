import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";
import ScratchHeart from "../components/ScratchHeart";
import useCountdown from "../hooks/useCountdown";

const GOLD_CONFETTI_COLORS = ["#C9A24B", "#7A1F2B", "#DEC17E", "#8C6A2F"];

function Confetti({ show }) {
  const pieces = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 260,
      rotate: Math.random() * 360,
      color: GOLD_CONFETTI_COLORS[i % GOLD_CONFETTI_COLORS.length],
      delay: Math.random() * 0.2,
    }))
  ).current;

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-visible">
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute w-2 h-3 rounded-sm"
              style={{ backgroundColor: p.color, top: "20%" }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: p.x, y: 220, opacity: 0, rotate: p.rotate }}
              transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-lg px-3 py-3 w-16 sm:w-20">
      <span className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-maroon)] tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-utility text-[9px] tracking-[0.2em] uppercase text-[var(--color-gold-deep)] mt-1">
        {label}
      </span>
    </div>
  );
}

export default function DateReveal() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const celebratedOnce = useRef(false);
  const countdown = useCountdown(invitation.weddingDate.iso);

  const handleReveal = useCallback(() => {
    setRevealedCount((c) => {
      const next = c + 1;
      if (next === 3 && !celebratedOnce.current) {
        celebratedOnce.current = true;
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 1600);
      }
      return next;
    });
  }, []);

  const allRevealed = revealedCount >= 3;

  return (
    <section className="relative px-6 py-16 sm:py-20 bg-gradient-to-b from-[var(--color-ivory)] from-55% to-[var(--color-cream)] overflow-hidden">
      <SectionHeading eyebrow="A Date to Remember" title="Reveal the Date" />

      <p className="text-center font-utility text-sm text-[var(--color-ink)]/80 max-w-xs mx-auto mb-8">
        Scratch each golden heart to uncover the day we say &ldquo;I do&rdquo;.
      </p>

      <div className="relative max-w-sm mx-auto flex items-start justify-center gap-4 sm:gap-6">
        <Confetti show={celebrate} />
        <ScratchHeart label="Day" onRevealed={handleReveal}>
          {invitation.weddingDate.day}
        </ScratchHeart>
        <ScratchHeart label="Month" onRevealed={handleReveal}>
          {invitation.weddingDate.month}
        </ScratchHeart>
        <ScratchHeart label="Year" onRevealed={handleReveal}>
          {invitation.weddingDate.year}
        </ScratchHeart>
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            className="mt-12 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-center font-utility text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold-deep)] mb-4">
              Counting Down To Forever
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownUnit value={countdown.hours} label="Hrs" />
              <CountdownUnit value={countdown.minutes} label="Min" />
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
