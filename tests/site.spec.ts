import { expect, test } from "@playwright/test";

// Pre-set a consent choice so the banner doesn't cover elements under test.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    window.localStorage.setItem("ie_consent_v1", JSON.stringify({ analytics: false, marketing: false, ts: 1 })),
  );
});

test("homepage renders positioning, CTAs and a single h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Creative that");
  await expect(page.getByRole("link", { name: /Start a Project/ }).first()).toBeVisible();
  await expect(page.locator('a[href^="https://wa.me/"]').first()).toBeAttached();
  const html = await page.content();
  expect(html).not.toContain("insideedge.info");
});

test("navigation reaches the services index", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Services", exact: true }).click();
  } else {
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Services" }).click();
  }
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("h1")).toContainText("One team");
});

test("service page renders with FAQ schema and contextual WhatsApp", async ({ page }) => {
  await page.goto("/services/meta-ads");
  await expect(page.locator("h1")).toContainText("Facebook and Instagram");
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.join()).toContain('"FAQPage"');
  expect(ld.join()).toContain('"BreadcrumbList"');
  const wa = await page.locator('a[href^="https://wa.me/"]').first().getAttribute("href");
  expect(decodeURIComponent(wa!)).toContain("Meta Ads");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.insideedge.in.net/services/meta-ads");
});

test("unknown routes return the branded 404", async ({ page }) => {
  const res = await page.goto("/services/not-a-service");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("off strategy");
});

test("work page filters clients by industry", async ({ page }) => {
  await page.goto("/work");
  const cards = page.locator("main ul li", { has: page.locator("img") });
  const all = await cards.count();
  await page.getByRole("button", { name: "Healthcare", exact: true }).click();
  await expect(page.getByRole("button", { name: "Healthcare", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => cards.count()).toBeLessThan(all);
});

test("contact form blocks empty submission, then submits and redirects to thank-you", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator("form");
  await form.getByRole("button", { name: /Send project brief/ }).click();
  await expect(page).toHaveURL(/\/contact$/); // native required validation stops it

  // Stub the API so the test doesn't send a real lead.
  await page.route("**/api/lead", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  await form.getByLabel(/Your name/).fill("Test Person");
  await form.getByLabel(/Phone \/ WhatsApp/).fill("+91 98765 43210");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: /Send project brief/ }).click();
  await expect(page).toHaveURL(/\/thank-you\?from=contact/);
  await expect(page.locator("h1")).toContainText("Thank you");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test.describe("lead API", () => {
  test("rejects invalid fields with field errors", async ({ request }) => {
    const res = await request.post("/api/lead", {
      data: { name: "A", phone: "abc", email: "nope", consent: true, elapsed: 5000 },
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(Object.keys(body.fieldErrors)).toEqual(expect.arrayContaining(["name", "phone", "email"]));
  });

  test("silently drops honeypot submissions", async ({ request }) => {
    const res = await request.post("/api/lead", {
      data: { name: "Bot", phone: "9999999999", consent: true, company_url: "http://spam", elapsed: 5000 },
    });
    expect(res.status()).toBe(200);
  });

  test("rejects cross-origin posts", async ({ request }) => {
    const res = await request.post("/api/lead", {
      headers: { origin: "https://evil.example" },
      data: { name: "X" },
    });
    expect(res.status()).toBe(403);
  });
});

test("robots and sitemap expose the canonical domain", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("https://www.insideedge.in.net/sitemap.xml");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://www.insideedge.in.net/services/performance-marketing");
  expect(sitemap).not.toContain("/thank-you");
});

test.describe("fresh visitor", () => {
  test("consent banner shows server-side, and stays dismissed after a choice", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");
    const banner = page.getByRole("region", { name: "Cookies, honestly." });
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Reject non-essential" }).click();
    await expect(banner).toBeHidden();
    await page.reload();
    await expect(banner).toBeHidden();
    await context.close();
  });
});

test("skip link is the first keyboard stop and moves focus to main", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard navigation is a desktop concern");
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
