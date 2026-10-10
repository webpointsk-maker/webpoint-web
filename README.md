# WebPoint – nový web

Next.js 16 + Tailwind CSS 4. Jedna stránka + stránka Ochrana osobných údajov.

## Spustenie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkčný build
```

## Kde čo upraviť

| Čo | Súbor |
| --- | --- |
| Kontakt, sociálne siete, recenzie, výsledky kampaní | `src/content/site.ts` |
| Texty sekcií | `src/components/*.tsx` |
| Farby a písmo | `src/app/globals.css` (`@theme`) |
| Titulok a popis pre Google | `src/app/layout.tsx` |
| Ochrana osobných údajov (doplniť IČO, sídlo…) | `src/app/ochrana-osobnych-udajov/page.tsx` |

### Pridanie výsledku kampane

Pridajte ďalší objekt do poľa `caseStudies` v `src/content/site.ts`, screenshot z Ads Managera do `public/vysledky/` a do `adsProof`. Potom prepočítajte `totals`.

## Formulár

Dopyty sa posielajú na e-mail cez [Resend](https://resend.com) (zadarmo do 3 000 e-mailov mesačne).

1. Zaregistrujte sa na resend.com **s e-mailom, na ktorý majú chodiť dopyty** (webpointsk@gmail.com).
2. V Resend → **API Keys** → **Create API Key** (oprávnenie „Sending access“).
3. Kľúč vložte do `.env.local` ako `RESEND_API_KEY=` (súbor sa nenahráva na GitHub) a reštartujte `npm run dev`.
4. Na hostingu (Vercel → Settings → Environment Variables) nastavte rovnaké premenné:
   povinne `RESEND_API_KEY`, voliteľne `LEAD_TO_EMAIL` (inak sa použije kontaktný e-mail z `site.ts`)
   a `LEAD_FROM_EMAIL`. Po zmene premenných treba spraviť **Redeploy**.

Bez overenej domény Resend posiela len na e-mail vášho Resend účtu a odosielateľ je `onboarding@resend.dev`.
Po overení domény webpointsk.com (Resend → Domains, pridať DNS záznamy u registrátora) nastavte
`LEAD_FROM_EMAIL="WebPoint <dopyt@webpointsk.com>"`.

Bez kľúča sa dopyt pri vývoji iba vypíše do konzoly a v produkcii formulár zobrazí chybu s telefónom.

## Nasadenie

Odporúčané: [Vercel](https://vercel.com) – importovať repozitár, nastaviť premenné prostredia
a pripojiť doménu `webpointsk.com`.
