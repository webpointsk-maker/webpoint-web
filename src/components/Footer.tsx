import Link from "next/link";
import { company, contact, socials } from "@/content/site";
import { LogoMark } from "./ui";

export function Footer() {
  const activeSocials = socials.filter((s) => s.href);
  return (
    <footer className="grain panel mesh-dark relative mb-2 rounded-t-none border-t border-white/10 text-white/60 md:mb-3">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="grid gap-10 text-sm sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <p className="max-w-xs text-base leading-relaxed text-white/70">
            Akvizičný systém, ktorý firmám so službami prináša{" "}
            <span className="accent text-lg text-brand">nových zákazníkov.</span>
          </p>
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-white/40 uppercase">Web</p>
            <ul className="mt-4 space-y-2">
              <li><Link href="/#recenzie" className="hover:text-white">Recenzie</Link></li>
              <li><Link href="/#system" className="hover:text-white">Systém</Link></li>
              <li><Link href="/#vysledky" className="hover:text-white">Výsledky</Link></li>
              <li><Link href="/#faq" className="hover:text-white">Otázky</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-white/40 uppercase">Kontakt</p>
            <ul className="mt-4 space-y-2">
              <li><a href={contact.phoneHref} className="hover:text-white">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="break-all hover:text-white">{contact.email}</a></li>
              <li>{contact.city}</li>
            </ul>
          </div>
          {activeSocials.length > 0 && (
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-white/40 uppercase">Sledujte nás</p>
              <ul className="mt-4 space-y-2">
                {activeSocials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
          {company.name} – {company.brand}, {company.street}, {company.zip} {company.city} · IČO:{" "}
          {company.ico} · {company.register} · {company.vat}
        </p>
        <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} WebPoint. Všetky práva vyhradené.</p>
          <Link href="/ochrana-osobnych-udajov" className="hover:text-white">
            Ochrana osobných údajov
          </Link>
        </div>
      </div>

      {/* Obrovský nápis cez celú šírku */}
      <p
        className="mt-10 -mb-[0.18em] flex items-center justify-center gap-[2vw] text-[14vw] leading-none font-extrabold tracking-[0.02em] whitespace-nowrap text-white select-none"
        aria-hidden
      >
        <LogoMark className="h-[0.62em] text-brand" />
        <span>
          WEB<span className="text-brand">POINT</span>
        </span>
      </p>
    </footer>
  );
}
