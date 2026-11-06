# Brand Launch Showcase

## Scope

Added immediately after the existing homepage Hero. Existing hero, homepage sections, global styles, business details, client roster, legal pages, consent implementation and lead API were not redesigned or replaced.

- One typed catalogue: `src/data/brand-launch.ts`.
- One client component and scoped CSS module: `src/components/home/BrandLaunchShowcase.*`.
- Contact page validates `interest` against the catalogue and passes an uncontrolled default message to the existing LeadForm. It now renders on request to read Next.js 16 asynchronous search parameters. Unknown or repeated values leave the message blank. User edits are never synchronized away by an effect.
- Category CTA event goes through the existing `track` function and its existing Google consent-mode / consent-gated vendor setup. Slide indices are one-based.
- Packaging references invite a scope discussion. They do not promise manufacturing, sourcing, registration, licensing or an unconfirmed packaging service.

## Behaviour

Tea starts first, followed by the other seven categories. Seven seconds of active viewing per slide; 800ms photographic crossfades and a restrained 700ms text entrance. Hover, focus within the section, an offscreen section or a hidden tab suspend the remaining time. Manual selection resets it. Reduced motion disables autoplay and transitions. The visible playback control and its state were removed at the user's request during the refinement; there is no replacement playback control.

Navigation uses native buttons. The CTA keeps its DOM identity across changes. Only manual navigation updates the polite announcement. Inactive slide content is inert and hidden from assistive technology. Swipes are handled across the campaign canvas, excluding links and buttons, with vertical scrolling and pinch zoom preserved.

## Visual Refinement

The initial split-panel composition was replaced with an asymmetrical desktop photographic field and a mobile poster composition. The mobile headline sits above the image, with short supporting copy and a yellow CTA below it; soft photographic edges join the elements without a separate content panel. The overall introduction remains the accessible section heading, while the category headline is the visible display heading.

- The same eight approved photographs and mobile files are retained, unchanged. Category-specific positioning keeps Beauty, Fashion and Hospitality subjects framed appropriately.
- Existing category names, headlines, CTA labels, contact routes, inquiry defaults and analytics payloads remain intact. Supporting descriptions were shortened, without adding unconfirmed service promises.
- Duplicate counters, tiny service labels and the second mobile control row were removed. Mobile has eight directly selectable progress indicators; desktop retains category names and previous/next arrows.
- Mobile now uses one continuous portrait campaign canvas: the category image runs behind the headline, supporting copy, CTA and progress indicators, with restrained readability shading instead of separate black content panels.
- Mobile CTA uses the full content width. The global floating WhatsApp control fades out and leaves the tab order whenever any part of the showcase is visible, then returns when the visitor leaves the section.
- At 390x844 the section is 772px tall, down from 1070px. Minimum rather than fixed heights allow content to grow on short screens. Landscape cases are checked separately.
- No hero, other homepage section, global style, business information, contact integration, image asset or dependency was changed by this refinement.

Images load lazily below the hero. Once visible, only the next category is fetched ahead; previously viewed images remain cached/mounted for crossfades. All eight full-size images are not fetched at first paint. Responsive picture sources use Next.js Image optimization and portrait mobile crops.

## Asset Provenance

Created with the built-in image-generation tool for this request, not sourced from stock libraries or client campaigns. All eight are AI-generated photographic concepts, not photographs of actual InsideEdge client products or venues. Every slide visibly discloses this. No invented logos or readable AI-generated text were included.

Final assets: `public/images/brand-launch/<category>.webp` (1536 x 1024) and `<category>-mobile.webp` (800 x 1000). Original PNGs were retained in the generation directory. `scripts/prepare-brand-launch.mjs <source-directory>` recreates the WebP exports using the existing Next.js Sharp dependency; no packages were added.

Original generation directory: `C:/Users/ABHISHEK KUMAR/.codex/generated_images/01a12e99-59ca-7702-a344-539b1e777838`.

### Prompt Set

#### tea

Original: `exec-2e5c0a72-e9be-4fe1-bfa9-0a5652cbabca.png`

Create a premium editorial product photograph for a creative agency concept showcase, category ASSAM TEA. Landscape 3:2 composition. A sculptural matte forest-green tea tin with a blank warm-white label, a small clear glass cup of amber Assam tea, fresh tea leaves and a restrained scattering of dry tea on a warm pale stone tabletop, deep olive backdrop, beautiful directional afternoon sunlight, real tactile paper and metal, exquisite food photography. Subjects grouped centrally and right, the entire product grouping must also fit a central portrait crop. Authentic understated luxury, not CGI. No words, no typography, no letters, no numbers, no logos, no watermark. This is a fictional unbranded concept, not an actual client campaign.

#### coffee

Original: `exec-484753f7-44dd-4e86-ab52-5ecae05a8627.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. An espresso in a small charcoal ceramic cup, a folded unbranded burgundy coffee bag with a blank cream label, roasted coffee beans, a stainless steel spoon on pale limestone, soft cafe daylight, rich espresso and restrained wine-red tones. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

#### beauty-skincare

Original: `exec-348241af-1276-4d67-bcd0-55338d2f8001.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. A translucent frosted glass serum bottle with a brushed silver cap, a low pale pink cosmetic jar and one folded white linen towel on a soft blush stone surface, sculptural side lighting, beautiful precise reflections, high-end beauty editorial. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

#### masalas

