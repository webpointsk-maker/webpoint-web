// Všetok obsah, ktorý sa bude často meniť, je na jednom mieste.

export const contact = {
  email: "webpointsk@gmail.com",
  phone: "+421 911 755 997",
  phoneHref: "tel:+421911755997",
  city: "Žilina",
};

// Identifikačné údaje prevádzkovateľa (pätička a ochrana osobných údajov)
export const company = {
  name: "Andrej Černák",
  brand: "WebPoint",
  type: "fyzická osoba – podnikateľ (živnostník)",
  street: "Suvorovova 2683/30A",
  zip: "010 01",
  city: "Žilina",
  country: "Slovenská republika",
  ico: "57126925",
  register: "Živnostenský register, číslo 580-83616",
  vat: "Neplatiteľ DPH",
};

// Otázky vo formulári (každá má vlastnú obrazovku). Možnosti sa dajú voľne upravovať.
export const leadQuestions = [
  {
    name: "source",
    label: "Odkiaľ",
    question: "Ako ste sa o nás dozvedeli?",
    hint: "",
    options: [
      "Videl/a som vašu reklamu",
      "Odporučil mi vás známy alebo klient",
      "Sledujem váš obsah na sociálnych sieťach",
      "Našiel/a som vás na Google",
      "Iným spôsobom",
    ],
  },
  {
    name: "industry",
    label: "Odvetvie",
    question: "V akom odvetví podnikáte?",
    hint: "",
    options: [
      "Krása a starostlivosť (salón, kaderníctvo, kozmetika, tetovanie)",
      "Zdravie a pohyb (osobný tréner, fitko, joga, kliniky)",
      "Reality a financie (makléri, finanční poradcovia, hypotéky)",
      "Stavebníctvo a remeslá (rekonštrukcie, interiéry, fotovoltika)",
      "Údržba a čistenie (tepovanie, čistenie fasád, servisy)",
      "Poradenstvo a vzdelávanie (coaching, kurzy, účtovníctvo, právo)",
      "Zážitky a podujatia (pobyty, oslavy, workshopy)",
      "Iné služby",
    ],
  },
  {
    name: "revenue",
    label: "Mesačný obrat",
    question: "Aký je váš aktuálny mesačný obrat?",
    hint: "Približne, koľko vaše podnikanie mesačne zarobí na tržbách.",
    options: [
      "Menej ako 2 000 €",
      "2 000 – 5 000 €",
      "5 000 – 10 000 €",
      "10 000 – 30 000 €",
      "30 000 – 100 000 €",
      "Viac ako 100 000 €",
    ],
  },
] as const;

// Odkazy na sociálne siete – doplňte URL, prázdne sa nezobrazia.
export const socials: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "TikTok", href: "" },
];

// Skutočné správy od klientov (prepísané zo screenshotov v priečinku „vysledfky“)
export type Reaction = { text: string; author: string; role: string; time: string };

