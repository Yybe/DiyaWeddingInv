import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * FloatingPetals — subtle, slow-moving decorative flower petals / light
 * particles that drift across section boundaries, reinforcing the
 * "continuous canvas" feel. Rendered as a fixed full-screen overlay so
 * petals float freely across the entire page regardless of section breaks.
 *
 * Props:
 *   density – number of petal particles (default 8, keep low for elegance)
 *   color   – CSS color (default gold-ish)
 */
export default function FloatingPetals({
  density = 8,
  color = "var(--color-gold)",
  className = "",
}) {
  // Stable seed once per mount
  const petals = useMemo(() => {
    const result = [];
    for (let i = 0; i < density; i++) {
      const seed = i / density;
      result.push({
        id: i,
        // Distribute across viewport horizontally
        left: seed * 90 + 5 + (Math.random() - 0.5) * 6, // % from edge
        // Start at various vertical positions so they aren't all at the top
        startY: -10 - Math.random() * 30,
        // Duration varies from 25-45s for a slow, dreamy drift
        duration: 30 + Math.random() * 20,
        delay: Math.random() * -40, // negative so some are already mid-animation
        size: 6 + Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.12,
        // Slight horizontal wobble
        wobble: (Math.random() - 0.5) * 40,
      });
    }
    return result;
  }, [density]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: 0,
            filter: "blur(1px)",
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
          initial={{
            y: p.startY,
            opacity: 0,
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, p.wobble, -p.wobble * 0.6, p.wobble * 0.3, 0],
            opacity: [0, p.opacity, p.opacity, p.opacity * 0.6, 0],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
            opacity: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
              times: [0, 0.1, 0.6, 0.85, 1],
            },
          }}
        />
      ))}
    </div>
  );
}
