import { Reveal } from "./Reveal";
import { ScrollText } from "./ScrollText";
import { Eyebrow } from "./ui";

const problems = [
  {
    title: "Zákazníci chodia len z odporúčaní",
    text: "Keď odporúčania stíchnu, stíchne aj kalendár a vy neviete, čo príde budúci mesiac.",
  },
  {
    title: "Reklamy ste skúšali, ale nepredávali",
    text: "Pár boostnutých príspevkov, lajky a žiadne telefonáty. Reklama bez webu, CRM a follow-upu zákazníkov neprinesie.",
  },
  {
    title: "Dopyty sa strácajú",
    text: "Niekto napíše večer, vy odpíšete o dva dni a on je už u konkurencie.",
  },
];

export function Problem() {
  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Eyebrow index="02">Kde je problém</Eyebrow>
        <ScrollText
          className="mt-10 max-w-6xl text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[5.2rem]"
          text="Váš biznis funguje. Máte dobrú službu aj spokojných zákazníkov. Len *rastie* *pomalšie,* než by mohol, lebo nemáte systém, ktorý by vám ich prinášal *každý* *týždeň.*"
        />

        <div className="mt-24 grid border-t border-ink/10 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div
                className={`h-full border-b border-ink/10 py-8 md:border-b-0 md:px-8 ${
                  i === 0 ? "md:pl-0" : ""
                } ${i < problems.length - 1 ? "md:border-r" : "md:pr-0"}`}
              >
                <span className="accent text-5xl text-brand">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
