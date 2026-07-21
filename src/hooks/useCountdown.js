import { useEffect, useState } from "react";

function computeRemaining(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, done: false };
}

/** Live countdown to the wedding date, recalculated every second. */
export default function useCountdown(targetIso) {
  const [remaining, setRemaining] = useState(() => computeRemaining(targetIso));

  useEffect(() => {
    const id = setInterval(() => setRemaining(computeRemaining(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return remaining;
}
