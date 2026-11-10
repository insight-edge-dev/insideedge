import { expect, test } from "@playwright/test";
import type { Lead } from "../src/lib/lead/schema";
import { sendViaResend } from "../src/lib/lead/resend";

const lead: Lead = {
  name: "Launch Test",
  phone: "+91 98765 43210",
  email: "visitor@example.com",
  company: "Example & Co",
  website: undefined,
  service: "Complete Brand Creation & Launch",
  budget: undefined,
  timeline: undefined,
  message: "Please cover Discover, Source, Create, Build, Launch and Grow.",
  source: "contact",
  page: "/contact",
  consent: true,
};

test("Resend request preserves recipient, verified sender, reply-to and Brand Launch context", async () => {
  let requestUrl = "";
  let requestInit: RequestInit | undefined;
  const mockFetch = async (input: string | URL | Request, init?: RequestInit) => {
    requestUrl = String(input);
    requestInit = init;
    return new Response(JSON.stringify({ id: "mock-email-id" }), { status: 200 });
  };

  await expect(
    sendViaResend(
      lead,
      {
        apiKey: "mock-server-key",
        to: "insideedgellp@gmail.com",
        from: "InsideEdge Website <leads@insideedge.in.net>",
      },
      mockFetch,
    ),
  ).resolves.toBe("resend");

  expect(requestUrl).toBe("https://api.resend.com/emails");
  expect(requestInit?.method).toBe("POST");
  expect(requestInit?.headers).toEqual({
    Authorization: "Bearer mock-server-key",
    "Content-Type": "application/json",
  });

  const payload = JSON.parse(String(requestInit?.body));
  expect(payload).toMatchObject({
    from: "InsideEdge Website <leads@insideedge.in.net>",
    to: ["insideedgellp@gmail.com"],
    reply_to: "visitor@example.com",
  });
  expect(payload.text).toContain("Service: Complete Brand Creation & Launch");
  expect(payload.text).toContain("Consent: Granted for responding to this enquiry");
  expect(payload.html).toContain("Example &amp; Co");
});

test("Resend failure is surfaced without exposing the provider response body", async () => {
  const mockFetch = async () =>
    new Response(JSON.stringify({ message: "provider-secret-details" }), { status: 403 });

  await expect(
    sendViaResend(
      lead,
      {
        apiKey: "mock-server-key",
        to: "insideedgellp@gmail.com",
        from: "InsideEdge Website <leads@insideedge.in.net>",
      },
      mockFetch,
    ),
  ).rejects.toThrow("Resend request failed (403)");
});
