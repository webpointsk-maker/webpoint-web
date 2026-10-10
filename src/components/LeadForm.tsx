"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions";
import { ArrowRight, Check } from "./ui";

const input =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 transition outline-none focus:border-brand focus:bg-white/10";
const label = "mb-2 block text-sm font-semibold text-white/80";

export function LeadForm() {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand text-ink">
          <Check className="size-8" />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold">Ďakujeme, máme to!</h3>
        <p className="mt-3 max-w-sm text-white/65">
          Ozveme sa vám čo najskôr a dohodneme si termín úvodného hovoru.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
      noValidate={false}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={label}>
            Meno a priezvisko *
          </label>
          <input id="name" name="name" required autoComplete="name" className={input} placeholder="Ján Novák" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Telefón *
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={input} placeholder="+421 9xx xxx xxx" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            E-mail *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={input} placeholder="jan@firma.sk" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="business" className={label}>
            Čomu sa venujete? *
          </label>
          <input id="business" name="business" required className={input} placeholder="Napr. realitná kancelária, kozmetický salón, stavebná firma…" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="link" className={label}>
            Web alebo Instagram
          </label>
          <input id="link" name="link" className={input} placeholder="www.vasafirma.sk" />
        </div>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Ste pripravení investovať do reklamy a marketingu?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Áno, chcem rásť", "Chcem sa najprv poradiť"].map((opt, i) => (
              <label
                key={opt}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white/85 transition has-checked:border-brand has-checked:bg-brand/10"
              >
                <input type="radio" name="invest" value={opt} defaultChecked={i === 0} className="accent-brand" />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="flex items-start gap-3 text-sm text-white/60 sm:col-span-2">
          <input type="checkbox" name="consent" required className="mt-1 accent-brand" />
          <span>
            Oboznámil/a som sa s{" "}
            <Link href="/ochrana-osobnych-udajov" className="underline hover:text-white">
              informáciami o spracúvaní osobných údajov
            </Link>
            . *
          </span>
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-bold text-ink shadow-[0_8px_30px_-8px_rgb(249_122_31/0.7)] transition hover:bg-[#ff8a33] disabled:opacity-60"
      >
        {pending ? "Odosielam…" : "Chcem nezáväzný hovor"} {!pending && <ArrowRight />}
      </button>
    </form>
  );
}
