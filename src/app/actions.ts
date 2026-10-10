"use server";

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
    return { status: "error", message: "Potrebujeme váš súhlas so spracovaním údajov." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] Odosielanie e-mailov nie je nastavené, dopyt:", lead);
      return { status: "success" };
    }
    console.error("[lead] Chýba RESEND_API_KEY alebo LEAD_TO_EMAIL");
    return { status: "error", message: "Formulár sa nepodarilo odoslať. Zavolajte nám prosím." };
  }

  const rows = Object.entries(lead)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${escapeHtml(v || "–")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "WebPoint web <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject: `Nový dopyt z webu: ${lead.meno}`,
      html: `<h2>Nový dopyt z webu</h2><table>${rows}</table>`,
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
