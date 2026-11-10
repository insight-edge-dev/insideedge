import type { Lead } from "./schema";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );

function rows(lead: Lead, submittedAt: Date) {
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
    ["Consent", "Granted for responding to this enquiry"],
    [
      "Submitted",
      submittedAt.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    ],
    ...Object.entries(lead.attribution ?? {}).map(([key, value]) => [key, value] as [string, string]),
  ];
  return fields.filter(([, value]) => value);
}

export function leadAsText(lead: Lead, submittedAt = new Date()) {
  return rows(lead, submittedAt)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

export function leadAsHtml(lead: Lead, submittedAt = new Date()) {
  const body = rows(lead, submittedAt)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:9px 16px 9px 0;color:#66645e;vertical-align:top;border-bottom:1px solid #e7e2d6">${escapeHtml(key)}</td><td style="padding:9px 0;white-space:pre-wrap;border-bottom:1px solid #e7e2d6">${escapeHtml(value!)}</td></tr>`,
    )
    .join("");

  return `<div style="margin:0;padding:28px;background:#f4f0e6;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0a0a0a"><div style="max-width:680px;margin:0 auto;background:#fff;padding:28px;border-top:8px solid #f5c400"><p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">InsideEdge website</p><h2 style="margin:0 0 22px;font-size:24px;line-height:1.2">New ${escapeHtml(lead.source)} enquiry</h2><table role="presentation" style="width:100%;border-collapse:collapse">${body}</table><p style="margin:22px 0 0;color:#66645e;font-size:12px">Reply only for this enquiry. Do not add the sender to marketing lists without separate consent.</p></div></div>`;
}

type ResendConfig = {
  apiKey: string;
  from: string;
  to: string;
};

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

/** Sends one validated lead. The injectable fetcher exists only to allow network-free contract tests. */
export async function sendViaResend(lead: Lead, config: ResendConfig, fetcher: Fetcher = fetch) {
  const submittedAt = new Date();
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: config.to.split(",").map((address) => address.trim()).filter(Boolean),
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject: `New ${lead.source} enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: leadAsText(lead, submittedAt),
      html: leadAsHtml(lead, submittedAt),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Resend request failed (${response.status})`);
  return "resend" as const;
}
