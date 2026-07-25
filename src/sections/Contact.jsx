import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";
import { formatPhoneDisplay, toTelHref } from "../utils/formatPhone";

export default function Contact() {
  return (
    <section className="relative px-6 py-16 sm:py-20 bg-gradient-to-b from-[var(--color-cream)] from-55% to-[var(--color-maroon-deep)]">
      <SectionHeading eyebrow={invitation.rsvp.title} title="Contact Us" />

      <div className="max-w-md mx-auto flex flex-col gap-3">
        {invitation.rsvp.contacts.map((contact, i) => (
          <motion.a
            key={contact.phone}
            href={toTelHref(contact.phone)}
            className="tap-target flex items-center justify-between gap-4 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-lg px-5 py-4 hover:border-[var(--color-gold)] transition-colors"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="font-display text-base text-[var(--color-ink)]">{contact.name}</span>
            <span className="flex items-center gap-2 font-utility text-sm text-[var(--color-maroon)] font-medium whitespace-nowrap">
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              {formatPhoneDisplay(contact.phone)}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
