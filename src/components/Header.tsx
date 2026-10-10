"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Logo } from "./ui";

const links = [
  { href: "#recenzie", label: "Recenzie" },
  { href: "#system", label: "Systém" },
  { href: "#vysledky", label: "Výsledky" },
  { href: "#spolupraca", label: "Spolupráca" },
  { href: "#faq", label: "Otázky" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled || open
            ? "h-14 max-w-5xl border border-white/10 bg-night/80 pr-2 pl-5 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "h-16 max-w-7xl border border-transparent px-2 sm:px-3"
        }`}
      >
        <a href="#" aria-label="WebPoint – domov">
          <Logo dark />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hlavná navigácia">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakt"
          className="group hidden items-center gap-2 rounded-full bg-brand py-2 pr-2 pl-5 text-sm font-bold text-ink transition hover:bg-[#ff8a33] lg:inline-flex"
        >
          Nezáväzný hovor
          <span className="grid size-8 place-items-center rounded-full bg-ink text-brand transition duration-500 group-hover:-rotate-45">
            <ArrowRight />
          </span>
        </a>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
            {open ? (
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="fade-up mx-auto mt-2 max-w-5xl rounded-3xl border border-white/10 bg-night/95 px-5 pt-2 pb-5 backdrop-blur-xl lg:hidden"
          aria-label="Mobilná navigácia"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-4 text-2xl font-extrabold tracking-tight text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 font-bold text-ink"
          >
            Nezáväzný hovor <ArrowRight />
          </a>
        </nav>
      )}
    </header>
  );
}
