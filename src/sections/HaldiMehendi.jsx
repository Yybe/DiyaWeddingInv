import { motion } from "framer-motion";
import { Sparkles, Music2 } from "lucide-react";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";

const { haldi, mehendi, date } = invitation.preWeddingEvents;

const cards = [
  {
    icon: Sparkles,
    title: haldi.title,
    time: haldi.time,
    description: haldi.description,
    accent: "var(--color-gold-deep)",
  },
  {
    icon: Music2,
    title: mehendi.title,
    time: mehendi.time,
    description: mehendi.description,
    accent: "var(--color-maroon)",
  },
];

export default function HaldiMehendi() {
  return (
    <section className="relative px-6 py-16 sm:py-20 bg-gradient-to-b from-[var(--color-cream)] from-55% to-[var(--color-ivory)]">
      <SectionHeading eyebrow={date} title="Haldi & Mehendi" />

      <div className="max-w-md mx-auto flex flex-col gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-xl px-6 py-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <card.icon className="w-7 h-7 mx-auto mb-3" style={{ color: card.accent }} strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-semibold text-[var(--color-maroon)]">
              {card.title}
            </h3>
            <p className="font-utility text-xs tracking-[0.2em] uppercase text-[var(--color-gold-deep)] mt-1">
              {card.time}
            </p>
            <p className="font-display text-base text-[var(--color-ink)] mt-4 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
