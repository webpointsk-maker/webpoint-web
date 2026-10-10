"use client";

import { useEffect, useRef, useState } from "react";

/** Text, ktorý sa pri scrollovaní rozsvecuje slovo po slove. Slová v *hviezdičkách* sú zvýraznené. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(raf);
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 keď sa text objaví dole, 1 keď jeho spodok prejde stredom obrazovky
      const p = (vh * 0.9 - r.top) / (r.height + vh * 0.35);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const words = text.split(" ");
  const plain = text.replaceAll("*", "");

  return (
    <p ref={ref} className={className} aria-label={plain}>
      {words.map((w, i) => {
        const lit = progress * words.length > i;
        const accent = w.startsWith("*");
        return (
          <span key={i} aria-hidden>
            <span
              className={`transition-[color,opacity] duration-300 ${accent ? "accent text-brand" : ""} ${
                lit ? "opacity-100" : "opacity-[0.15]"
              }`}
            >
              {w.replaceAll("*", "")}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
