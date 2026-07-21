import { motion } from "framer-motion";
import invitation from "../data/invitation";
import ganeshSymbol from "../assets/images/ganesh-symbol.png";
import coupleIllustration from "../assets/images/couple-illustration.png";
import MarigoldOverlay from "../components/MarigoldOverlay";
import OrnamentalDivider from "../components/OrnamentalDivider";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-16 pb-12 text-center overflow-hidden">
      <MarigoldOverlay />

      <motion.img
        src={ganeshSymbol}
        alt="Om Shri Ganeshaya Namah"
        className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      <motion.p
        className="relative z-10 font-utility text-[11px] tracking-[0.35em] uppercase text-[var(--color-gold-deep)] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {invitation.invocation.label}
      </motion.p>

      <motion.div
        className="relative z-10 mb-6"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
      >
        <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[var(--color-gold)] p-2 shadow-[0_10px_30px_rgba(122,31,43,0.18)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-cream)] border border-[var(--color-gold-soft)]">
            <img
              src={coupleIllustration}
              alt="Illustration of Diya and Abhishek"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.h1
        className="relative z-10 font-display text-4xl sm:text-5xl font-semibold text-[var(--color-maroon)] leading-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8 }}
      >
        {invitation.couple.bride}
        <span className="block font-script text-3xl sm:text-4xl text-[var(--color-gold-deep)] my-1 font-normal">
          weds
        </span>
        {invitation.couple.groom}
      </motion.h1>

      <motion.p
        className="relative z-10 font-script text-2xl text-[var(--color-maroon)] mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.8 }}
      >
        {invitation.couple.subtitle}
      </motion.p>

      <OrnamentalDivider className="relative z-10 mt-6 mb-4" />

      <motion.p
        className="relative z-10 font-utility text-sm tracking-[0.15em] uppercase text-[var(--color-ink)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {invitation.weddingDate.weekday} &middot; {invitation.weddingDate.display}
      </motion.p>
    </section>
  );
}
