import { useState, useRef, useEffect } from "react";
import Envelope from "./components/Envelope";
import Hero from "./sections/Hero";
import InvitationMessage from "./sections/InvitationMessage";
import BrideGroom from "./sections/BrideGroom";
import WeddingDetails from "./sections/WeddingDetails";
import DateReveal from "./sections/DateReveal";
import HaldiMehendi from "./sections/HaldiMehendi";
import Venue from "./sections/Venue";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [opened, setOpened] = useState(false);
  const siteRef = useRef(null);

  // Lock background scroll while the envelope is showing
  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
  }, [opened]);

  return (
    <>
      {!opened && <Envelope onOpened={() => setOpened(true)} />}

      <main
        ref={siteRef}
        aria-hidden={!opened}
        className="min-h-screen bg-[var(--color-ivory)]"
      >
        <Hero />
        <InvitationMessage />
        <BrideGroom />
        <WeddingDetails />
        <DateReveal />
        <HaldiMehendi />
        <Venue />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
