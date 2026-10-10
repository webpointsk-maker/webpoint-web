"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarMock } from "./CalendarMock";
import { ButtonLink, Check, Eyebrow } from "./ui";

const steps = [
  {
    label: "Reklama",
    title: "Reklamy, ktoré zastavia scrollovanie",
    text: "Kampane na Facebooku a Instagrame zacielené na ľudí, ktorí vašu službu reálne potrebujú. Videá a kreatívy do reklám pripravíme my.",
  },
  {
    label: "Web",
    title: "Web na mieru, ktorý robí z ľudí dopyty",
    text: "Nie šablóna, ale stránka postavená na jednu vec: premeniť návštevníka z reklamy na kontakt alebo rezerváciu.",
  },
  {
    label: "CRM a e-maily",
    title: "Žiadny dopyt nezapadne",
    text: "Každý kontakt sa uloží do CRM, hneď dostane odpoveď a automatické pripomienky. Vy máte prehľad, kto je v akej fáze.",
  },
  {
    label: "Kalendár",
    title: "Vy len prídete na stretnutie",
    text: "Výsledkom sú dohodnuté termíny vo vašom kalendári. A organický obsah zatiaľ buduje dôveru, aby ľudia prišli už presvedčení.",
  },
];

export function System() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="system" className="grain panel mesh-dark edge-slant-top slant-in relative text-white">
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 md:pt-40">
        <Eyebrow index="03" dark>
          Akvizičný systém
        </Eyebrow>
        <h2 className="mt-8 max-w-5xl text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
          Štyri časti. <span className="accent text-brand">Jeden systém.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
          Samotná reklama nestačí. Zákazníkov prináša až to, keď na seba všetko nadväzuje.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-28 sm:px-6 md:pb-40 lg:grid-cols-2 lg:gap-20">
        {/* Kroky */}
        <div>
          {steps.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[55vh] flex-col justify-center border-b border-white/10 py-16 last:border-b-0 lg:min-h-[80vh]"
            >
              <div
                className={`transition-opacity duration-500 ${active === i ? "opacity-100" : "lg:opacity-30"}`}
              >
                <p className="flex items-center gap-4">
                  <span className="accent text-6xl text-brand">0{i + 1}</span>
                  <span className="text-xs font-bold tracking-[0.22em] text-white/50 uppercase">{s.label}</span>
                </p>
                <h3 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">{s.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/60">{s.text}</p>
                {/* Mobil: náhľad pri každom kroku */}
                <div className="mt-10 lg:hidden">
                  <Visual index={i} />
                </div>
              </div>
            </div>
          ))}
          <div className="pt-6">
            <ButtonLink href="#kontakt">Chcem takýto systém</ButtonLink>
          </div>
        </div>

        {/* Počítač: lepkavý náhľad */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative w-full">
              <div className="mb-8 flex gap-2">
                {steps.map((s, i) => (
                  <span
                    key={s.label}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i <= active ? "bg-brand" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <div className="relative aspect-[4/3.6]">
                {steps.map((s, i) => (
                  <div
                    key={s.label}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                      active === i
                        ? "translate-y-0 scale-100 opacity-100"
                        : active > i
                          ? "-translate-y-8 scale-95 opacity-0"
                          : "translate-y-8 scale-95 opacity-0"
                    }`}
                    aria-hidden={active !== i}
                  >
                    <Visual index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visual({ index }: { index: number }) {
  if (index === 0) return <AdMock />;
  if (index === 1) return <WebMock />;
  if (index === 2) return <CrmMock />;
  return (
    <div className="w-full max-w-md">
      <CalendarMock showToasts={false} />
    </div>
  );
}

/* --- Ilustrácie jednotlivých krokov (nie reálne dáta) --- */

function AdMock() {
  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-night-800 shadow-2xl" aria-hidden>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="grid size-8 place-items-center rounded-full bg-brand text-xs font-black text-ink">VF</span>
        <div className="text-xs">
          <p className="font-bold">vasafirma</p>
          <p className="text-white/45">Sponzorované</p>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-linear-to-br from-brand via-[#ff9a4d] to-brand-600">
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <p className="text-3xl leading-tight font-extrabold text-ink">
            Váš problém?
            <br />
            <span className="accent font-normal">Máme riešenie.</span>
          </p>
        </div>
        <span className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-ink/85 text-white">
          <svg viewBox="0 0 20 20" className="ml-0.5 size-4" fill="currentColor">
            <path d="M6 4.5v11a.5.5 0 0 0 .77.42l8.5-5.5a.5.5 0 0 0 0-.84l-8.5-5.5A.5.5 0 0 0 6 4.5Z" />
          </svg>
        </span>
      </div>
      <div className="flex items-center justify-between bg-blue px-4 py-3 text-sm font-bold">
        Zistiť viac
        <span aria-hidden>→</span>
      </div>
    </div>
  );
}

function WebMock() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white text-ink shadow-2xl" aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-muted">vasafirma.sk</span>
      </div>
      <div className="p-6">
        <div className="h-2.5 w-20 rounded-full bg-brand/40" />
        <p className="mt-4 text-2xl leading-tight font-extrabold">
          Rezervujte si termín <span className="accent font-normal text-brand">ešte dnes.</span>
        </p>
        <div className="mt-3 h-2 w-4/5 rounded-full bg-line" />
        <div className="mt-2 h-2 w-3/5 rounded-full bg-line" />
        <div className="mt-6 space-y-2.5">
          <div className="rounded-lg border border-line px-3 py-2.5 text-xs text-muted">Meno a priezvisko</div>
          <div className="rounded-lg border border-line px-3 py-2.5 text-xs text-muted">Telefón</div>
          <div className="relative rounded-lg bg-ink px-3 py-3 text-center text-xs font-bold text-white">
            Odoslať dopyt
            <svg viewBox="0 0 24 24" className="absolute -right-1 -bottom-4 size-7 drop-shadow" fill="white" stroke="#1d2530" strokeWidth="1.5">
              <path d="M5 3l14 8-6 2-3 6-5-16Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const leads = [
  { initials: "JN", status: "Stretnutie", tone: "bg-brand text-ink" },
  { initials: "MK", status: "E-mail odoslaný", tone: "bg-blue text-white" },
  { initials: "PS", status: "Nový", tone: "bg-white/15 text-white" },
  { initials: "LH", status: "Stretnutie", tone: "bg-brand text-ink" },
];

function CrmMock() {
  return (
    <div className="relative w-full max-w-md" aria-hidden>
      <div className="rounded-[28px] border border-white/10 bg-night-800 p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="font-bold">Dopyty</p>
          <span className="text-xs text-white/45">CRM</span>
        </div>
        <ul className="mt-4 space-y-2">
          {leads.map((l, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-night-700 text-xs font-bold">{l.initials}</span>
              <div className="flex-1">
                <div className="h-2 w-24 rounded-full bg-white/20" />
                <div className="mt-1.5 h-2 w-16 rounded-full bg-white/10" />
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${l.tone}`}>{l.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute -right-4 -bottom-8 w-64 rotate-3 rounded-2xl bg-white p-4 text-ink shadow-2xl">
        <p className="flex items-center gap-2 text-xs font-bold text-brand-600">
          <Check className="size-4" /> Odoslané automaticky
        </p>
        <p className="mt-2 text-sm font-bold">Ďakujeme za váš záujem!</p>
        <div className="mt-2 h-2 w-full rounded-full bg-line" />
        <div className="mt-1.5 h-2 w-2/3 rounded-full bg-line" />
      </div>
    </div>
  );
}
