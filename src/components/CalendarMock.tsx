"use client";

import { useEffect, useState } from "react";

const days = ["Po", "Ut", "St", "Št", "Pi"];
const times = ["9:00", "11:00", "14:00", "16:00"];

// Poradie, v akom sa sloty napĺňajú (deň, riadok, farba)
const order: [number, number, "brand" | "blue"][] = [
  [0, 0, "brand"],
  [2, 1, "brand"],
  [1, 2, "blue"],
  [3, 0, "brand"],
  [4, 2, "brand"],
  [0, 3, "brand"],
  [2, 3, "blue"],
  [1, 0, "brand"],
  [3, 2, "brand"],
  [4, 1, "blue"],
  [2, 0, "brand"],
  [3, 3, "brand"],
];

const toasts = [
  { at: 1, title: "Nový dopyt z Instagramu", sub: "Formulár na webe", tone: "blue" },
  { at: 4, title: "Automatický e-mail odoslaný", sub: "Pripomienka termínu", tone: "brand" },
  { at: 8, title: "Stretnutie potvrdené", sub: "Štvrtok 9:00", tone: "brand" },
] as const;

/** Kalendár, ktorý sa sám napĺňa stretnutiami (ilustrácia, nie reálne dáta) */
export function CalendarMock({ showToasts = true }: { showToasts?: boolean }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setFilled(order.length));
      return () => cancelAnimationFrame(raf);
    }
    let n = 0;
    const id = window.setInterval(() => {
      n = n >= order.length + 5 ? 0 : n + 1; // po naplnení chvíľu počká a začne odznova
      setFilled(Math.min(n, order.length));
    }, 650);
    return () => window.clearInterval(id);
  }, []);

  const active = order.slice(0, filled);
  const toast = [...toasts].reverse().find((t) => filled >= t.at && filled < order.length + 1);

  return (
    <div className="relative" aria-hidden>
      <div className="rounded-[28px] border border-white/10 bg-night-800/90 p-5 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)] backdrop-blur sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase">Váš kalendár</p>
            <p className="mt-1 text-lg font-bold text-white">Tento týždeň</p>
          </div>
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-ink tabular-nums">
            {filled} {filled === 1 ? "stretnutie" : filled > 1 && filled < 5 ? "stretnutia" : "stretnutí"}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[auto_repeat(5,1fr)] gap-1.5 text-center text-[11px]">
          <span />
          {days.map((d) => (
            <span key={d} className="pb-1 font-semibold text-white/45">
              {d}
            </span>
          ))}
          {times.map((t, row) => (
            <Row key={t} time={t} row={row} active={active} />
          ))}
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-brand to-[#ffb37a] transition-all duration-500"
            style={{ width: `${(filled / order.length) * 100}%` }}
          />
        </div>
      </div>

      {showToasts && toast && (
        <div
          key={toast.title}
          className="toast-in absolute -top-7 right-2 flex max-w-[calc(100%-1rem)] items-center gap-3 rounded-2xl border border-white/10 bg-night-700/95 px-4 py-3 shadow-2xl backdrop-blur sm:-right-10 sm:max-w-none"
        >
          <span
            className={`relative grid size-9 place-items-center rounded-full ${
              toast.tone === "blue" ? "bg-blue/25 text-blue-400" : "bg-brand/20 text-brand"
            }`}
          >
            <span
              className={`animate-ping-soft absolute inset-0 rounded-full ${
                toast.tone === "blue" ? "bg-blue/30" : "bg-brand/30"
              }`}
            />
            <svg viewBox="0 0 20 20" className="size-4" fill="currentColor">
              <path d="M10 2a6 6 0 0 0-6 6v3.6L2.3 14a1 1 0 0 0 .8 1.6h13.8a1 1 0 0 0 .8-1.6L16 11.6V8a6 6 0 0 0-6-6Zm0 18a3 3 0 0 0 2.8-2H7.2A3 3 0 0 0 10 20Z" />
            </svg>
          </span>
          <div className="text-left">
            <p className="text-sm font-bold text-white">{toast.title}</p>
            <p className="text-xs text-white/50">{toast.sub}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  time,
  row,
  active,
}: {
  time: string;
  row: number;
  active: [number, number, "brand" | "blue"][];
}) {
  return (
    <>
      <span className="pr-2 text-right leading-10 text-white/30">{time}</span>
      {days.map((_, day) => {
        const slot = active.find(([d, r]) => d === day && r === row);
        return (
          <span key={day} className="relative h-10 rounded-lg border border-dashed border-white/10">
            {slot && (
              <span
                className={`pop-in absolute inset-0 rounded-lg ${
                  slot[2] === "brand"
                    ? "bg-linear-to-br from-brand to-brand-600 shadow-[0_6px_18px_-6px_rgb(249_122_31/0.8)]"
                    : "bg-linear-to-br from-blue-400 to-blue"
                }`}
              />
            )}
          </span>
        );
      })}
    </>
  );
}
