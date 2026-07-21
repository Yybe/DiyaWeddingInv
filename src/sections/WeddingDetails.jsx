import { motion } from "framer-motion";
import { CalendarHeart, Clock, MapPin } from "lucide-react";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";

const items = [
  {
    icon: CalendarHeart,
    label: "Date",
    value: invitation.weddingEvent.date,
  },
  {
    icon: Clock,
    label: "Time",
    value: invitation.weddingEvent.time,
  },
  {
    icon: MapPin,
    label: "Venue",
    value: invitation.weddingEvent.venueName,
  },
];

export default function WeddingDetails() {
  return (
    <section className="relative px-6 py-16 sm:py-20 bg-[var(--color-cream)]">
      <SectionHeading eyebrow="Save the Date" title="Wedding Details" />

      <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            className="flex sm:flex-col items-center gap-4 sm:gap-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-lg px-5 py-4 sm:py-6 text-left sm:text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <Icon className="w-6 h-6 text-[var(--color-maroon)] shrink-0" strokeWidth={1.5} />
            <div>
              <p className="font-utility text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold-deep)]">
                {label}
              </p>
              <p className="font-display text-lg text-[var(--color-ink)] font-medium">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
