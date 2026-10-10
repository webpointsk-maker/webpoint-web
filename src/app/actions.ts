"use server";

import { company, contact } from "@/content/site";

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
  // Telefón kontrolujeme, lebo sa opakuje v automatickej odpovedi (ochrana pred zneužitím na spam)
  if (!/^\+?[\d\s()./-]{6,20}$/.test(lead.telefon)) {
    return { status: "error", message: "Skontrolujte prosím telefónne číslo." };
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
  // Doména webpointsk.com je overená v Resend, preto môžeme posielať z vlastnej adresy
  const from = process.env.LEAD_FROM_EMAIL || "WebPoint <dopyt@webpointsk.com>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] Odosielanie e-mailov nie je nastavené, dopyt:", lead);
      return { status: "success" };
    }
    console.error("[lead] Chýba RESEND_API_KEY");
    return { status: "error", message: "Formulár sa nepodarilo odoslať. Zavolajte nám prosím." };
  }

  // 1) Upozornenie pre nás
  const notified = await sendEmail(apiKey, {
    from,
    to: [to],
    reply_to: lead.email,
    subject: `Nový dopyt z webu: ${lead.meno} (${lead.biznis})`,
    html: notificationHtml(lead),
    text: (Object.keys(lead) as LeadKey[]).map((k) => `${labels[k]}: ${lead[k] || "–"}`).join("\n"),
  });
  if (!notified) {
    return { status: "error", message: "Formulár sa nepodarilo odoslať. Zavolajte nám prosím." };
  }

  // 2) Automatická odpoveď záujemcovi (dá sa vypnúť premennou AUTO_REPLY=off)
  if (process.env.AUTO_REPLY !== "off") {
    await sendEmail(apiKey, {
      from,
      to: [lead.email],
      reply_to: contact.email,
      subject: "Ďakujeme, váš dopyt sme prijali | WebPoint",
      html: autoReplyHtml(lead),
      text: autoReplyText(lead),
    });
    // Ak automatická odpoveď zlyhá, dopyt už máme – formulár preto hlási úspech.
  }

  return { status: "success" };
}

type Lead = { meno: string; telefon: string; email: string; biznis: string; web: string; investicia: string };
type LeadKey = keyof Lead;

const labels: Record<LeadKey, string> = {
  meno: "Meno",
  telefon: "Telefón",
  email: "E-mail",
  biznis: "Čomu sa venuje",
  web: "Web / Instagram",
  investicia: "Investícia do reklamy",
};

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[lead] Resend chyba", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Resend nedostupný", err);
    return false;
  }
}

function notificationHtml(lead: Lead) {
  const rows = (Object.keys(lead) as LeadKey[])
    .map(
      (k) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#5b6676;white-space:nowrap">${labels[k]}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(lead[k] || "–")}</td></tr>`,
    )
    .join("");
  const tel = lead.telefon.replace(/[^\d+]/g, "");
  return `<div style="font-family:Arial,sans-serif;color:#1d2530;max-width:560px">
    <p style="margin:0 0 4px;color:#f97a1f;font-weight:700;letter-spacing:2px;font-size:12px">WEBPOINT · NOVÝ DOPYT</p>
    <h2 style="margin:0 0 16px">${escapeHtml(lead.meno)} chce nezáväzný hovor</h2>
    <table style="border-collapse:collapse;font-size:15px">${rows}</table>
    <p style="margin:24px 0 0">
      <a href="tel:${escapeHtml(tel)}" style="background:#f97a1f;color:#1d2530;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700">Zavolať ${escapeHtml(lead.telefon)}</a>
    </p>
    <p style="margin:24px 0 0;color:#5b6676;font-size:12px">Odpoveďou na tento e-mail napíšete priamo záujemcovi. Záujemca dostal automatické potvrdenie.</p>
  </div>`;
}

function autoReplyHtml(lead: Lead) {
  const steps = [
    "Spoznáme váš biznis a ciele",
    "Zistíme, či a ako vám vieme priniesť zákazníkov",
    "Ukážeme vám ponuku na mieru, bez záväzkov",
  ]
    .map(
      (t, i) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top"><span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:999px;background:#f97a1f;color:#0a0f1a;font-weight:700;font-size:12px">${i + 1}</span></td><td style="padding:6px 0;font-size:15px;color:#1d2530">${t}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html lang="sk"><body style="margin:0;padding:0;background:#f4f1ec">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
    <div style="background:#0a0f1a;border-radius:24px 24px 0 0;padding:28px 32px">
      <p style="margin:0;color:#ffffff;font-weight:800;letter-spacing:4px;font-size:14px">WEB<span style="color:#f97a1f">POINT</span></p>
      <h1 style="margin:20px 0 0;color:#ffffff;font-size:30px;line-height:1.15">Ďakujeme, váš dopyt<br><span style="color:#f97a1f;font-family:Georgia,serif;font-style:italic;font-weight:400">sme prijali.</span></h1>
    </div>
    <div style="background:#ffffff;border-radius:0 0 24px 24px;padding:28px 32px">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1d2530">Dobrý deň,</p>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#1d2530">ďakujeme za váš záujem. Čo najskôr sa vám ozveme na čísle <strong style="white-space:nowrap">${escapeHtml(lead.telefon)}</strong> a dohodneme si krátky nezáväzný hovor.</p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:2px;color:#5b6676">ČO VÁS NA HOVORE ČAKÁ</p>
      <table style="border-collapse:collapse;margin:0 0 24px">${steps}</table>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#1d2530">Ak sa chcete ozvať skôr, zavolajte nám alebo jednoducho odpovedzte na tento e-mail.</p>
      <p style="margin:0 0 28px"><a href="${contact.phoneHref}" style="background:#f97a1f;color:#0a0f1a;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px">Zavolať ${contact.phone}</a></p>
      <p style="margin:0;font-size:16px;line-height:1.6;color:#1d2530">S pozdravom<br><strong>tím WebPoint</strong></p>
    </div>
    <p style="margin:20px 8px 0;font-size:11px;line-height:1.6;color:#8a929e">${company.name} – ${company.brand}, ${company.street}, ${company.zip} ${company.city} · IČO: ${company.ico}<br>Tento e-mail sme vám poslali, pretože ste vyplnili formulár na našom webe.</p>
  </div></body></html>`;
}

function autoReplyText(lead: Lead) {
  return [
    "Dobrý deň,",
    "",
    `ďakujeme za váš záujem. Čo najskôr sa vám ozveme na čísle ${lead.telefon} a dohodneme si krátky nezáväzný hovor.`,
    "",
    "Čo vás na hovore čaká:",
    "1. Spoznáme váš biznis a ciele",
    "2. Zistíme, či a ako vám vieme priniesť zákazníkov",
    "3. Ukážeme vám ponuku na mieru, bez záväzkov",
    "",
    `Ak sa chcete ozvať skôr, zavolajte nám na ${contact.phone} alebo odpovedzte na tento e-mail.`,
    "",
    "S pozdravom",
    "tím WebPoint",
    "",
    `${company.name} – ${company.brand}, ${company.street}, ${company.zip} ${company.city}, IČO: ${company.ico}`,
  ].join("\n");
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
