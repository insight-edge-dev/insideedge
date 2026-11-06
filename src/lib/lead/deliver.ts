import "server-only";
import type { Lead } from "./schema";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(lead: Lead) {
  const fields: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Phone / WhatsApp", lead.phone],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Website / Instagram", lead.website],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Message", lead.message],
    ["Form", lead.source],
    ["Page", lead.page],
    ...Object.entries(lead.attribution ?? {}).map(([k, v]) => [k, v] as [string, string]),
  ];
  return fields.filter(([, v]) => v);
}

function asText(lead: Lead) {
  return rows(lead)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function asHtml(lead: Lead) {
  const body = rows(lead)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5e5d57;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v!)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#0a0a0a"><h2 style="margin:0 0 12px">New enquiry — ${escapeHtml(lead.source)}</h2><table>${body}</table></div>`;
}

async function viaResend(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return null;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "InsideEdge Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New ${lead.source} enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: asText(lead),
      html: asHtml(lead),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return "resend";
}

/**
 * EmailJS REST API — keeps the previous EmailJS pipeline working, but from the
 * server with a private access token. Requires "Allow EmailJS API for non-browser
 * applications" in the EmailJS dashboard (Account → Security).
 */
async function viaEmailJs(lead: Lead) {
  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) return null;
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: {
        name: lead.name,
        email: lead.email ?? "",
        phone: lead.phone,
        time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        details: asText(lead),
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
  return "emailjs";
}

/** Optional: forward the lead as JSON to a CRM, Google Sheet (Apps Script) or automation tool. */
async function viaWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, submitted_at: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook ${res.status}`);
  return "webhook";
}

export class DeliveryNotConfiguredError extends Error {}

/** Sends the lead through every configured channel. Succeeds if at least one channel accepts it. */
export async function deliverLead(lead: Lead) {
  const results = await Promise.allSettled([viaResend(lead), viaEmailJs(lead), viaWebhook(lead)]);
  const delivered = results.flatMap((r) => (r.status === "fulfilled" && r.value ? [r.value] : []));
  const failures = results.flatMap((r) => (r.status === "rejected" ? [String(r.reason)] : []));
  if (failures.length) console.error("[lead] delivery failures:", failures);

  if (delivered.length) return delivered;
  if (!failures.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] no delivery channel configured — lead logged only:\n" + asText(lead));
      return ["console"];
    }
    throw new DeliveryNotConfiguredError("No lead delivery channel configured");
  }
  throw new Error("All lead delivery channels failed");
}
