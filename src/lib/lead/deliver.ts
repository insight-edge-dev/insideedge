import "server-only";
import type { Lead } from "./schema";
import { leadAsText, sendViaResend } from "./resend";

async function viaResend(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !to || !from) return null;

  return sendViaResend(lead, { apiKey: key, from, to });
}

/** EmailJS remains available as an optional server-side delivery channel. */
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
        details: leadAsText(lead),
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`EmailJS request failed (${res.status})`);
  return "emailjs";
}

/** Optional: forward the lead as JSON to a CRM, Google Sheet or automation tool. */
async function viaWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, submitted_at: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook request failed (${res.status})`);
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
      console.info("[lead] no delivery channel configured - lead logged only:\n" + leadAsText(lead));
      return ["console"];
    }
    throw new DeliveryNotConfiguredError("No lead delivery channel configured");
  }
  throw new Error("All lead delivery channels failed");
}
