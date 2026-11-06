import { expect, test, type Page } from "@playwright/test";
import { brandLaunchCategories as categories } from "../src/data/brand-launch";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ie_consent_v1", JSON.stringify({ analytics: false, marketing: false, ts: 1 })));
});

async function showSection(page: Page, reduced = true) {
  await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
  await page.goto("/");
  // Wait for hydration before scrolling; the existing smooth-scroll mount resets the page to its top.
  await expect(page.locator("#brand-launch")).toHaveAttribute("data-motion", reduced ? "reduced" : "enabled");
  await page.locator("#brand-launch").evaluate((element) => element.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForFunction(() => {
    const image = document.querySelector<HTMLImageElement>('#brand-launch img[alt*="green tea tin"]');
    return image?.complete && image.naturalWidth > 0;
  });
  return page.locator("#brand-launch");
}

async function leaveControls(page: Page) {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.mouse.move(-10, -10);
}

test("eight categories, stable layout, navigation and category-specific links", async ({ page, isMobile }) => {
  const section = await showSection(page);
  const initialHeight = (await section.boundingBox())!.height;
  await expect(section.locator("img")).toHaveCount(2);
  for (const [index, category] of categories.entries()) {
    await section.getByRole("button", { name: `Show ${category.category}`, exact: true }).click();
    await expect(section).toHaveAttribute("data-category", category.id);
    await expect(section.getByRole("heading", { name: category.headline, exact: true })).toBeVisible();
    await expect(section.getByRole("link", { name: category.ctaLabel, exact: true })).toHaveAttribute("href", `/contact?interest=${category.id}`);
    await expect(section.getByRole("link")).toHaveCount(1);
    await expect(section.getByRole("status")).toContainText(`${index + 1} of 8`);
    await expect(section.getByRole("button", { name: `Show ${category.category}`, exact: true })).toHaveAttribute("aria-pressed", "true");
    expect(Math.abs((await section.boundingBox())!.height - initialHeight)).toBeLessThan(1);
  }
  await expect(section.getByRole("button", { name: /play|pause/i })).toHaveCount(0);
  if (!isMobile) {
    await section.getByRole("button", { name: "Next category", exact: true }).click();
    await expect(section).toHaveAttribute("data-category", "tea");
    await section.getByRole("button", { name: "Previous category", exact: true }).click();
    await expect(section).toHaveAttribute("data-category", "cafes-hospitality");
  }
  await expect(page.locator("h1")).toContainText("Creative that");
  await expect(page.locator("#clients-heading")).toBeAttached();
  await expect(page.locator("#services")).toBeAttached();
});

test("autoplay loops every seven seconds and manual navigation resets the timer", async ({ page }) => {
  await page.clock.install();
  const section = await showSection(page, false);
  await leaveControls(page);
  await expect(section).toHaveAttribute("data-autoplay", "running");
  for (let i = 1; i <= 8; i++) {
    await page.clock.fastForward(7100);
    await expect(section).toHaveAttribute("data-category", categories[i % 8].id);
    await expect(section).toHaveAttribute("data-autoplay", "running");
    await expect(section.getByRole("status")).toHaveText("");
  }
  await page.clock.fastForward(4000);
  await section.getByRole("button", { name: "Show Coffee", exact: true }).click();
  await leaveControls(page);
  await expect(section).toHaveAttribute("data-autoplay", "running");
  await page.clock.fastForward(6800);
  await expect(section).toHaveAttribute("data-category", "coffee");
  await page.clock.fastForward(300);
  await expect(section).toHaveAttribute("data-category", "beauty-skincare");
});

test("focus, hidden tab and offscreen stop autoplay without a playback control", async ({ page }) => {
  await page.clock.install();
  const section = await showSection(page, false);
  await section.getByRole("link").focus();
  await expect(section).toHaveAttribute("data-autoplay", "paused");
  await page.clock.fastForward(10000);
  await expect(section).toHaveAttribute("data-category", "tea");
  await leaveControls(page);
  await expect(section).toHaveAttribute("data-autoplay", "running");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(section).toHaveAttribute("data-autoplay", "paused");
  await page.clock.fastForward(10000);
  await expect(section).toHaveAttribute("data-category", "tea");
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
  });
  await page.clock.runFor(100);
  await expect(section).toHaveAttribute("data-autoplay", "paused");
  await page.clock.fastForward(10000);
  await expect(section).toHaveAttribute("data-category", "tea");
});

