"use server";

import { contact } from "@/content/site";

export type LeadState = { status: "idle" | "success" | "error"; message?: string };

const field = (data: FormData, name: string) => String(data.get(name) ?? "").trim().slice(0, 2000);

export async function submitLead(_prev: LeadState, data: FormData): Promise<LeadState> {
  // Honeypot proti spamu – skryté pole, ktoré človek nevyplní
  if (field(data, "company_website")) return { status: "success" };

  const lead = {
    meno: field(data, "name"),
    telefon: field(data, "phone"),
    email: field(data, "email"),
    biznis: field(data, "business"),
    web: field(data, "link"),
    investicia: field(data, "invest"),
  };

  if (!lead.meno || !lead.telefon || !lead.email || !lead.biznis) {
    return { status: "error", message: "Vyplňte prosím všetky povinné polia." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return { status: "error", message: "Skontrolujte prosím e-mailovú adresu." };
  }
  if (data.get("consent") !== "on") {
    return { status: "error", message: "Potvrďte prosím, že ste sa oboznámili s informáciami o spracúvaní osobných údajov." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Bez nastavenia idú dopyty na kontaktný e-mail z webu
  const to = process.env.LEAD_TO_EMAIL || contact.email;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] Odosielanie e-mailov nie je nastavené, dopyt:", lead);
      return { status: "success" };
    }
    console.error("[lead] Chýba RESEND_API_KEY");
    return { status: "error", message: "Formulár sa nepodarilo odoslať. Zavolajte nám prosím." };
  }

  const labels: Record<keyof typeof lead, string> = {
    meno: "Meno",
    telefon: "Telefón",
    email: "E-mail",
    biznis: "Čomu sa venuje",
    web: "Web / Instagram",
    investicia: "Investícia do reklamy",
  };
  const rows = (Object.keys(lead) as (keyof typeof lead)[])
    .map(
      (k) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#5b6676;white-space:nowrap">${labels[k]}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(lead[k] || "–")}</td></tr>`,
    )
    .join("");
  const tel = lead.telefon.replace(/[^\d+]/g, "");
  const html = `<div style="font-family:Arial,sans-serif;color:#1d2530;max-width:560px">
    <p style="margin:0 0 4px;color:#f97a1f;font-weight:700;letter-spacing:2px;font-size:12px">WEBPOINT · NOVÝ DOPYT</p>
    <h2 style="margin:0 0 16px">${escapeHtml(lead.meno)} chce nezáväzný hovor</h2>
    <table style="border-collapse:collapse;font-size:15px">${rows}</table>
    <p style="margin:24px 0 0">
      <a href="tel:${escapeHtml(tel)}" style="background:#f97a1f;color:#1d2530;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700">Zavolať ${escapeHtml(lead.telefon)}</a>
    </p>
    <p style="margin:24px 0 0;color:#5b6676;font-size:12px">Odpoveďou na tento e-mail napíšete priamo záujemcovi.</p>
  </div>`;
  const text = (Object.keys(lead) as (keyof typeof lead)[]).map((k) => `${labels[k]}: ${lead[k] || "–"}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "WebPoint web <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject: `Nový dopyt z webu: ${lead.meno} (${lead.biznis})`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[lead] Resend chyba", res.status, await res.text());
    return { status: "error", message: "Formulár sa nepodarilo odoslať. Zavolajte nám prosím." };
  }

  return { status: "success" };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
