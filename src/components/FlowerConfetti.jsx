import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FLOWER_HEART_COLORS = [
  "#FF6B8B", // Pink
  "#FFD166", // Yellow
  "#7AC74F", // Green
  "#118AB2", // Blue
  "#EF476F", // Coral
  "#06D6A0", // Mint
  "#7209B7", // Purple
];

/**
 * Flower/heart shaped confetti explosion
 */
export default function FlowerConfetti({ trigger = false }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      // Create flower/heart confetti pieces
      const newPieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        type: i % 3 === 0 ? "heart" : "flower", // Mix of hearts and flowers
        size: 12 + Math.random() * 16,
        color: FLOWER_HEART_COLORS[i % FLOWER_HEART_COLORS.length],
        startX: 0,
        startY: 0,
        endX: (Math.random() - 0.5) * 600, // Spread horizontally
        endY: 400 + Math.random() * 300, // Fall downward
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        delay: Math.random() * 0.4,
        duration: 1.5 + Math.random() * 1.5,
      }));
      
      setPieces(newPieces);

      // Clear confetti after animation
      const timer = setTimeout(() => {
        setPieces([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[2147482999] overflow-visible">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute top-0 left-1/2"
              style={{
                marginLeft: -piece.size / 2,
                marginTop: -piece.size / 2,
              }}
              initial={{
                x: piece.startX,
                y: piece.startY,
                opacity: 1,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                x: piece.endX,
                y: piece.endY,
                opacity: [1, 1, 0],
                rotate: piece.rotation + piece.rotationSpeed * 360,
                scale: [0, 1, 1, 0.8],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeOut",
                times: [0, 0.2, 0.8, 1],
              }}
            >
              <svg
                width={piece.size}
                height={piece.size}
                viewBox="0 0 24 24"
                fill={piece.color}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.8"
              >
                {piece.type === "heart" ? (
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                ) : (
                  <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
                )}
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}