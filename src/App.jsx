import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import WeddingEnvelope from "./components/WeddingEnvelope";
import Hero from "./sections/Hero";
import InvitationMessage from "./sections/InvitationMessage";
import BrideGroom from "./sections/BrideGroom";
import WeddingDetails from "./sections/WeddingDetails";
import DateReveal from "./sections/DateReveal";
import HaldiMehendi from "./sections/HaldiMehendi";
import Venue from "./sections/Venue";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import SectionBlend from "./components/SectionBlend";
import FloatingPetals from "./components/FloatingPetals";

export default function App() {
  const [stage, setStage] = useState("envelope"); // "envelope" | "revealed"

  /** Called when the envelope starts fading out (~1150ms after seal tap) */
  const handleFading = useCallback(() => {
    setStage("revealed");
  }, []);

  // Lock background scroll while the envelope is showing,
  // and match body background to prevent flash between states
  useEffect(() => {
    const revealed = stage === "revealed";
    document.body.style.overflow = revealed ? "auto" : "hidden";
    document.body.style.background = revealed
      ? "var(--color-ivory)"
      : "#5C1420";
  }, [stage]);

  return (
    <>
      {/* Main is ALWAYS rendered — never conditionally mounted.
          It starts invisible (opacity 0) behind the envelope.
          When the envelope begins to fade, we animate it in. */}
      <motion.main
        aria-hidden={stage !== "revealed"}
        className="min-h-screen relative"
        initial={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
        animate={
          stage === "revealed"
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 1.02, filter: "blur(6px)" }
        }
        transition={{
          duration: 1.3,
          ease: [0.22, 0.61, 0.36, 1],
        }}
      >
        {/* Floating petals drift across the entire page */}
        <FloatingPetals density={6} />

        <Hero />

        <SectionBlend direction="up" fillColor="var(--color-cream)" />
        <InvitationMessage />
        <SectionBlend direction="down" fillColor="var(--color-ivory)" />
        <BrideGroom />
        <SectionBlend direction="up" fillColor="var(--color-cream)" />
        <WeddingDetails />
        <SectionBlend direction="down" fillColor="var(--color-ivory)" />
        <DateReveal />
        <SectionBlend direction="up" fillColor="var(--color-cream)" />
        <HaldiMehendi />
        <SectionBlend direction="down" fillColor="var(--color-ivory)" />
        <Venue />
        <SectionBlend direction="up" fillColor="var(--color-cream)" />
        <Contact />
        {/* Footer gets its own blend — cream-to-maroon-deep transition */}
        <SectionBlend direction="down" fillColor="var(--color-maroon-deep)" />
        <Footer />
      </motion.main>

      <WeddingEnvelope
        bride="D"
        groom="A"
        onFading={handleFading}
      />
    </>
  );
}
