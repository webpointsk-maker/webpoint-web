import { Reveal } from "./Reveal";
import { Check, Eyebrow, Logo } from "./ui";

const cols = ["Bežná agentúra", "Freelancer"] as const;

const rows: { label: string; agency: string; freelancer: string; us: string }[] = [
  {
    label: "Čo dostanete",
    agency: "Balík samostatných služieb",
    freelancer: "Jednu službu, napr. len reklamy",
    us: "Celý systém od reklamy po stretnutie",
  },
  {
    label: "Web, CRM a follow-up",
    agency: "Zvyčajne za príplatok",
    freelancer: "Riešite si sami",
    us: "Súčasť systému",
  },
  {
    label: "Videá a obsah",
    agency: "Často cez externistov",
    freelancer: "Väčšinou nie",
    us: "Natáčame a strihame sami",
  },
  {
    label: "Úspech sa meria",
    agency: "Dosahom a lajkami",
    freelancer: "Klikmi a cenou za klik",
    us: "Počtom dopytov a stretnutí",
  },
  {
    label: "S kým pracujú",
    agency: "S každým, kto zaplatí",
    freelancer: "S každým, kto zaplatí",
    us: "Len s fungujúcimi biznismi",
  },
];

export function WhyUs() {
  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-4xl">
          <Eyebrow index="04">Prečo WebPoint</Eyebrow>
          <h2 className="mt-8 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl">
            Nie sme ďalšia agentúra, ktorá robí <span className="accent text-brand-600">všetko.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Robíme jednu vec: prinášame firmám so službami nových zákazníkov. Preto všetko, čo
            robíme, meriame počtom dopytov a stretnutí, nie lajkami.
          </p>
        </Reveal>

        {/* Počítač: tabuľka */}
        <Reveal className="mt-14 hidden md:block">
          <div className="grid grid-cols-[1fr_1fr_1fr_1.15fr] items-stretch">
            <div />
            {cols.map((c) => (
              <div key={c} className="px-6 pb-5 text-sm font-bold text-muted">
                {c}
              </div>
            ))}
            <div className="rounded-t-3xl bg-night px-6 pt-6 pb-5">
              <Logo dark />
            </div>

            {rows.map((r, i) => {
              const last = i === rows.length - 1;
              return (
                <div key={r.label} className="contents">
                  <div className="border-t border-line py-5 pr-6 font-bold">{r.label}</div>
                  <div className="border-t border-line px-6 py-5 text-muted">{r.agency}</div>
                  <div className="border-t border-line px-6 py-5 text-muted">{r.freelancer}</div>
                  <div
                    className={`flex items-start gap-3 border-t border-white/10 bg-night px-6 py-5 font-semibold text-white ${
                      last ? "rounded-b-3xl pb-7" : ""
                    }`}
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                      <Check className="size-3.5" />
                    </span>
                    {r.us}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Mobil: karty */}
        <div className="mt-12 space-y-4 md:hidden">
          {rows.map((r) => (
            <Reveal key={r.label}>
              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                <p className="bg-paper px-5 py-3 text-sm font-bold">{r.label}</p>
                <div className="flex items-start gap-3 bg-night px-5 py-4 font-semibold text-white">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                    <Check className="size-3.5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-white/50">WebPoint</span>
                    {r.us}
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-4 px-5 py-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted">{cols[0]}</dt>
                    <dd className="mt-1 text-ink/75">{r.agency}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">{cols[1]}</dt>
                    <dd className="mt-1 text-ink/75">{r.freelancer}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
