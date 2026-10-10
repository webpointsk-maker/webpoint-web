import { Reveal } from "./Reveal";
import { Check, Cross, Eyebrow } from "./ui";

const yes = [
  "Ponúkate službu a váš biznis už funguje",
  "Viete, že by ste zvládli viac zákazníkov, ako máte teraz",
  "Ste pripravení investovať do reklamy a marketingu",
  "Chcete stály prísun dopytov, nie náhodu a odporúčania",
];

const no = [
  "Ešte len začínate a nemáte overenú službu",
  "Nechcete investovať do reklamy a marketingu",
  "Hľadáte rýchly trik namiesto systému, ktorý dlhodobo funguje",
];

export function Fit() {
  return (
    <section id="pre-koho" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-4xl">
          <Eyebrow index="06">Pre koho</Eyebrow>
          <h2 className="mt-8 text-[10vw] leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Nespolupracujeme <span className="accent text-brand-600">s každým.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Systém funguje najlepšie pre firmy, ktoré už majú čo ponúknuť a chcú rásť.
          </p>
        </Reveal>

        <div className="mt-16 grid overflow-hidden rounded-[32px] md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="grain mesh-dark h-full p-8 text-white sm:p-12">
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Je to pre vás, <span className="accent font-normal text-brand">ak:</span>
              </h3>
              <ul className="mt-10 space-y-6">
                {yes.map((t) => (
                  <li key={t} className="flex gap-4 text-lg">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand text-ink">
                      <Check className="size-4" />
                    </span>
                    <span className="text-white/90">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full bg-white/70 p-8 backdrop-blur-sm sm:p-12">
              <h3 className="text-3xl font-extrabold tracking-tight text-ink/50 sm:text-4xl">
                Nie je to pre vás, <span className="accent font-normal">ak:</span>
              </h3>
              <ul className="mt-10 space-y-6">
                {no.map((t) => (
                  <li key={t} className="flex gap-4 text-lg">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink/10 text-ink/50">
                      <Cross className="size-4" />
                    </span>
                    <span className="text-ink/55 line-through decoration-ink/20">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
