import invitation from "../data/invitation";
import OrnamentalDivider from "../components/OrnamentalDivider";
import ganeshSymbol from "../assets/images/ganesh-symbol.png";

export default function Footer() {
  return (
    <footer className="relative px-6 py-16 text-center bg-[var(--color-maroon-deep)] text-[var(--color-ivory)]">
      <img src={ganeshSymbol} alt="" aria-hidden="true" className="w-10 h-10 mx-auto mb-6 opacity-90" />

      <p className="font-utility text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-soft)] mb-2">
        {invitation.compliments.title}
      </p>
      <div className="font-display text-base leading-relaxed mb-8">
        {invitation.compliments.names.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>

      <OrnamentalDivider className="mb-8 opacity-70" />

      <p className="font-utility text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-soft)] mb-2">
        {invitation.specialInvitation.title}
      </p>
      <div className="font-display text-base leading-relaxed">
        {invitation.specialInvitation.names.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>

      <p className="font-script text-2xl text-[var(--color-gold-soft)] mt-10">
        {invitation.couple.bride} &amp; {invitation.couple.groom}
      </p>
      <p className="font-utility text-[10px] tracking-[0.25em] uppercase text-[var(--color-ivory)]/60 mt-2">
        {invitation.weddingDate.display}
      </p>
    </footer>
  );
}
