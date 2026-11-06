import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { deliverLead, DeliveryNotConfiguredError } from "@/lib/lead/deliver";
import { rateLimit } from "@/lib/lead/rate-limit";
import { leadSchema, spamSchema } from "@/lib/lead/schema";

const MAX_BODY_BYTES = 16_000;

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    signal: AbortSignal.timeout(8000),
  });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return NextResponse.json({ error: "Request too large" }, { status: 413 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later or message us on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const spam = spamSchema.safeParse(body);
  if (!spam.success) {
    // Pretend success so bots don't learn what tripped the filter.
    return NextResponse.json({ ok: true });
  }
  if (!(await verifyTurnstile(spam.data.turnstileToken, ip))) {
    return NextResponse.json({ error: "Verification failed. Please refresh and try again." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  try {
    await deliverLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead]", err);
    const notConfigured = err instanceof DeliveryNotConfiguredError;
    return NextResponse.json(
      {
        error: notConfigured
          ? "Our form is temporarily unavailable. Please message us on WhatsApp — we reply fast."
          : "We couldn't send your message. Please try again or reach us on WhatsApp.",
      },
      { status: notConfigured ? 503 : 502 },
    );
  }
}
