import { motion } from "framer-motion";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";
import OrnamentalDivider from "../components/OrnamentalDivider";

export default function BrideGroom() {
  return (
    <section className="relative px-6 py-16 sm:py-20 bg-gradient-to-b from-[var(--color-ivory)] from-55% to-[var(--color-cream)]">
      <SectionHeading eyebrow="The Wedding" title="Bride & Groom" />

      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-display text-base sm:text-lg text-[var(--color-ink)] leading-relaxed">
          {invitation.brideDetails.intro}
        </p>

        <p className="font-script text-4xl text-[var(--color-maroon)] mt-6">
          {invitation.brideDetails.name}
        </p>
        <p className="font-utility text-xs text-[var(--color-gold-deep)] mt-3 leading-relaxed italic">
          {invitation.brideDetails.lineage}
        </p>

        <OrnamentalDivider className="my-8" />

        <p className="font-display text-lg text-[var(--color-ink)]">
          {invitation.groomDetails.connector}
        </p>
        <p className="font-script text-4xl text-[var(--color-maroon)] mt-3">
          {invitation.groomDetails.name}
        </p>
        <p className="font-utility text-xs text-[var(--color-gold-deep)] mt-3 leading-relaxed italic">
          {invitation.groomDetails.lineage}
        </p>
      </motion.div>
    </section>
  );
}
