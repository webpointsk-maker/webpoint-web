/** Znak WebPoint (sieť + kurzor). Farbí sa cez currentColor vďaka CSS maske. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block aspect-[1058/707] bg-current ${className}`}
      style={{
        WebkitMask: "url(/logo-mark.png) center / contain no-repeat",
        mask: "url(/logo-mark.png) center / contain no-repeat",
      }}
    />
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-7 text-brand" />
      <span
        className={`text-[15px] font-extrabold tracking-[0.2em] ${dark ? "text-white" : "text-ink"}`}
      >
        WEBPOINT
      </span>
    </span>
  );
}

/** Označenie sekcie: číslo + názov, bez „bublinky“ */
export function Eyebrow({
  children,
  index,
  dark = false,
}: {
  children: React.ReactNode;
  index?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase ${
        dark ? "text-white/60" : "text-ink/55"
      }`}
    >
      {index && <span className="text-brand tabular-nums">{index}</span>}
      <span className={`h-px w-10 ${dark ? "bg-white/25" : "bg-ink/20"}`} />
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "ghost-dark" | "ghost";
  className?: string;
}) {
  const styles = {
    primary: "bg-brand text-ink",
    dark: "bg-ink text-white",
    "ghost-dark": "border border-white/20 text-white hover:border-white/50",
    ghost: "border border-ink/15 text-ink hover:border-ink/40",
  }[variant];
  const dot = {
    primary: "bg-ink text-brand",
    dark: "bg-brand text-ink",
    "ghost-dark": "bg-white text-ink",
    ghost: "bg-ink text-white",
  }[variant];
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-6 text-[15px] font-bold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${styles} ${className}`}
    >
      {children}
      <span
        className={`grid size-10 shrink-0 place-items-center overflow-hidden rounded-full transition duration-500 group-hover:rotate-[-45deg] ${dot}`}
      >
        <ArrowRight />
      </span>
    </a>
  );
}

export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="m5 10.5 3 3 7-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cross({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="m6 6 8 8m0-8-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Otáčajúca sa pečiatka s textom do kruhu */
export function RotatingBadge({
  id,
  text,
  className = "",
  dark = false,
}: {
  /** Jedinečné id pre kruhovú cestu textu */
  id: string;
  text: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`relative grid size-32 place-items-center ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text
          className={`text-[9.5px] font-bold tracking-[0.18em] uppercase ${dark ? "fill-ink" : "fill-white"}`}
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-brand text-ink">
        <ArrowRight className="size-5 rotate-90" />
      </span>
    </span>
  );
}
