import OrnamentalDivider from "./OrnamentalDivider";

export default function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <div className={`text-center mb-8 sm:mb-10 ${className}`}>
      {eyebrow && (
        <p className="font-utility text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-gold-deep)] mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-maroon)] font-semibold">
        {title}
      </h2>
      <OrnamentalDivider className="mt-4" />
    </div>
  );
}