test("hover pauses without losing elapsed time", async ({ page, isMobile }) => {
  test.skip(isMobile, "Touch input has no hover state.");
  await page.clock.install();
  const section = await showSection(page, false);
  await leaveControls(page);
  await expect(section).toHaveAttribute("data-autoplay", "running");
  await page.clock.fastForward(3000);
  await section.getByRole("heading", { name: categories[0].headline }).hover();
  await expect(section).toHaveAttribute("data-autoplay", "paused");
  await page.clock.fastForward(10000);
  await expect(section).toHaveAttribute("data-category", "tea");
  await leaveControls(page);
  await page.clock.fastForward(3000);
  await expect(section).toHaveAttribute("data-category", "tea");
  await page.clock.fastForward(1100);
  await expect(section).toHaveAttribute("data-category", "coffee");
});

test("reduced motion disables autoplay; keyboard navigation retains focus", async ({ page }) => {
  await page.clock.install();
  const section = await showSection(page);
  await page.clock.fastForward(20000);
  await expect(section).toHaveAttribute("data-category", "tea");
  await expect(section).toHaveAttribute("data-motion", "reduced");
  await expect(section.getByRole("button", { name: /play|pause/i })).toHaveCount(0);
  const button = section.getByRole("button", { name: "Show Beauty & Skincare", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(section).toHaveAttribute("data-category", "beauty-skincare");
  await expect(button).toBeFocused();
  await expect(section.locator('[inert] a, [inert] button')).toHaveCount(0);
});

test("horizontal touch swipe changes category; vertical movement does not", async ({ page }) => {
  const section = await showSection(page);
  const image = section.locator("picture").first();
  await image.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 280, clientY: 200 }] });
  await image.dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 100, clientY: 210 }] });
  await expect(section).toHaveAttribute("data-category", "coffee");
  await image.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 100, clientY: 200 }] });
  await image.dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 120, clientY: 400 }] });
  await expect(section).toHaveAttribute("data-category", "coffee");
  await image.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 100, clientY: 200 }] });
  await image.dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 280, clientY: 200 }] });
  await expect(section).toHaveAttribute("data-category", "tea");
});

test("rapid category changes settle on the requested photograph and CTA", async ({ page }) => {
  const section = await showSection(page, false);
  await section.evaluate((element) => {
    const buttons = element.querySelectorAll<HTMLButtonElement>('[aria-label^="Show "]');
    for (const index of [7, 2, 5, 1, 6, 3, 4]) buttons[index].click();
  });
  await expect(section).toHaveAttribute("data-category", "food-beverage");
  await expect(section.locator('[data-art][data-active="true"]')).toHaveCount(1);
  await expect(section.locator('[data-art][data-active="true"]')).toHaveAttribute("data-art", "food-beverage");
  await expect(section.getByRole("link")).toHaveAttribute("href", "/contact?interest=food-beverage");
});

test("mobile sticky WhatsApp yields while the showcase is visible and returns afterward", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The sticky WhatsApp control is mobile-only.");
  await showSection(page);
  const whatsapp = page.locator('[data-track-location="sticky_mobile"]');
  await expect(whatsapp).toHaveAttribute("aria-hidden", "true");
  await expect(whatsapp).toHaveCSS("opacity", "0");
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(whatsapp).toHaveAttribute("aria-hidden", "false");
  await expect(whatsapp).toHaveCSS("opacity", "1");
});

test("each contact query prefills its own enquiry; unknown and repeated values do not", async ({ page }) => {
  for (const category of categories) {
    await page.goto(`/contact?interest=${category.id}`);
    await expect(page.locator('textarea[name="message"]')).toHaveValue(category.inquiry);
  }
  for (const query of ["", "?interest=unknown", "?interest=tea&interest=coffee"]) {
    await page.goto(`/contact${query}`);
    await expect(page.locator('textarea[name="message"]')).toHaveValue("");
  }
});

