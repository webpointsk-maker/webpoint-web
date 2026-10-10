"use client";

import { useEffect, useRef, useState } from "react";

/** Oranžový krúžok, ktorý v úvode sleduje kurzor a nad tlačidlami sa zväčší. Len pre myš. */
export function CursorRing({ hostRef }: { hostRef: React.RefObject<HTMLElement | null> }) {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let scale = 1;
    let inside = false;
    let hover = false;
    let raf = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      scale += ((hover ? 2.2 : 1) - scale) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x - 18}px, ${pos.y - 18}px, 0) scale(${scale})`;
        ring.current.style.opacity = inside ? "1" : "0";
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
        dot.current.style.opacity = inside && !hover ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!inside) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      inside = true;
      hover = !!(e.target as HTMLElement).closest("a, button");
    };
    const onLeave = () => {
      inside = false;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [hostRef]);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] size-9 rounded-full border-2 border-brand opacity-0 mix-blend-screen transition-opacity duration-300"
        style={{ boxShadow: "0 0 24px rgb(249 122 31 / 0.5)" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] size-1.5 rounded-full bg-brand opacity-0 transition-opacity duration-200"
      />
    </>
  );
}

/** Obsah sa jemne „prilepí“ ku kurzoru, keď je blízko. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

/** Text rozdelený na písmená, ktoré sa postupne vysunú zospodu. */
export function Letters({ text, delay = 0, step = 35 }: { text: string; delay?: number; step?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter-rise inline-block"
          style={{ animationDelay: `${delay + i * step}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

/** Striedajúce sa slová (napr. „Každý týždeň.“ → „Bez naháňania.“). */
export function RotatingWords({ words, interval = 2800, delay = 0 }: { words: string[]; interval?: number; delay?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [words.length, interval, delay]);

  return (
    <span key={index} className="inline-block whitespace-nowrap">
      <Letters text={words[index]} delay={index === 0 ? delay : 0} step={28} />
    </span>
  );
}
