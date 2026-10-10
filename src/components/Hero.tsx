"use client";

import { useRef } from "react";
import { totals } from "@/content/site";
import { CalendarMock } from "./CalendarMock";
import { CountUp } from "./CountUp";
import { CursorRing, Letters, Magnetic, RotatingWords } from "./HeroFx";
import { HeroNetwork } from "./HeroNetwork";
import { ButtonLink, RotatingBadge } from "./ui";

/** Riadok nadpisu, ktorý sa pri pohybe myši posúva o `depth` px (hĺbka). */
function Line({ depth, children, className = "" }: { depth: number; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`block overflow-hidden transition-transform duration-500 ease-out ${className}`}
      style={{ transform: `translate3d(calc(var(--px) * ${depth}px), calc(var(--py) * ${depth * 0.6}px), 0)` }}
    >
      {children}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  // Svetlo za kurzorom, hĺbka nadpisu a naklonenie kalendára
  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--px", `${x - 0.5}`);
    el.style.setProperty("--py", `${y - 0.5}`);
    if (tilt.current) {
      tilt.current.style.transform = `perspective(1400px) rotateY(${(x - 0.5) * -18 - 10}deg) rotateX(${(y - 0.5) * 14 + 6}deg)`;
    }
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain panel mesh-dark edge-slant-bottom relative mt-2 overflow-hidden pt-32 text-white md:mt-3 md:pt-40"
      style={{ "--mx": "70%", "--my": "30%", "--px": "0", "--py": "0" } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(650px circle at var(--mx) var(--my), rgb(249 122 31 / 0.18), transparent 60%)",
        }}
        aria-hidden
      />
      <HeroNetwork />
      <CursorRing hostRef={ref} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <p className="fade-up flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-white/55 uppercase">
            <span className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-brand" />
              <span className="relative size-2 rounded-full bg-brand" />
            </span>
            Akvizičný systém pre firmy so službami
          </p>
          <p
            className="fade-up hidden text-[11px] font-semibold tracking-[0.2em] text-white/35 uppercase lg:block"
            style={{ animationDelay: "1400ms" }}
          >
            Pohnite myšou · Kliknite kamkoľvek
          </p>
        </div>

        <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
          <h1
            aria-label="Plný kalendár. Každý týždeň."
            className="text-[17vw] leading-[0.86] font-extrabold tracking-[-0.045em] sm:text-[13vw] lg:text-[9.2vw] xl:text-[8.6rem]"
          >
            <span aria-hidden>
              <Line depth={-14} className="pb-[0.06em]">
                <Letters text="Plný" />
              </Line>
              <Line depth={-26} className="pb-[0.06em]">
                <Letters text="kalendár." delay={140} />
              </Line>
              <Line depth={-40} className="accent pr-[0.1em] pb-[0.14em] text-[0.66em] text-brand sm:text-[0.8em]">
                <RotatingWords words={["Každý týždeň.", "Bez naháňania.", "Na autopilote."]} delay={460} />
              </Line>
            </span>
          </h1>

          <div className="fade-up relative lg:mb-6" style={{ animationDelay: "700ms" }}>
            <div
              ref={tilt}
              className="mx-auto max-w-md transition-transform duration-500 ease-out will-change-transform lg:max-w-none"
              style={{ transform: "perspective(1400px) rotateY(-10deg) rotateX(6deg)" }}
            >
              <CalendarMock />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 pb-16 md:items-center md:pb-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="fade-up max-w-xl" style={{ animationDelay: "850ms" }}>
            <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
              Reklamy na sociálnych sieťach, web na mieru, CRM s automatickými e-mailmi a obsah.
              Jeden systém, ktorý vám každý týždeň prináša nové dopyty a stretnutia.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink href="#kontakt" className="w-full sm:w-auto">
                  Chcem viac zákazníkov
                </ButtonLink>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink href="#system" variant="ghost-dark" className="w-full sm:w-auto">
                  Ako to funguje
                </ButtonLink>
              </Magnetic>
            </div>
          </div>

          <div className="fade-up flex items-end justify-between gap-6" style={{ animationDelay: "1000ms" }}>
            <dl className="grid flex-1 grid-cols-3 gap-5">
              {totals.map((p) => (
                <div key={p.label} className="border-l border-white/15 pl-4">
                  <dt className="sr-only">{p.label}</dt>
                  <dd className="text-2xl font-extrabold tracking-tight whitespace-nowrap xl:text-3xl">
                    <CountUp value={p.value} />
                  </dd>
                  <dd className="mt-1 text-xs text-white/50 sm:text-sm">{p.label}</dd>
                </div>
              ))}
            </dl>
            <span className="hidden shrink-0 lg:block">
              <Magnetic strength={0.25}>
                <a href="#recenzie" aria-label="Pokračovať nižšie">
                  <RotatingBadge id="badge-hero" text="Scrollujte · Pozrite výsledky · " />
                </a>
              </Magnetic>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
