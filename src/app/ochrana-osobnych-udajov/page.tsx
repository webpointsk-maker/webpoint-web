import Link from "next/link";
import type { Metadata } from "next";
import { company, contact } from "@/content/site";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov – WebPoint",
  description: "Ako WebPoint spracúva osobné údaje z kontaktného formulára.",
};

const updated = "10. 10. 2026";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-6 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{children}</h2>;
}

export default function Privacy() {
  return (
    <main className="min-h-screen pb-24">
      <div className="mesh-dark panel mt-2 md:mt-3">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <Link href="/" aria-label="Späť na hlavnú stránku">
            <Logo dark />
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl space-y-5 px-4 pt-16 leading-relaxed text-ink/85 sm:px-6">
        <p className="text-xs font-bold tracking-[0.22em] text-ink/50 uppercase">Platné od {updated}</p>
        <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-ink sm:text-6xl">
          Ochrana <span className="accent text-brand-600">osobných údajov</span>
        </h1>
        <p className="text-lg">
          Na tejto stránke vysvetľujeme, aké osobné údaje spracúvame, keď nás kontaktujete cez web,
          prečo to robíme a aké máte práva. Riadime sa nariadením EÚ 2016/679 (GDPR) a zákonom
          č. 18/2018 Z. z. o ochrane osobných údajov.
        </p>

        <H2>1. Prevádzkovateľ</H2>
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="font-bold text-ink">
            {company.name} – {company.brand}
          </p>
          <p>
            {company.street}, {company.zip} {company.city}, {company.country}
            <br />
            IČO: {company.ico}
            <br />
            {company.register}
            <br />
            {company.vat}
          </p>
          <p className="mt-3">
            E-mail:{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-brand-600 underline">
              {contact.email}
            </a>
            <br />
            Telefón:{" "}
            <a href={contact.phoneHref} className="font-semibold text-brand-600 underline">
              {contact.phone}
            </a>
          </p>
        </div>
        <p>
          Zodpovednú osobu (DPO) sme nevymenovali, pretože nám to zákon neukladá. So všetkými
          otázkami sa obráťte priamo na nás na kontaktoch vyššie.
        </p>

        <H2>2. Aké údaje spracúvame</H2>
        <p>Keď vyplníte kontaktný formulár, spracúvame údaje, ktoré nám sami zadáte:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>meno a priezvisko,</li>
          <li>telefónne číslo a e-mailovú adresu,</li>
          <li>odvetvie, v ktorom podnikáte, a odkaz na váš web alebo sociálne siete,</li>
          <li>približný mesačný obrat vášho podnikania (vo forme rozpätia),</li>
          <li>informáciu, ako ste sa o nás dozvedeli.</li>
        </ul>
        <p>
          Rovnako spracúvame údaje, ktoré nám pošlete e-mailom, správou alebo poviete počas hovoru.
          Nespracúvame osobitné kategórie údajov (napr. o zdraví) a nežiadame ich od vás.
        </p>

        <H2>3. Na aký účel a na akom právnom základe</H2>
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead className="bg-paper text-ink">
              <tr>
                <th className="px-5 py-3 font-bold">Účel</th>
                <th className="px-5 py-3 font-bold">Právny základ</th>
                <th className="px-5 py-3 font-bold">Ako dlho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <td className="px-5 py-4">Odpovedať na váš dopyt, dohodnúť a uskutočniť úvodný hovor, pripraviť ponuku</td>
                <td className="px-5 py-4">
                  Opatrenia pred uzavretím zmluvy na vašu žiadosť – čl. 6 ods. 1 písm. b) GDPR
                </td>
                <td className="px-5 py-4">12 mesiacov od posledného kontaktu, ak nevznikne spolupráca</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Plnenie zmluvy, ak sa dohodneme na spolupráci</td>
                <td className="px-5 py-4">Plnenie zmluvy – čl. 6 ods. 1 písm. b) GDPR</td>
                <td className="px-5 py-4">Počas trvania spolupráce</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Vedenie účtovníctva a archivácia faktúr</td>
                <td className="px-5 py-4">Zákonná povinnosť – čl. 6 ods. 1 písm. c) GDPR (zákon o účtovníctve)</td>
                <td className="px-5 py-4">10 rokov od konca roka, ktorého sa doklad týka</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Ochrana našich práv a obrana právnych nárokov</td>
                <td className="px-5 py-4">Oprávnený záujem – čl. 6 ods. 1 písm. f) GDPR</td>
                <td className="px-5 py-4">Počas premlčacej doby</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Poskytnutie údajov je dobrovoľné. Bez mena, telefónu a e-mailu vás však nevieme kontaktovať.
          Vaše údaje nepoužívame na automatizované rozhodovanie ani profilovanie a bez vášho súhlasu
          vám neposielame reklamné ponuky.
        </p>

        <H2>4. Komu údaje poskytujeme</H2>
        <p>
          Vaše údaje nepredávame. Na prevádzku webu a e-mailu využívame overených sprostredkovateľov,
          ktorí údaje spracúvajú len podľa našich pokynov:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Vercel Inc.</strong> – hosting webovej stránky,
          </li>
          <li>
            <strong>Resend</strong> – doručenie správy z formulára do našej schránky a potvrdzujúceho e-mailu vám,
          </li>
          <li>
            <strong>Google</strong> – e-mailová schránka, do ktorej dopyty prichádzajú,
          </li>
          <li>prípadne účtovník, ak sa dohodneme na spolupráci a vystavíme faktúru.</li>
        </ul>
        <p>
          Niektorí z týchto poskytovateľov sídlia v USA. Prenos údajov prebieha na základe
          rozhodnutia Európskej komisie o primeranosti (EU–US Data Privacy Framework) alebo
          štandardných zmluvných doložiek.
        </p>

        <H2>5. Cookies a analytika</H2>
        <p>
          Tento web nepoužíva analytické ani reklamné cookies a nesleduje vaše správanie. Ak to v
          budúcnosti zmeníme, požiadame vás najprv o súhlas a túto stránku aktualizujeme.
        </p>

        <H2>6. Vaše práva</H2>
        <p>V súvislosti so spracúvaním osobných údajov máte právo:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>získať informáciu, aké údaje o vás spracúvame, a ich kópiu,</li>
          <li>na opravu nesprávnych alebo neúplných údajov,</li>
          <li>na vymazanie údajov, ak už nie sú potrebné,</li>
          <li>na obmedzenie spracúvania,</li>
          <li>na prenosnosť údajov,</li>
          <li>namietať proti spracúvaniu na základe oprávneného záujmu.</li>
        </ul>
        <p>
          Stačí nám napísať na{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-brand-600 underline">
            {contact.email}
          </a>
          . Odpovieme bez zbytočného odkladu, najneskôr do jedného mesiaca.
        </p>
        <p>
          Ak si myslíte, že s vašimi údajmi zaobchádzame v rozpore so zákonom, môžete podať návrh na
          začatie konania na <strong>Úrad na ochranu osobných údajov Slovenskej republiky</strong>,
          Hraničná 12, 820 07 Bratislava,{" "}
          <a href="https://dataprotection.gov.sk" className="font-semibold text-brand-600 underline" rel="noopener noreferrer" target="_blank">
            dataprotection.gov.sk
          </a>
          .
        </p>

        <H2>7. Zabezpečenie a zmeny</H2>
        <p>
          Údaje chránime primeranými technickými a organizačnými opatreniami: šifrované spojenie
          (HTTPS), prístup len pre nás a zabezpečené účty poskytovateľov. Túto stránku môžeme
          priebežne aktualizovať. Aktuálna verzia je vždy zverejnená tu.
        </p>

        <p className="pt-8">
          <Link href="/" className="font-bold text-brand-600 underline">
            ← Späť na hlavnú stránku
          </Link>
        </p>
      </article>
    </main>
  );
}