export const clientReactions: Reaction[] = [
  {
    text: "Mám zo 4 hovorov dohodnuté 4 konzultácie 😅 … A kým som ti to písal, zavolal mi ďalší človek sám od seba, že videl na FB reklamu a chce začať cvičiť, tak mám dohodnutú piatu konzultáciu 😄",
    author: "Peter Samal",
    role: "Osobný tréner",
    time: "14:58",
  },
  {
    text: "Zrazu kopec roboty 🤣",
    author: "Bella Donna",
    role: "Kaderníctvo",
    time: "19:20",
  },
  {
    text: "Kampaň som akurát vypol… preventívne, keďže ma čakajú ešte ďalšie 3 konzultačky, nech sa to tam nekopí a nebudem mať tých ľudí kde dávať 🙂",
    author: "Peter Samal",
    role: "Osobný tréner",
    time: "06:24",
  },
  {
    text: "Dnes som mala zas 2 nové zákazníčky z tej akcie… tá prvá aj farba melír, omladla o 10 rokov, odchádzala nadšená 🙏💪",
    author: "Bella Donna",
    role: "Kaderníctvo",
    time: "14:59",
  },
  {
    text: "Video aj na FB má niekoľko komentárov od všelijakých žien, prišiel mi e-mail, že sa chce objednať, plus na FB asi 3, že sa chcú objednať. Dosť dobré ohlasy 😳 som milo prekvapená",
    author: "Salon MS",
    role: "Permanentný make-up",
    time: "06:43",
  },
  {
    text: "Inak akurát prišla prvá platba, a je to od klientky, ktorú bude mať Peťo, takže z toho sa najviac teším 😊",
    author: "Peter Samal",
    role: "Osobný tréner",
    time: "15:35",
  },
  {
    text: "Dnes mám z toho fakt úplne super pocit… a som naozaj vďačná, že som vás stretla 🫶",
    author: "Bella Donna",
    role: "Kaderníctvo",
    time: "22:18",
  },
  {
    text: "Už som aj s nimi volal a vyzerá to nádejne 😉",
    author: "Realitka pre každého",
    role: "Reality",
    time: "19:27",
  },
  {
    text: "Jasné, to je super, že si mi dal vedieť a navrhol, čo by bolo vhodnejšie. Taký prístup sa mi páči 🙂👌",
    author: "Peter Samal",
    role: "Osobný tréner",
    time: "19:58",
  },
];

// Krátke citáty – bežiaci pás pod recenziami
export const quotes: { text: string; author: string }[] = [
  { text: "Zrazu kopec roboty.", author: "Bella Donna, kaderníctvo" },
  { text: "Mám zo 4 hovorov dohodnuté 4 konzultácie.", author: "Peter Samal, osobný tréner" },
  { text: "Som naozaj vďačná, že som vás stretla.", author: "Bella Donna, kaderníctvo" },
  { text: "Dosť dobré ohlasy, som milo prekvapená.", author: "Salon MS" },
  { text: "Z posledného videa mi prišlo dosť veľa followov.", author: "Peter Samal, osobný tréner" },
  { text: "Celkovo stránka na mňa pôsobí veľmi dobre.", author: "Peter Samal, osobný tréner" },
  { text: "Taký prístup sa mi páči.", author: "Peter Samal, osobný tréner" },
];

// Súčty zo všetkých kampaní nižšie (Ads Manager). Pri pridaní kampane prepočítajte.
export const totals = [
  { value: "324", label: "leadov a rezervácií" },
  { value: "279 000+", label: "zobrazení reklám" },
  { value: "4,05 €", label: "priemerná cena za lead" },
];

