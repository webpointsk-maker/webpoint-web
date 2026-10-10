import { contact } from "@/content/site";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { Check, Eyebrow, RotatingBadge } from "./ui";

const expect = [
  "Krátky hovor o vašom biznise a cieľoch",
  "Zistíme, či a ako vám vieme priniesť zákazníkov",
  "Ukážeme vám ponuku na mieru, bez záväzkov",
];

export function Contact() {
  return (
    <section id="kontakt" className="grain panel mesh-dark edge-arch arch-rise relative rounded-b-none text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 0%, rgb(249 122 31 / 0.18), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 md:pt-40 md:pb-32">
        <Reveal className="relative">
          <Eyebrow index="09" dark>
            Nezáväzný hovor
          </Eyebrow>
          <h2 className="mt-8 text-[15vw] leading-[0.88] font-extrabold tracking-[-0.05em] sm:text-[11vw] lg:text-[9.5rem]">
            Poďme naplniť
            <br />
            <span className="accent text-brand">váš kalendár.</span>
          </h2>
          <div className="absolute top-0 right-0 hidden lg:block">
            <RotatingBadge id="badge-contact" text="Nezáväzný hovor · Zadarmo · " className="size-36" />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-white/65 sm:text-xl">
              Odpovedzte na 3 krátke otázky a nechajte nám kontakt. Zaberie to necelú minútu a ozveme sa vám, aby sme si dohodli termín hovoru.
            </p>
            <ul className="mt-8 space-y-4">
              {expect.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-ink">
                    <Check className="size-4" />
                  </span>
                  <span className="text-white/85">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-xs font-bold tracking-[0.22em] text-white/45 uppercase">Radšej voláte?</p>
              <a
                href={contact.phoneHref}
                className="mt-3 block text-3xl font-extrabold tracking-tight transition hover:text-brand sm:text-4xl"
              >
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="mt-2 block text-white/60 hover:text-white">
                {contact.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