Original: `exec-521a2360-b43e-4f42-8e9f-d4701ee98b9a.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. A low red ochre ceramic bowl of turmeric, dried red chilies, cumin seeds and a restrained matte terracotta spice tin with a completely blank label, on natural warm grey stone. Intense real textures, bold yellow and red ingredients, sidelight, exquisite Indian food editorial. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

#### food-beverage

Original: `exec-5a2f5929-6885-4f8f-a1ec-a64938ccf1f5.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. A beautiful clear glass bottle of citrus beverage with a completely blank pale yellow label beside a glass with ice, sliced orange and lime and a small plate of golden crackers, pale pistachio tabletop, crisp sunlight, appetizing premium food editorial. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

#### fashion-lifestyle

Original: `exec-a902b73f-e5eb-4e50-b142-d47aaf6ff09b.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. A carefully styled sculptural black leather handbag beside a folded ivory cotton shirt and silver sunglasses on a natural grey stone bench, editorial fashion still life, soft daylight, no people, tactile fabric and real leather, monochrome with restrained warm sunlight. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

#### organic-wellness

Original: `exec-d16efffc-0268-4c4d-b024-a4c7dd141fe5.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. A translucent amber glass jar with a blank cream label, a small ceramic bowl with dried botanicals and fresh green herbal sprigs on soft pale green stone, folded natural linen, calm daylight, subtle organic textures, premium botanical product editorial. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

#### cafes-hospitality

Original: `exec-a2961c2d-306c-432c-983e-439df8701597.png`

Create a premium original editorial PHOTOGRAPH for a creative agency brand concept showcase. Landscape 3:2. A beautiful intimate independent cafe interior with deep forest-green banquette, round marble table bearing two elegant ceramic cups and a freshly baked croissant, warm wall lights and sunlit window, thoughtfully composed architectural hospitality photography, no people, no signage. Central subject arrangement suitable for a central portrait crop as well as landscape. Real photographic materials and tasteful art direction, not illustration or CGI, no decorative artificial shapes. No words, typography, letters, numbers, logos, watermark or readable text anywhere. Fictional unbranded concept, not an actual client campaign.

## Validation

`tests/brand-launch.spec.ts` covers every category, links, inquiry defaults, edited-message submission, event payload, autoplay loop/reset, pause conditions, reduced motion, keyboard focus, horizontal versus vertical touch, rapid category changes and viewport geometry. It saves all eight category states at 1920x1080, 1440x900, 1024x768, 768x1024, 430x932, 393x852, 390x844, 360x800, 844x390 and 667x375. Existing site regression tests remain in `tests/site.spec.ts`.

The first restricted production build could not fetch the existing Google Fonts. It succeeded when run with approved network access. No fonts were replaced.

### Initial Implementation Results

- `npm run lint`: passed, no warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- Production Playwright run on port 3301 using installed Chrome, two workers: 44 passed, 8 intentionally skipped. The skips are mobile hover, the duplicate six-size visual matrix in the mobile project, and the existing desktop-only skip-link test. The test server needed explicit shutdown on Windows after all cases completed; the runner then exited with code 0.
- Visual inspection: Tea, Skincare, Masalas and Fashion across the six-size screenshot matrix; additional actual 390px viewport captures for photography and CTA/navigation. No horizontal overflow, clipped headings or slide-to-slide section height changes in geometry assertions. Mobile controls reserve space for the existing floating WhatsApp button.
- Full-section screenshots can include fixed site chrome in stitched positions. Actual mobile viewport captures in `test-results/brand-launch-review/` were checked separately to distinguish those capture artifacts from real overlaps.
- Existing unknown-service 404 tests still pass, although Next.js logs `Internal: NoFallbackError` for those requests. That unrelated route implementation was left untouched.
- Source-hash comparison against the start of this task confirms only four existing source files changed: homepage insertion, contact query handling, the optional LeadForm default message, and the analytics event type. Hero, global CSS, other homepage sections, all other existing source files, package manifests and dependencies were not changed by this task.

Preview on the existing development server: `http://localhost:3000/#brand-launch`.

### Showcase Refinement Results

- `npm run lint`: passed, no warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; 42 routes generated successfully.
- Focused final visual and rapid-transition run: all 11 cases reported passing.
- Full production Playwright run on port 3301 using installed Chrome and two workers: all 62 cases reported, with 50 passed and 12 expected project/device skips. There were no assertion failures. After the final result, Playwright stalled during Windows child-process teardown and was stopped manually after its test server and child processes were confirmed closed.
- All eight categories were visually inspected at 1440px and 390px. The longest mobile compositions were also checked at 360px, and both requested landscape sizes were reviewed. No horizontal overflow, clipped heading, CTA collision or floating WhatsApp overlap was found.
- Refinement scope: `BrandLaunchShowcase.tsx`, its CSS module, the global `StickyWhatsApp` visibility behavior, supporting display descriptions in `src/data/brand-launch.ts`, focused Playwright coverage and this document. No image, package manifest, dependency, hero, global style or unrelated homepage section was changed by the refinement.

### Final Mobile Campaign Refinement

- Retained all eight approved portrait assets and added category-specific focal positioning for Tea, Coffee, Beauty, Masalas, Food, Fashion, Wellness and Hospitality.
- Headline scale is fluid from 32px to 38px with balanced wrapping. Important supporting copy remains 15px, and every yellow CTA retains at least a 56px touch target.
- Verified all eight compositions at 390px and 360px. The automated matrix also covers 430x932, 393x852, 375x812, the short 390x700 case, 844x390 and 667x375, plus the existing desktop/tablet sizes.
- Final showcase Playwright run: all 44 cases reported, with 30 passed and 14 expected project/device skips; no assertion failed. Site smoke run: 23 passed and one existing device-specific skip.
- On this Windows environment, Playwright sometimes remains open during child-process teardown after every result has reported. Test-owned sessions were stopped only after the complete result list appeared.
