import { clientReactions, quotes } from "@/content/site";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./ui";

export function Reviews() {
  return (
    <section id="recenzie" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Eyebrow index="01">Recenzie</Eyebrow>
            <h2 className="mt-8 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl">
              Klienti hovoria <span className="accent text-brand-600">za nás.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Skutočné správy, ktoré nám klienti poslali. Prepísané zo screenshotov, miestami skrátené.
          </p>
        </Reveal>

        {/* Správy ako v chate */}
        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {clientReactions.map((r, i) => (
            <Reveal key={i} delay={(i % 4) * 70} className="break-inside-avoid">
              <figure
                className={`rounded-[22px] bg-white p-4 shadow-[0_14px_40px_-18px_rgb(29_37_48/0.35)] transition duration-500 hover:-translate-y-1 hover:rotate-0 ${
                  ["-rotate-1", "rotate-1", "rotate-0", "-rotate-[0.5deg]"][i % 4]
                }`}
              >
                <figcaption className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-night text-xs font-black text-brand">
                    {r.author
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold">{r.author}</span>
                    <span className="block text-xs text-muted">{r.role}</span>
                  </span>
                </figcaption>
                <blockquote className="relative mt-3 rounded-2xl rounded-tl-md bg-[#1f2c34] px-4 pt-3 pb-6 text-[15px] leading-relaxed text-white">
                  {r.text}
                  <span className="absolute right-3 bottom-1.5 text-[10px] text-white/45">{r.time}</span>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {quotes.length > 0 && (
        <div className="pause-on-hover fade-x mt-20 overflow-hidden">
          <ul className="animate-scroll-left flex w-max" style={{ "--duration": "60s" } as React.CSSProperties}>
            {[...quotes, ...quotes].map((q, i) => (
              <li key={i} className="pr-4" aria-hidden={i >= quotes.length}>
                <blockquote className="w-[22rem] rounded-2xl bg-white p-7 shadow-sm">
                  <p className="accent text-2xl leading-snug">„{q.text}“</p>
                  <footer className="mt-3 text-sm font-semibold text-muted">{q.author}</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
