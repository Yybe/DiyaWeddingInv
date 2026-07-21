import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import invitation from "../data/invitation";
import SectionHeading from "../components/SectionHeading";

function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function VenueCard({ label, name, address, date, time, mapsQuery, delay }) {
  return (
    <motion.div
      className="bg-[var(--color-cream)] border border-[var(--color-gold)]/40 rounded-xl px-6 py-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="font-utility text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold-deep)] mb-2">
        {label}
      </p>
      <MapPin className="w-6 h-6 mx-auto text-[var(--color-maroon)] mb-2" strokeWidth={1.5} />
      <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">{name}</h3>
      <p className="font-utility text-sm text-[var(--color-ink)]/75 mt-2 leading-relaxed">
        {address}
      </p>
      {(date || time) && (
        <p className="font-display text-base text-[var(--color-maroon)] mt-3">
          {date} {date && time && <span className="text-[var(--color-gold-deep)]">&middot;</span>} {time}
        </p>
      )}
      <a
        href={mapsUrl(mapsQuery)}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-[var(--color-maroon)] text-[var(--color-ivory)] font-utility text-xs tracking-[0.15em] uppercase hover:bg-[var(--color-maroon-deep)] transition-colors"
      >
        Open in Google Maps
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

export default function Venue() {
  const { weddingEvent, preWeddingEvents } = invitation;
  return (
    <section className="relative px-6 py-16 sm:py-20 bg-[var(--color-ivory)]">
      <SectionHeading eyebrow="Where to Find Us" title="Venues" />

      <div className="max-w-md mx-auto flex flex-col gap-6">
        <VenueCard
          label="Wedding Ceremony"
          name={weddingEvent.venueName}
          address={weddingEvent.venueAddress}
          date={weddingEvent.date}
          time={weddingEvent.time}
          mapsQuery={weddingEvent.mapsQuery}
          delay={0}
        />
        <VenueCard
          label="Haldi & Mehendi"
          name={preWeddingEvents.venueName}
          address={preWeddingEvents.venueAddress}
          date={preWeddingEvents.date}
          time={`${preWeddingEvents.haldi.time.split(" ")[0]} / ${preWeddingEvents.mehendi.time.split(" ")[0]}`}
          mapsQuery={preWeddingEvents.mapsQuery}
          delay={0.15}
        />
      </div>
    </section>
  );
}
