"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadState } from "@/app/actions";
import { leadQuestions } from "@/content/site";
import { ArrowRight, Check } from "./ui";

type Answers = Record<(typeof leadQuestions)[number]["name"], string>;
type Contact = { firstName: string; lastName: string; email: string; prefix: string; phone: string; link: string };

const LETTERS = "ABCDEFGHIJ";
const PREFIXES = ["+421", "+420", "+43", "+48", "+36"];
const TOTAL = leadQuestions.length + 1;

const field =
  "w-full border-0 border-b-2 border-white/15 bg-transparent px-0 py-3 text-xl text-white placeholder:text-white/25 transition outline-none focus:border-brand sm:text-2xl";
const fieldLabel = "block text-[11px] font-bold tracking-[0.2em] text-white/45 uppercase";

/** Formulár po krokoch: každá otázka je samostatná obrazovka. */
export function LeadForm() {
  const [state, dispatch, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ source: "", industry: "", revenue: "" });
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    email: "",
    prefix: "+421",
    phone: "",
    link: "",
  });
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const advanceTimer = useRef(0);

  const isContactStep = step === leadQuestions.length;
  const current = leadQuestions[step];

  function go(next: number) {
    window.clearTimeout(advanceTimer.current);
    setError("");
    setStep(Math.max(0, Math.min(TOTAL - 1, next)));
  }

  function choose(value: string) {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.name]: value }));
    setError("");
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => setStep((s) => Math.min(TOTAL - 1, s + 1)), 320);
  }

  function next() {
    if (current && !answers[current.name]) {
      setError("Vyberte prosím jednu z možností.");
      return;
    }
    go(step + 1);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isContactStep) return next();
    if (!contact.firstName.trim() || !contact.lastName.trim()) return setError("Vyplňte prosím meno a priezvisko.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) return setError("Skontrolujte prosím e-mail.");
    if (contact.phone.replace(/\D/g, "").length < 6) return setError("Skontrolujte prosím telefónne číslo.");
    setError("");
    const fd = new FormData();
    Object.entries(answers).forEach(([k, v]) => fd.set(k, v));
    fd.set("firstName", contact.firstName);
    fd.set("lastName", contact.lastName);
    fd.set("email", contact.email);
    fd.set("phone", `${contact.prefix} ${contact.phone}`.trim());
    fd.set("link", contact.link);
    fd.set("company_website", honeypot);
    startTransition(() => dispatch(fd));
  }

  // Klávesnica funguje, keď je formulár aspoň z polovice na obrazovke
  const onScreen = useRef(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => (onScreen.current = entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A–J vyberie možnosť, Enter pokračuje
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (!onScreen.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest('input:not([type="radio"]), textarea, select, a')) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (e.key.length === 1 && i >= 0 && i < current.options.length) {
        e.preventDefault();
        choose(current.options[i]);
      } else if (e.key === "Enter" && !target.closest("button")) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Po prechode na kontaktný krok zameriame prvé pole
  useEffect(() => {
    if (isContactStep) firstInput.current?.focus({ preventScroll: true });
  }, [isContactStep]);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  if (state.status === "success") {
    return (
      <div className="fade-up flex min-h-[560px] flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.04] p-10 text-center">
        <span className="pop-in grid size-20 place-items-center rounded-full bg-brand text-ink">
          <Check className="size-10" />
        </span>
        <h3 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ďakujeme, <span className="accent font-normal text-brand">máme to!</span>
        </h3>
        <p className="mt-4 max-w-sm text-lg text-white/65">
          Ozveme sa vám čo najskôr a dohodneme si termín úvodného hovoru. Potvrdenie sme vám poslali
          aj na e-mail.
        </p>
      </div>
    );
  }

  const progress = ((step + 1) / TOTAL) * 100;
  const shownError = error || (state.status === "error" ? state.message : "");

  return (
    <div
      ref={root}
      tabIndex={-1}
      className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] outline-none"
    >
      {/* Postup */}
      <div className="h-1 bg-white/10">
        <div className="h-full bg-linear-to-r from-brand to-[#ffb37a] transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <form onSubmit={submit} className="flex flex-1 flex-col p-6 sm:p-10" noValidate>
        <div key={step} className="fade-up flex-1" style={{ animationDuration: "0.6s" }}>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.22em] text-white/70 uppercase">
            Krok {step + 1} z {TOTAL}
          </span>

          {current ? (
            <fieldset className="mt-6">
              <legend className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                {current.question}
              </legend>
              {current.hint && <p className="mt-3 text-white/55">{current.hint}</p>}
              <div className="mt-8 grid gap-2.5">
                {current.options.map((opt, i) => {
                  const selected = answers[current.name] === opt;
                  return (
                    <label
                      key={opt}
                      className={`group flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition duration-200 hover:-translate-y-0.5 ${
                        selected
                          ? "border-brand bg-brand/15 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/85 hover:border-white/30 hover:bg-white/[0.07]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={current.name}
                        value={opt}
                        checked={selected}
                        onChange={() => choose(opt)}
                        className="sr-only"
                      />
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-lg border text-xs font-black transition ${
                          selected ? "border-brand bg-brand text-ink" : "border-white/20 text-white/60 group-hover:border-white/40"
                        }`}
                      >
                        {selected ? <Check className="size-4" /> : LETTERS[i]}
                      </span>
                      <span className="text-[15px] font-medium sm:text-base">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : (
            <div className="mt-6">
              <h3 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                Posledný krok: <span className="accent font-normal text-brand">kontakt</span>
              </h3>
              <p className="mt-3 text-white/55">Aby sme sa vám mohli ozvať a dohodnúť si hovor.</p>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={fieldLabel}>Meno</label>
                  <input
                    ref={firstInput}
                    id="firstName"
                    autoComplete="given-name"
                    className={field}
                    placeholder="Ján"
                    value={contact.firstName}
                    onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={fieldLabel}>Priezvisko</label>
                  <input
                    id="lastName"
                    autoComplete="family-name"
                    className={field}
                    placeholder="Novák"
                    value={contact.lastName}
                    onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={fieldLabel}>E-mail</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={field}
                    placeholder="jan@vasafirma.sk"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className={fieldLabel}>Telefón</label>
                  <div className="flex items-end gap-3">
                    <select
                      aria-label="Predvoľba"
                      className="border-0 border-b-2 border-white/15 bg-transparent py-3 pr-2 text-xl text-white outline-none focus:border-brand sm:text-2xl [&>option]:text-ink"
                      value={contact.prefix}
                      onChange={(e) => setContact({ ...contact, prefix: e.target.value })}
                    >
                      {PREFIXES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel-national"
                      className={field}
                      placeholder="907 777 555"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="link" className={fieldLabel}>
                    Web alebo Instagram <span className="normal-case tracking-normal text-white/30">(nepovinné)</span>
                  </label>
                  <input
                    id="link"
                    className={field}
                    placeholder="www.vasafirma.sk"
                    value={contact.link}
                    onChange={(e) => setContact({ ...contact, link: e.target.value })}
                  />
                </div>
              </div>

              {/* Honeypot proti spamu */}
              <div className="hidden" aria-hidden>
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <p className="mt-6 text-xs leading-relaxed text-white/45">
                Kontakt použijeme len na vybavenie vášho dopytu podľa{" "}
                <Link href="/ochrana-osobnych-udajov" className="underline hover:text-white">
                  zásad ochrany osobných údajov
                </Link>
                .
              </p>
            </div>
          )}
        </div>

        {shownError && (
          <p role="alert" className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {shownError}
          </p>
        )}

        {/* Navigácia */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            aria-label="Späť"
            className="grid size-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-white/40 disabled:opacity-30"
          >
            <ArrowRight className="size-4 rotate-180" />
          </button>

          {current && (
            <p className="hidden text-xs text-white/35 sm:block">
              Stlačte <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans">A</kbd>–
              <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans">{LETTERS[current.options.length - 1]}</kbd> alebo{" "}
              <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans">Enter ↵</kbd>
            </p>
          )}

          {isContactStep ? (
            <button
              type="submit"
              disabled={pending}
              className="group inline-flex items-center gap-3 rounded-full bg-brand py-2 pr-2 pl-6 font-bold text-ink shadow-[0_8px_30px_-8px_rgb(249_122_31/0.7)] transition hover:bg-[#ff8a33] disabled:opacity-60"
            >
              {pending ? "Odosielam…" : "Odoslať a dohodnúť hovor"}
              <span className="grid size-10 place-items-center rounded-full bg-ink text-brand transition duration-500 group-hover:-rotate-45">
                <ArrowRight />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 font-bold text-ink transition hover:bg-white/90"
            >
              Ďalej
              <span className="grid size-10 place-items-center rounded-full bg-ink text-white transition duration-500 group-hover:-rotate-45">
                <ArrowRight />
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