test("CTA uses existing analytics and contact form preserves edits through validation and delivery", async ({ page }) => {
  const section = await showSection(page);
  await section.getByRole("button", { name: "Show Tea", exact: true }).click();
  const events: unknown[][] = [];
  await page.exposeFunction("recordShowcaseEvent", (...args: unknown[]) => events.push(args));
  await page.evaluate(() => {
    window.gtag = (...args: unknown[]) => (window as unknown as { recordShowcaseEvent: (...args: unknown[]) => void }).recordShowcaseEvent(...args);
  });
  await section.getByRole("link", { name: categories[0].ctaLabel }).click();
  await expect(page).toHaveURL(/\/contact\?interest=tea$/);
  expect(events).toContainEqual(["event", "brand_launch_cta_click", expect.objectContaining({ category: "tea", slide_index: 1, cta_location: "brand_launch_showcase", contact_method: "contact_form" })]);
  const message = page.locator('textarea[name="message"]');
  await expect(message).toHaveValue(categories[0].inquiry);
  const edited = "Our Assam tea launch needs a new identity and website. Please call next week.";
  await message.fill(edited);
  await page.getByLabel(/Your name/).fill("Showcase Test");
  await page.getByLabel(/Phone \/ WhatsApp/).fill("+91 98765 43210");
  await page.locator('input[name="consent"]').check();
  await page.route("**/api/lead", (route) => route.fulfill({ status: 422, json: { error: "Please check your phone", fieldErrors: { phone: ["Please check your phone"] } } }));
  await page.getByRole("button", { name: "Send project brief" }).click();
  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await expect(message).toHaveValue(edited);
  await page.unroute("**/api/lead");
  let submitted: Record<string, unknown> = {};
  await page.route("**/api/lead", (route) => {
    submitted = route.request().postDataJSON();
    return route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.getByRole("button", { name: "Send project brief" }).click();
  await expect(page).toHaveURL(/\/thank-you\?from=contact/);
  expect(submitted).toMatchObject({ message: edited, source: "contact", consent: true });
});

const viewports = [
  { width: 1920, height: 1080 }, { width: 1440, height: 900 },
  { width: 1024, height: 768 }, { width: 768, height: 1024 },
  { width: 430, height: 932 }, { width: 393, height: 852 },
  { width: 390, height: 844 }, { width: 375, height: 812 },
  { width: 360, height: 800 }, { width: 390, height: 700 },
  { width: 844, height: 390 }, { width: 667, height: 375 },
];

for (const viewport of viewports) {
  test(`visual and overflow check ${viewport.width}x${viewport.height}`, async ({ page, isMobile }, testInfo) => {
    test.skip(isMobile, "Exact viewport matrix runs once in the desktop project; mobile interactions run separately.");
    await page.setViewportSize(viewport);
    const section = await showSection(page);
    for (const index of categories.keys()) {
      const category = categories[index];
      await section.getByRole("button", { name: `Show ${category.category}`, exact: true }).click();
      await expect.poll(() => section.locator(`img[alt=${JSON.stringify(category.imageAlt)}]`).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      const geometry = await section.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const content = [...element.querySelectorAll<HTMLElement>('[data-active="true"] h3, a, button')].filter((item) => item.getClientRects().length);
        return {
          pageOverflow: document.documentElement.scrollWidth > innerWidth,
          clipped: content.some((item) => {
            const box = item.getBoundingClientRect();
            return box.left < bounds.left - 1 || box.right > bounds.right + 1 || box.bottom > bounds.bottom + 1 || item.scrollWidth > item.clientWidth + 1;
          }),
        };
      });
      expect(geometry).toEqual({ pageOverflow: false, clipped: false });
      if (viewport.width < 768) {
        await expect(page.locator('[data-track-location="sticky_mobile"]')).toHaveCSS("opacity", "0");
      }
      await section.screenshot({
        path: testInfo.outputPath(`${category.id}-${viewport.width}.png`),
        animations: "disabled",
        // Fixed page chrome otherwise gets stitched into a tall element screenshot.
        style: 'body > header, body > a, nextjs-portal { visibility: hidden !important; }',
      });
    }
  });
}
