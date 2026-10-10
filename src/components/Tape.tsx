const defaultWords = ["Reklamy", "Web na mieru", "CRM", "Automatické e-maily", "Obsah", "Plný kalendár"];

/** Šikmá páska s bežiacim textom */
export function Tape({
  words = defaultWords,
  variant = "orange",
}: {
  words?: string[];
  variant?: "orange" | "dark";
}) {
  const items = [...words, ...words];
  const dark = variant === "dark";
  return (
    <div className="relative z-10 -my-10 overflow-hidden py-10" aria-hidden>
      <div
        className={`-mx-10 py-5 sm:py-6 ${
          dark
            ? "rotate-2 bg-night text-white shadow-[0_20px_60px_-20px_rgb(10_15_26/0.6)]"
            : "-rotate-2 bg-brand text-ink shadow-[0_20px_60px_-20px_rgb(249_122_31/0.6)]"
        }`}
      >
        <ul
          className="animate-scroll-left flex w-max"
          style={{ "--duration": "38s", animationDirection: dark ? "reverse" : "normal" } as React.CSSProperties}
        >
          {[...items, ...items].map((w, i) => (
            <li
              key={i}
              className="flex items-center gap-8 pr-8 text-3xl font-extrabold tracking-tight whitespace-nowrap uppercase sm:text-5xl"
            >
              <span className={i % 2 ? `accent tracking-normal normal-case ${dark ? "text-brand" : ""}` : ""}>{w}</span>
              <svg viewBox="0 0 24 24" className={`size-6 sm:size-8 ${dark ? "text-brand" : ""}`} fill="currentColor">
                <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