export type CaseStudy = {
  client: string;
  industry: string;
  /** Hlavná veta; časť v *hviezdičkách* sa zvýrazní */
  headline: string;
  description: string;
  stats: { value: string; label: string }[];
  quote?: string;
  /** Veľká karta (true) alebo malá karta v mriežke */
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "La Joga",
    industry: "Jogové štúdio",
    headline: "11 predaných permanentiek. *Takmer 3× návratnosť.*",
    description:
      "Permanentka stojí 75 €. Kampaň za 282,33 € predala 11 permanentiek za 825 € a ďalšie dve kampane priniesli 58 rezervácií na hodiny.",
    stats: [
      { value: "825 €", label: "tržby z permanentiek" },
      { value: "282,33 €", label: "investícia do reklamy" },
      { value: "58", label: "rezervácií na hodiny" },
      { value: "1,82 €", label: "za rezerváciu" },
    ],
    featured: true,
  },
  {
    client: "Bella Donna",
    industry: "Kaderníctvo",
    headline: "Celú kampaň zaplatil *jediný melír.*",
    description:
      "Melír stojí 70 €, celá kampaň 69,83 €. Stačila jedna nová zákazníčka a všetko ostatné je už zisk. Kampaň priniesla 34 záujemcov.",
    stats: [
      { value: "34", label: "nových záujemcov" },
      { value: "2,05 €", label: "za záujemcu" },
      { value: "69,83 €", label: "celá kampaň" },
      { value: "70 €", label: "jeden melír" },
    ],
    quote: "Zrazu kopec roboty 🤣",
    featured: true,
  },
  {
    client: "Peter Samal",
    industry: "Osobný tréner",
    headline: "Reklamu musel vypnúť. *Nestíhal.*",
    description:
      "Kampaň na konzultáciu zdarma priniesla toľko záujemcov, že ju Peter preventívne vypol, aby nemal ľudí kam dávať. Z prvých 4 hovorov boli 4 dohodnuté konzultácie.",
    stats: [
      { value: "34", label: "záujemcov o tréning" },
      { value: "4 zo 4", label: "hovorov = konzultácia" },
      { value: "15 971", label: "oslovených ľudí" },
      { value: "5,06 €", label: "za záujemcu" },
    ],
    quote: "Mám zo 4 hovorov dohodnuté 4 konzultácie 😅",
    featured: true,
  },
  {
    client: "Salon MS",
    industry: "Permanentný make-up",
    headline: "750 € z jedného videa. *0 € na reklamu.*",
    description:
      "Jedno organické video priviedlo 3 rezervácie na tetovanie pier po 250 €. Bez jediného eura do reklamy.",
    stats: [
      { value: "3", label: "rezervácie" },
      { value: "250 €", label: "jedno tetovanie pier" },
      { value: "750 €", label: "tržby" },
      { value: "0 €", label: "na reklamu" },
    ],
    featured: true,
  },
  {
    client: "Realitka pre každého",
    industry: "Reality",
    headline: "71 ľudí, ktorí chcú predať nehnuteľnosť",
    description: "Stačí jeden obchod a kampaň sa zaplatí mnohonásobne.",
    stats: [
      { value: "71", label: "leadov" },
      { value: "4,27 €", label: "za lead" },
      { value: "25 866", label: "oslovených ľudí" },
    ],
  },
  {
    client: "Paradise",
    industry: "Kozmetický salón",
    headline: "46 nových záujemcov za 7 € denne",
    description: "Akcia s 50 % zľavou na prvú návštevu.",
    stats: [
      { value: "46", label: "záujemcov" },
      { value: "2,13 €", label: "za záujemcu" },
      { value: "8 461", label: "oslovených ľudí" },
    ],
  },
  {
    client: "Scream Tattoo",
    industry: "Tetovacie štúdio",
    headline: "38 záujemcov o tetovanie",
    description: "Akcia s 30 % zľavou, rozpočet 10 € denne.",
    stats: [
      { value: "38", label: "záujemcov" },
      { value: "3,99 €", label: "za záujemcu" },
      { value: "44 383", label: "zobrazení" },
    ],
  },
  {
    client: "Realitná kampaň",
    industry: "Reality",
    headline: "32 leadov za prvých 7 dní",
    description: "Celý proces bežal automaticky, od reklamy cez formulár až po e-mail.",
    stats: [
      { value: "32", label: "leadov" },
      { value: "3,53 €", label: "za lead" },
      { value: "17 406", label: "oslovených ľudí" },
    ],
  },
];

// Snímky priamo z Meta Ads Managera (public/vysledky/)
export const adsProof: { image: string; client: string; width: number; height: number }[] = [
  { image: "/vysledky/ads-scream-tattoo.png", client: "Scream Tattoo", width: 1517, height: 101 },
  { image: "/vysledky/ads-la-joga-permanentky.png", client: "La Joga – permanentky", width: 1536, height: 51 },
  { image: "/vysledky/ads-la-joga-rezervacie.png", client: "La Joga – rezervácie", width: 1528, height: 100 },
  { image: "/vysledky/ads-bella-donna.png", client: "Bella Donna", width: 1529, height: 61 },
  { image: "/vysledky/ads-paradise.png", client: "Paradise", width: 1552, height: 54 },
  { image: "/vysledky/ads-realitka.png", client: "Realitka pre každého", width: 1534, height: 44 },
  { image: "/vysledky/ads-peter-samal.png", client: "Peter Samal", width: 1678, height: 104 },
];
