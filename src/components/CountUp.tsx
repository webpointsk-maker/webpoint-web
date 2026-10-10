"use client";

import { useEffect, useRef, useState } from "react";

/** Číslo, ktoré sa napočíta, keď sa objaví na obrazovke. Zachová formát, napr. "17 406" alebo "3,53 €". */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^([^\d]*)(\d{1,3}(?:[ \u00a0]\d{3})*(?:,\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(match ? format(0, match[2]) : value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    const target = Number(match[2].replace(/[ \u00a0]/g, "").replace(",", "."));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const done = requestAnimationFrame(() => setShown(match[2]));
      return () => cancelAnimationFrame(done);
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(t === 1 ? match[2] : format(target * eased, match[2]));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      <span aria-hidden>
        {match?.[1]}
        {shown}
        {match?.[3]}
      </span>
    </span>
  );
}

function format(n: number, template: string) {
  const decimals = template.includes(",") ? template.split(",")[1].length : 0;
  const [int, dec] = n.toFixed(decimals).split(".");
  const grouped = template.includes(" ") ? int.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : int;
  return dec ? `${grouped},${dec}` : grouped;
}
