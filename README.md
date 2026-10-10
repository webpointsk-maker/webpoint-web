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

Dopyty sa posielajú na e-mail cez [Resend](https://resend.com). Skopírujte `.env.example` do `.env.local`
(na hostingu nastavte ako premenné prostredia) a vyplňte `RESEND_API_KEY` a `LEAD_TO_EMAIL`.
Bez nastavenia sa dopyt pri vývoji iba vypíše do konzoly a v produkcii formulár zobrazí chybu.

## Nasadenie

Odporúčané: [Vercel](https://vercel.com) – importovať repozitár, nastaviť premenné prostredia
a pripojiť doménu `webpointsk.com`.
