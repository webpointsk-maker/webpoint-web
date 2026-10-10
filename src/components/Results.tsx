import { adsProof, caseStudies, totals, type CaseStudy } from "@/content/site";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

/** Časť textu v *hviezdičkách* zobrazí kurzívou */
function Headline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") ? (
          <span key={i} className="accent font-normal">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Results() {
  const featured = caseStudies.filter((c) => c.featured);
  const more = caseStudies.filter((c) => !c.featured);

  return (
    <section id="vysledky" className="grain panel panel-grow mesh-orange edge-wave-top relative text-ink">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-ink/60 uppercase">
              <span className="tabular-nums">05</span>
              <span className="h-px w-10 bg-ink/30" />
              Výsledky
            </span>
            <h2 className="mt-8 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              Čísla, <span className="accent font-normal">nie sľuby.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-ink/75">
            Skutočné kampane našich klientov. Každé číslo nižšie je priamo z Meta Ads Managera.
          </p>
        </div>

        {/* Súhrn */}
        <div className="mt-16 grid border-y border-ink/20 sm:grid-cols-3">
          {totals.map((t, i) => (
            <Reveal
              key={t.label}
              delay={i * 80}
              className={`py-8 sm:py-10 ${i > 0 ? "border-t border-ink/20 sm:border-t-0 sm:border-l sm:pl-8" : ""}`}
            >
              <p className="text-6xl leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap sm:text-5xl lg:text-7xl xl:text-8xl">
                <CountUp value={t.value} />
              </p>
              <p className="mt-3 text-base font-bold sm:text-lg">{t.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-sm font-medium text-ink/60">Súčet všetkých kampaní nižšie</p>

        {/* Hlavné príbehy */}
        <div className="mt-20 grid gap-5 lg:grid-cols-2">
          {featured.map((c, i) => (
            <Reveal key={c.client} delay={(i % 2) * 100}>
              <FeaturedCase c={c} dark={i === 0 || i === 3} />
            </Reveal>
          ))}
        </div>

        {/* Ďalšie kampane */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((c, i) => (
            <Reveal key={c.client} delay={i * 80}>
              <article className="flex h-full flex-col rounded-[24px] bg-ink/[0.07] p-6">
                <p className="text-xs font-bold tracking-[0.18em] text-ink/55 uppercase">
                  {c.client} · {c.industry}
                </p>
                <h3 className="mt-3 text-xl leading-snug font-extrabold">
                  <Headline text={c.headline} />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{c.description}</p>
                <dl className="mt-auto grid grid-cols-3 gap-2 pt-6">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-lg font-extrabold tracking-tight whitespace-nowrap">{s.value}</dd>
                      <dd className="text-[11px] leading-tight font-semibold text-ink/60">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Dôkaz z Ads Managera */}
        <Reveal className="mt-20">
          <div className="overflow-hidden rounded-[24px] bg-night text-white shadow-[0_40px_100px_-30px_rgb(29_37_48/0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
              <p className="flex items-center gap-3 text-sm font-bold">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </span>
                Priamo z Meta Ads Managera
              </p>
              <p className="text-xs text-white/50">Žiadne vymyslené čísla. Screenshoty z reálnych účtov klientov.</p>
            </div>
            <ul className="divide-y divide-white/10">
              {adsProof.map((a) => (
                <li key={a.image} className="px-5 py-4 sm:px-7">
                  <p className="mb-2 text-xs font-bold tracking-[0.18em] text-brand uppercase">{a.client}</p>
                  <div className="overflow-x-auto rounded-lg bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.image}
                      alt={`Výsledky kampane ${a.client} v Meta Ads Manageri`}
                      width={a.width}
                      height={a.height}
                      loading="lazy"
                      className="h-auto w-full min-w-[860px] md:min-w-0"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedCase({ c, dark }: { c: CaseStudy; dark: boolean }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[28px] p-7 sm:p-10 ${
        dark ? "grain bg-night text-white" : "bg-[#fff8f1] text-ink"
      }`}
    >
      <p className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? "text-brand" : "text-brand-600"}`}>
        {c.client} · {c.industry}
      </p>
      <h3 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[2.6rem]">
        <Headline text={c.headline} />
      </h3>
      <p className={`mt-5 leading-relaxed ${dark ? "text-white/65" : "text-ink/70"}`}>{c.description}</p>

      <dl className={`mt-8 grid grid-cols-2 border-t ${dark ? "border-white/10" : "border-ink/10"}`}>
        {c.stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-5 ${i % 2 ? "pl-5" : `border-r pr-5 ${dark ? "border-white/10" : "border-ink/10"}`} ${
              i < 2 ? `border-b ${dark ? "border-white/10" : "border-ink/10"}` : ""
            }`}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <CountUp value={s.value} />
            </dd>
            <dd className={`mt-1 text-sm font-semibold ${dark ? "text-white/55" : "text-ink/60"}`}>{s.label}</dd>
          </div>
        ))}
      </dl>

      {c.quote && (
        <blockquote className={`mt-auto pt-8 text-xl ${dark ? "text-white/90" : "text-ink/85"}`}>
          <span className="accent text-2xl">„{c.quote}“</span>
          <footer className={`mt-1 text-sm font-semibold ${dark ? "text-white/50" : "text-ink/55"}`}>
            {c.client}
          </footer>
        </blockquote>
      )}
    </article>
  );
}
