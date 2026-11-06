"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { featuredServices } from "@/data/services";
import { budgetOptions, timelineOptions, type LeadSource } from "@/lib/lead/options";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { cn, whatsappUrl } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";

type Source = LeadSource;
type Status = "idle" | "sending" | "error";
type FieldErrors = Partial<Record<string, string[]>>;

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Props = {
  source: Source;
  /** Compact = name, phone, email, message. Full adds company, service, budget, timeline. */
  variant?: "full" | "compact";
  defaultService?: string;
  defaultMessage?: string;
  submitLabel?: string;
  tone?: "paper" | "ink";
};

export function LeadForm({ source, variant = "full", defaultService, defaultMessage, submitLabel = "Send enquiry", tone = "paper" }: Props) {
  const router = useRouter();
  const formId = useId();
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  const started = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: source });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: data.consent === "on",
          source,
          page: window.location.pathname,
          attribution: getAttribution(),
          elapsed: Date.now() - renderedAt.current,
          turnstileToken: data["cf-turnstile-response"],
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        setFieldErrors(json.fieldErrors ?? {});
        track("form_error", { form: source, status: res.status });
        const firstInvalid = json.fieldErrors && Object.keys(json.fieldErrors)[0];
        if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
        return;
      }
      track("form_submit", { form: source, service: data.service });
      router.push(`/thank-you?from=${source}`);
    } catch {
      setStatus("error");
      setError("Network error — check your connection and try again, or message us on WhatsApp.");
      track("form_error", { form: source, status: "network" });
    }
  }

  const dark = tone === "ink";
  const inputCls = cn(
    "peer block w-full rounded-none border-0 border-b bg-transparent px-0 pt-6 pb-2.5 text-base outline-none transition-colors placeholder:text-transparent focus:ring-0",
    dark ? "border-paper/30 focus:border-edge" : "border-ink/25 focus:border-ink",
    "aria-[invalid=true]:border-danger",
  );
  const labelCls = cn(
    "pointer-events-none absolute top-6 left-0 origin-left text-base transition-all duration-200",
    "peer-focus:top-0 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.8]",
    dark ? "text-muted-dark" : "text-muted",
  );

  const field = (name: string, label: string, opts: { type?: string; required?: boolean; autoComplete?: string; textarea?: boolean; inputMode?: "tel" | "email" | "url" } = {}) => {
    const id = `${formId}-${name}`;
    const err = fieldErrors[name]?.[0];
    const Tag = opts.textarea ? "textarea" : "input";
    return (
      <div className="relative">
        <Tag
          id={id}
          name={name}
          defaultValue={name === "message" ? defaultMessage : undefined}
          type={opts.textarea ? undefined : (opts.type ?? "text")}
          required={opts.required}
          autoComplete={opts.autoComplete}
          inputMode={opts.inputMode}
          placeholder={label}
          rows={opts.textarea ? 4 : undefined}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-err` : undefined}
          className={cn(inputCls, opts.textarea && "resize-y")}
        />
        <label htmlFor={id} className={labelCls}>
          {label}
          {opts.required ? <span aria-hidden> *</span> : <span> (optional)</span>}
        </label>
        {err && (
          <p id={`${id}-err`} className="mt-1.5 text-sm text-danger">
            {err}
          </p>
        )}
      </div>
    );
  };

  const select = (name: string, label: string, options: readonly string[], defaultValue?: string) => {
    const id = `${formId}-${name}`;
    return (
      <div>
        <label htmlFor={id} className={cn("text-sm", dark ? "text-muted-dark" : "text-muted")}>
          {label} <span>(optional)</span>
        </label>
        <select
          id={id}
          name={name}
          defaultValue={defaultValue ?? ""}
          className={cn(
            "mt-1 block w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 py-2.5 text-base outline-none",
            dark ? "border-paper/30 focus:border-edge [&>option]:text-ink" : "border-ink/25 focus:border-ink",
          )}
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} onFocus={onFocus} noValidate={false} className="space-y-7" aria-describedby={error ? `${formId}-status` : undefined} data-track-location={`form_${source}`}>
      {TURNSTILE_SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      <div className="grid gap-7 sm:grid-cols-2">
        {field("name", "Your name", { required: true, autoComplete: "name" })}
        {field("phone", "Phone / WhatsApp", { required: true, type: "tel", autoComplete: "tel", inputMode: "tel" })}
        {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
        {variant === "full"
          ? field("company", "Company / brand", { autoComplete: "organization" })
          : field("website", "Website or Instagram")}
      </div>

      {variant === "full" && (
        <>
          {field("website", "Website or Instagram")}
          <div className="grid gap-7 sm:grid-cols-3">
            {select("service", "What do you need?", [...featuredServices.map((s) => s.name), "Not sure yet"], defaultService)}
            {select("budget", "Approx. budget", budgetOptions)}
            {select("timeline", "Timeline", timelineOptions)}
          </div>
        </>
      )}

      {field("message", variant === "full" ? "Tell us about the project" : "What should we look at? (optional notes)", { textarea: true })}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company URL
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme={dark ? "dark" : "light"} />}

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-edge-deep)]" />
        <span className={dark ? "text-muted-dark" : "text-muted"}>
          I agree to InsideEdge contacting me about this enquiry, as described in the{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </span>
      </label>
      {fieldErrors.consent?.[0] && <p className="-mt-4 text-sm text-danger">{fieldErrors.consent[0]}</p>}

      <div aria-live="polite" id={`${formId}-status`}>
        {status === "error" && error && (
          <div role="alert" className={cn("rounded-xl border p-4 text-sm", dark ? "border-danger/60 bg-danger/10" : "border-danger/30 bg-danger/5")}>
            <p className="font-semibold text-danger">{error}</p>
            <a href={whatsappUrl("Hi InsideEdge, I tried your website form but it didn't go through. I'd like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2">
              <WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp instead
            </a>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full px-8 text-base font-semibold transition-colors sm:w-auto",
          dark ? "bg-edge text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-edge hover:text-ink",
          "disabled:cursor-wait disabled:opacity-70",
        )}
      >
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
