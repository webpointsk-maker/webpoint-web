import { Reveal } from "./Reveal";
import { Eyebrow } from "./ui";

const faqs = [
  {
    q: "Koľko stojí spolupráca?",
    a: "Cena závisí od veľkosti vášho biznisu, cieľov a toho, čo všetko zo systému potrebujete. Konkrétnu ponuku vám ukážeme na úvodnom hovore, keď vieme, s čím presne pracujeme. Nechceme vám dať číslo naslepo.",
  },
  {
    q: "V čom ste iní ako ostatné agentúry?",
    a: "Nepredávame jednotlivé služby. Staviame celý systém: reklamu, web, CRM, automatické e-maily aj obsah, ktoré na seba nadväzujú. A úspech nemeriame lajkami, ale tým, koľko dopytov a stretnutí vám systém prinesie.",
  },
  {
    q: "Pre aké biznisy systém funguje?",
    a: "Pre firmy a podnikateľov, ktorí ponúkajú služby a zákazníkov získavajú cez dopyty, konzultácie alebo stretnutia. Podmienkou je, že biznis už funguje a vie obslúžiť nových zákazníkov.",
  },
  {
    q: "Kedy uvidím prvé výsledky?",
    a: "Reklamy začínajú prinášať dopyty hneď po spustení. V našej realitnej kampani to bolo 32 leadov za prvých 7 dní. Potom systém priebežne ladíme, aby dopyty boli čo najkvalitnejšie.",
  },
  {
    q: "Koľko musím investovať do reklamy?",
    a: "Rozpočet na reklamu nastavíme podľa vašich cieľov a trhu. Odporúčanie dostanete na úvodnom hovore. Počítajte však s tým, že bez investície do reklamy systém fungovať nebude.",
  },
  {
    q: "Čo budem musieť robiť ja?",
    a: "Reklamy, web, CRM, e-maily aj obsah máme na starosti my. Od vás potrebujeme podklady o vašej službe, trochu času na natáčanie obsahu a hlavne rýchlu reakciu na nových zákazníkov.",
  },
  {
    q: "S agentúrou som už mal zlú skúsenosť.",
    a: "Rozumieme, počujeme to často. Preto všetko staviame na číslach, ktoré vidíte aj vy: koľko ľudí reklama oslovila, koľko nechalo kontakt a koľko z nich prišlo na stretnutie. Žiadne hmlisté reporty.",
  },
  {
    q: "Čo sa stane po vyplnení formulára?",
    a: "Ozveme sa vám telefonicky a dohodneme si termín úvodného hovoru. Na ňom spoznáme váš biznis, ukážeme vám, ako by systém vyzeral u vás, a povieme vám konkrétnu ponuku. Nič vás to nezaväzuje.",
  },
  {
    q: "Už mám web. Musím mať nový?",
    a: "Na úvodnom hovore sa pozrieme na váš súčasný web. Web je dôležitou časťou systému, preto musí byť postavený tak, aby z návštevníkov robil dopyty.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow index="08">Časté otázky</Eyebrow>
          <h2 className="mt-8 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] sm:text-7xl">
            Máte otázky? <span className="accent text-brand-600">Máme odpovede.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Nenašli ste, čo hľadáte? Zavolajte nám alebo nám nechajte kontakt a ozveme sa vám.
          </p>
        </Reveal>

        <Reveal className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-ink transition group-open:rotate-45 group-open:bg-brand">
                  <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-12 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
