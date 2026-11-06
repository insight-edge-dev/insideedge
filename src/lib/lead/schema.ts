import { z } from "zod";
import { leadSources } from "./options";

/** Removes control characters and collapses whitespace. */
const clean = (max: number) =>
  z
    .string()
    .transform((s) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim())
    .pipe(z.string().max(max, { error: `Please keep this under ${max} characters` }));

const optional = (max: number) => clean(max).optional().transform((v) => (v ? v : undefined));

export const leadSchema = z.object({
  name: clean(80).pipe(z.string().min(2, { error: "Please tell us your name" })),
  phone: clean(20).pipe(
    z.string().regex(/^\+?[0-9][0-9\s-]{7,17}$/, { error: "Enter a valid phone or WhatsApp number" }),
  ),
  email: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? v : undefined))
    .pipe(z.email({ error: "Enter a valid email address" }).optional()),
  company: optional(120),
  website: optional(200),
  service: optional(80),
  budget: optional(60),
  timeline: optional(60),
  message: optional(2000),
  source: z.enum(leadSources).default("contact"),
  page: optional(200),
  attribution: z.record(z.string(), z.string().max(300)).optional(),
  consent: z.literal(true, { error: "Please agree so we can contact you" }),
});

export type Lead = z.infer<typeof leadSchema>;

/** Anti-spam fields, validated separately from lead content. */
export const spamSchema = z.object({
  /** Honeypot: hidden field real people never fill in. */
  company_url: z.string().max(0).optional(),
  /** Milliseconds since the form was rendered. Bots submit instantly. */
  elapsed: z.coerce.number().min(2500),
  turnstileToken: z.string().optional(),
});
