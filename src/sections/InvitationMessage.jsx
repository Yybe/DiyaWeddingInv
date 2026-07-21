import { motion } from "framer-motion";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";
import CornerMotif from "../components/CornerMotif";

export default function InvitationMessage() {
  return (
    <section className="relative px-6 py-16 sm:py-20 bg-[var(--color-cream)]">
      <CornerMotif position="top-left" />
      <CornerMotif position="bottom-right" />

      <motion.div
        className="relative max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <SectionHeading eyebrow={invitation.hosts.invitationFrom} title="With Blessings" />

        <p className="font-display text-xl sm:text-2xl text-[var(--color-ink)] leading-relaxed">
          {invitation.hosts.parents}
        </p>

        <p className="font-utility text-sm text-[var(--color-gold-deep)] mt-4 leading-relaxed">
          {invitation.hosts.address}
        </p>

        <p className="font-utility text-sm text-[var(--color-ink)] mt-2 tracking-wide">
          {invitation.hosts.phones.join(" \u00b7 ")}
        </p>
      </motion.div>
    </section>
  );
}
