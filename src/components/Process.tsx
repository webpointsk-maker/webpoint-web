import { Reveal } from "./Reveal";
import { ButtonLink, Check, Eyebrow } from "./ui";

const phases = [
  {
    phase: "Fáza 0",
    title: "Úvodný hovor",
    text: "Krátky nezáväzný hovor. Spoznáme váš biznis a na rovinu vám povieme, či vám vieme pomôcť.",
    items: [],
  },
  {
    phase: "Fáza 1",
    title: "Analýza a stratégia",
    text: "Skôr než minieme prvé euro na reklamu, musíme vedieť, komu a čo predávame.",
    items: [
      "Kto je váš ideálny zákazník a čo potrebuje počuť",
      "Čo robí konkurencia a v čom sa od nej odlíšite",
      "S akou ponukou pôjdeme do reklamy",
    ],
  },
  {
    phase: "Fáza 2",
    title: "Spustenie systému",
    text: "Postavíme všetky časti systému a prepojíme ich tak, aby dopyty tiekli až do vášho kalendára.",
    items: [
      "Web na mieru zameraný na dopyty",
      "CRM a automatické e-maily",
      "Natočenie videí a obsahu",
      "Reklamy na Facebooku a Instagrame",
    ],
  },
  {
    phase: "Fáza 3",
    title: "Optimalizácia a rast",
    text: "Systém nikdy nie je hotový. Sledujeme čísla a posúvame ho ďalej.",
    items: [
      "Sledujeme cenu za lead a počet stretnutí",
      "Testujeme nové kreatívy a ponuky",
      "Keď čísla sedia, zvyšujeme rozpočet a škálujeme",
    ],
  },
];

export function Process() {
  return (
    <section id="spolupraca" className="band-skew py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow index="07">Spolupráca</Eyebrow>
            <h2 className="mt-8 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl">
              Ako vám naplníme <span className="accent text-brand-600">kalendár</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Žiadne hádanie. Každá spolupráca prejde rovnakými fázami, aby ste vždy vedeli, čo sa
              deje a prečo.
            </p>
            <ButtonLink href="#kontakt" className="mt-8">
              Začať fázou 0
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="relative space-y-5">
          <span className="absolute top-6 bottom-6 left-[21px] w-px bg-line sm:left-[27px]" aria-hidden />
          {phases.map((p, i) => (
            <Reveal as="li" key={p.phase} delay={i * 60} className="relative pl-12 sm:pl-16">
              <span
                className={`absolute top-6 left-0 grid size-11 place-items-center rounded-xl text-base font-extrabold sm:size-14 sm:rounded-2xl sm:text-lg ${
                  i === 0 ? "bg-brand text-ink" : "bg-night text-brand"
                }`}
              >
                {i}
              </span>
              <div className="ml-2 rounded-3xl border border-line bg-white p-5 sm:ml-4 sm:p-7">
                <p className="text-xs font-bold tracking-wide text-brand-600 uppercase">{p.phase}</p>
                <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                {p.items.length > 0 && (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {p.items.map((t) => (
                      <li key={t} className="flex gap-2.5 text-[15px] text-ink/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-600" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
