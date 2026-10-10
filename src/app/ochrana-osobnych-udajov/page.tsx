import Link from "next/link";
import type { Metadata } from "next";
import { contact } from "@/content/site";
import { Logo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov – WebPoint",
  robots: { index: false },
};

// TODO: doplniť údaje prevádzkovateľa (obchodné meno, IČO, sídlo) a nechať text skontrolovať.
export default function Privacy() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="bg-night py-6">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/" aria-label="Späť na hlavnú stránku">
            <Logo dark />
          </Link>
        </div>
      </div>
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 leading-relaxed text-ink/85 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Ochrana osobných údajov</h1>

        <h2 className="pt-4 text-xl font-bold text-ink">Prevádzkovateľ</h2>
        <p>
          [Obchodné meno], IČO: [doplniť], sídlo: [doplniť], {contact.city}. Kontakt:{" "}
          <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>, {contact.phone}.
        </p>

        <h2 className="pt-4 text-xl font-bold text-ink">Aké údaje spracúvame</h2>
        <p>
          Údaje, ktoré nám poskytnete cez kontaktný formulár: meno a priezvisko, telefónne číslo,
          e-mail, informácie o vašom podnikaní a odkaz na web alebo sociálne siete.
        </p>

        <h2 className="pt-4 text-xl font-bold text-ink">Účel a právny základ</h2>
        <p>
          Údaje spracúvame, aby sme vás mohli kontaktovať a dohodnúť si úvodný hovor, na základe
          vášho súhlasu (čl. 6 ods. 1 písm. a) GDPR) a opatrení pred uzavretím zmluvy (čl. 6 ods. 1
          písm. b) GDPR).
        </p>

        <h2 className="pt-4 text-xl font-bold text-ink">Ako dlho údaje uchovávame</h2>
        <p>
          Údaje uchovávame po dobu nevyhnutnú na vybavenie vášho dopytu, najdlhšie [doplniť], ak
          nevznikne zmluvný vzťah.
        </p>

        <h2 className="pt-4 text-xl font-bold text-ink">Vaše práva</h2>
        <p>
          Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania, prenosnosť,
          právo namietať a právo súhlas kedykoľvek odvolať. Máte tiež právo podať sťažnosť na Úrad na
          ochranu osobných údajov SR.
        </p>
      </article>
    </main>
  );
}
