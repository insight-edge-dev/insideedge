/**
 * Service catalogue. Deliverable lists describe the scope InsideEdge offers;
 * TODO_CONTENT: management to validate each list (and confirm SEO and
 * influencer marketing are actively sold) before launch.
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  index: string;
  name: string;
  /** Short name for menus and chips. */
  short: string;
  /** Shown on the homepage services index. */
  featured: boolean;
  /** Parent service for sub-specialisms such as Meta Ads. */
  parent?: string;
  headline: string;
  summary: string;
  intro: string;
  whoFor: string[];
  problems: { title: string; body: string }[];
  deliverables: string[];
  process: { title: string; body: string }[];
  faqs: Faq[];
  related: string[];
  seo: { title: string; description: string };
  whatsapp: string;
};

export const services: Service[] = [
  {
    slug: "brand-creation-launch",
    index: "01",
    name: "Brand Creation & Launch",
    short: "Brand Launch",
    featured: true,
    headline: "From your first business idea to a brand ready for market.",
    summary: "Concept development, sourcing coordination, identity, packaging, digital build and launch support in one coordinated journey.",
    intro:
      "InsideEdge helps entrepreneurs move from an idea toward a market-ready brand. We coordinate research, manufacturer and supplier discovery, identity, packaging, websites and marketing around the stages agreed for your project.",
    whoFor: [
      "Entrepreneurs starting with a product or business idea",
      "Businesses that need sourcing, brand and launch work coordinated together",
      "Existing product businesses preparing a new category or market launch",
    ],
    problems: [
      { title: "Too many disconnected vendors", body: "Research, sourcing, design, packaging and marketing move separately without one launch plan." },
      { title: "A product without a position", body: "A supplier or product is selected before the audience, category and brand proposition are clear." },
      { title: "Launch activity without foundations", body: "Campaigns begin before packaging, digital assets, tracking and customer journeys are ready." },
    ],
    deliverables: [
      "Business concept, category, audience and competitor research",
      "Manufacturer research, supplier identification and introduction coordination",
      "Brand positioning, naming support, identity and guidelines",
      "Packaging, label design and product presentation",
      "Website or e-commerce development and social profile setup",
      "Launch content, influencer, advertising and growth planning",
    ],
    process: [
      { title: "Discover", body: "Clarify the concept, category, audience, competitors, positioning and launch strategy." },
      { title: "Source", body: "Research possible manufacturers and suppliers, coordinate introductions and explore initial product and packaging feasibility." },
      { title: "Create", body: "Develop naming support, identity, guidelines, packaging, labels, creative direction and product presentation." },
      { title: "Build", body: "Create the website or e-commerce experience, digital assets, social profiles and conversion-focused landing pages." },
      { title: "Launch", body: "Coordinate campaign strategy, content production, social launch, creators and performance advertising." },
      { title: "Grow", body: "Support SEO, content, social management, optimisation, reporting and the next stage of brand growth." },
    ],
    faqs: [
      { q: "Does every project include all six stages?", a: "No. The exact stages, deliverables, responsibilities, fees and timeline are defined in your proposal or agreement." },
      { q: "Does InsideEdge manufacture products?", a: "No. We can research and introduce independent manufacturers or suppliers and coordinate agreed sourcing activity, but we do not own factories or manufacture products directly." },
      { q: "Do you guarantee a supplier, product quality or regulatory approval?", a: "No. Supplier availability and performance, samples, quality, pricing, minimum orders, certifications and regulatory requirements need independent verification. We help coordinate the process within the agreed scope." },
      { q: "Can you build the online store and market the launch?", a: "Yes. Depending on scope, we build with Shopify, WordPress or Next.js and can support content, SEO, influencer campaigns and performance advertising." },
    ],
    related: ["branding", "website-design-development", "social-media-marketing", "performance-marketing"],
    seo: {
      title: "Brand Creation & Launch Services in Guwahati",
      description: "Move from business idea to market-ready brand with sourcing coordination, strategy, identity, packaging, e-commerce and launch marketing from InsideEdge.",
    },
    whatsapp: "Hi InsideEdge, I have a business or product idea and would like to discuss complete brand creation and launch support.",
  },
  {
    slug: "social-media-marketing",
    index: "02",
    name: "Social Media & Content",
    short: "Social Media",
    featured: true,
    headline: "Social that builds demand, not just a feed.",
    summary:
      "Content strategy, production and community management that turns followers into enquiries.",
    intro:
      "Posting every day is not a strategy. We plan content around what your customers actually need to believe before they buy — then produce it, publish it and report on what moved the needle.",
    whoFor: [
      "Brands whose Instagram looks busy but doesn’t bring in enquiries",
      "Founders doing social themselves and running out of time",
      "Businesses launching into Guwahati, Assam or the wider North East",
    ],
    problems: [
      { title: "Inconsistent presence", body: "Posting in bursts, then going quiet for weeks. Algorithms and audiences both forget you." },
      { title: "Content without a job", body: "Pretty posts that don’t answer objections, explain the offer or ask for the next step." },
      { title: "No link to revenue", body: "Likes are reported. Enquiries, calls and store visits are not." },
    ],
    deliverables: [
      "Social media audit and competitor review",
      "Monthly content strategy and calendar",
      "Reels, carousels, statics and stories",
      "Copywriting and captions in English (Assamese/Hindi on request)",
      "Scheduling, publishing and community management",
      "Monthly performance report with recommendations",
    ],
    process: [
      { title: "Audit", body: "We review your accounts, competitors and audience to find the gaps." },
      { title: "Plan", body: "Content pillars, formats and a monthly calendar you approve before anything goes live." },
      { title: "Produce", body: "Design, shoot and edit in batches so quality stays high and deadlines don’t slip." },
      { title: "Publish & manage", body: "We post, respond and keep the community active." },
      { title: "Report & refine", body: "Monthly numbers, what worked, what we’re changing next." },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Primarily Instagram, Facebook and LinkedIn, with YouTube Shorts where it makes sense for your audience." },
      { q: "Do you shoot content or only design?", a: "Both. We produce design-led posts and handle photo and video shoots when your content plan needs original footage." },
      { q: "How soon will I see results?", a: "Consistency and quality improve from month one. Meaningful growth in reach and enquiries usually takes a few months of steady publishing — we’ll set realistic benchmarks during onboarding." },
      { q: "Can you work in Assamese?", a: "Yes. We can write and produce content in Assamese and Hindi as well as English." },
    ],
    related: ["performance-marketing", "video-production", "influencer-marketing"],
    seo: {
      title: "Social Media Marketing Agency in Guwahati",
      description:
        "Social media strategy, content production and management for brands in Guwahati and across Assam. Reels, design, community and reporting from InsideEdge.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Social Media service and would like to discuss my brand’s social presence.",
  },
  {
    slug: "performance-marketing",
    index: "03",
    name: "Performance Marketing",
    short: "Performance",
    featured: true,
    headline: "Ads that pay for themselves.",
    summary:
      "Meta and Google campaigns built around cost per lead and cost per sale — not vanity clicks.",
    intro:
      "Most ad accounts don’t fail because of the algorithm. They fail because the offer, the creative and the landing page don’t line up. We fix all three together, then scale what works.",
    whoFor: [
      "Businesses spending on ads without knowing what a lead costs",
      "Brands ready to move from boosting posts to structured campaigns",
      "Teams that need creative and media buying under one roof",
    ],
    problems: [
      { title: "Boosted posts, not campaigns", body: "Spending money without audiences, objectives or tracking set up properly." },
      { title: "Creative fatigue", body: "The same three ads running for months while costs creep up." },
      { title: "Leads that don’t convert", body: "Cheap form fills that your sales team can’t close." },
    ],
    deliverables: [
      "Ad account and tracking audit (Pixel, Conversions API, GA4)",
      "Campaign strategy and funnel structure",
      "Ad creative: statics, video and UGC-style edits",
      "Landing page recommendations or builds",
      "Weekly optimisation and budget management",
      "Monthly reporting on cost per lead / cost per sale",
    ],
    process: [
      { title: "Audit tracking", body: "No optimisation is possible if conversions aren’t measured correctly. We fix this first." },
      { title: "Define the offer", body: "What exactly are we selling, to whom, and why now?" },
      { title: "Build & launch", body: "Campaign structure, audiences and multiple creative angles." },
      { title: "Optimise weekly", body: "Cut what isn’t working, feed what is, refresh creative on a schedule." },
      { title: "Scale", body: "Increase budget only when unit economics hold." },
    ],
    faqs: [
      { q: "What budget do I need to start?", a: "It depends on your market and goals. We’ll recommend a test budget during the free audit so you’re not committing to spend before you see data." },
      { q: "Is ad spend included in your fee?", a: "No. Ad spend is paid directly to Meta or Google from your own account, so you keep full ownership and visibility." },
      { q: "Do you make the ad creatives?", a: "Yes. Creative is the biggest lever in paid social, so our designers and editors produce the ads alongside the media buying." },
      { q: "Will I own the ad accounts?", a: "Always. We work inside your Business Manager and Google Ads accounts." },
    ],
    related: ["meta-ads", "google-ads", "website-design-development"],
    seo: {
      title: "Performance Marketing Agency in Guwahati",
      description:
        "Meta Ads and Google Ads management focused on cost per lead and sales. Creative, tracking and optimisation for businesses in Assam and North East India.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Performance Marketing service and would like to discuss running ads for my business.",
  },
  {
    slug: "meta-ads",
    index: "03a",
    name: "Meta Ads",
    short: "Meta Ads",
    featured: false,
    parent: "performance-marketing",
    headline: "Facebook and Instagram ads that bring enquiries.",
    summary: "Full-funnel Meta campaigns with the creative to match.",
    intro:
      "Instagram is where most of your customers in Assam spend their scrolling time. We build Meta campaigns that stop that scroll and turn it into WhatsApp chats, form leads and sales.",
    whoFor: [
      "Local businesses that want more walk-ins, calls or WhatsApp enquiries",
      "E-commerce and D2C brands selling across India",
      "Real estate, healthcare and education brands generating leads",
    ],
    problems: [
      { title: "Only ‘boosting’ posts", body: "Boosts optimise for engagement, not customers." },
      { title: "Broken tracking", body: "Pixel misfiring, no Conversions API, so Meta can’t learn who buys." },
      { title: "Weak creative", body: "Ads that look like ads get skipped." },
    ],
    deliverables: [
      "Business Manager, Pixel and Conversions API setup",
      "Audience and funnel strategy",
      "Ad creative production (statics, reels, carousels)",
      "Lead form and WhatsApp click-to-chat campaigns",
      "Weekly optimisation and creative testing",
      "Monthly performance report",
    ],
    process: [
      { title: "Audit", body: "Account, pixel and past campaign review." },
      { title: "Strategy", body: "Objectives, audiences and creative angles." },
      { title: "Launch", body: "Structured campaigns with multiple creative tests." },
      { title: "Optimise", body: "Weekly changes based on cost per result." },
      { title: "Scale", body: "Grow budget on proven ad sets." },
    ],
    faqs: [
      { q: "Can you run click-to-WhatsApp ads?", a: "Yes. For many businesses in the North East, WhatsApp conversations convert better than forms, and we set these campaigns up regularly." },
      { q: "Do you handle Meta policy issues?", a: "We follow Meta’s advertising policies and help resolve disapprovals, though final decisions rest with Meta." },
    ],
    related: ["performance-marketing", "google-ads", "social-media-marketing"],
    seo: {
      title: "Meta Ads Agency in Guwahati — Facebook & Instagram Ads",
      description:
        "Facebook and Instagram ads management in Guwahati. Pixel and Conversions API setup, ad creative and weekly optimisation for lead generation and sales.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Meta Ads service and would like to discuss my business.",
  },
  {
    slug: "google-ads",
    index: "03b",
    name: "Google Ads",
    short: "Google Ads",
    featured: false,
    parent: "performance-marketing",
    headline: "Be there when they search for you.",
    summary: "Search, Performance Max and YouTube campaigns that capture intent.",
    intro:
      "When someone in Guwahati searches for what you sell, they’re ready to act. Google Ads puts you in front of them at that moment — if the account is set up properly.",
    whoFor: [
      "Service businesses with clear search demand (clinics, schools, real estate, B2B)",
      "Brands wasting spend on broad keywords",
      "Businesses without conversion tracking in Google Ads",
    ],
    problems: [
      { title: "Paying for the wrong searches", body: "Broad match without negatives burns budget on irrelevant queries." },
      { title: "No conversion tracking", body: "Smart bidding can’t work without clean conversion data." },
      { title: "Weak landing pages", body: "Traffic lands on a homepage that doesn’t answer the search." },
    ],
    deliverables: [
      "Google Ads and GA4 conversion tracking setup",
      "Keyword and competitor research",
      "Search, Performance Max and YouTube campaigns",
      "Ad copy and extensions",
      "Negative keyword management and bid optimisation",
      "Monthly reporting",
    ],
    process: [
      { title: "Research", body: "Search demand, competitors and cost estimates." },
      { title: "Tracking", body: "Calls, forms and WhatsApp clicks measured as conversions." },
      { title: "Build", body: "Tightly themed campaigns and landing page alignment." },
      { title: "Optimise", body: "Search term reviews, negatives and bidding." },
      { title: "Scale", body: "Expand to new keywords and formats once CPA is stable." },
    ],
    faqs: [
      { q: "Search or Performance Max?", a: "Usually Search first, because it gives cleaner data and control. Performance Max can be added once conversion tracking is reliable." },
      { q: "Do you do local campaigns?", a: "Yes. We geo-target campaigns to Guwahati, Assam or any region you serve." },
    ],
    related: ["performance-marketing", "seo", "website-design-development"],
    seo: {
      title: "Google Ads Agency in Guwahati",
      description:
        "Google Search, Performance Max and YouTube ads management for businesses in Guwahati and Assam, with proper conversion tracking and landing page alignment.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Google Ads service and would like to discuss my business.",
  },
  {
    slug: "branding",
    index: "04",
    name: "Branding & Identity",
    short: "Branding",
    featured: true,
    headline: "Look like the brand you’re becoming.",
    summary: "Strategy, naming, logo and visual identity systems that make you recognisable.",
    intro:
      "A brand is the shortcut customers use to decide whether to trust you. We build identities that are distinctive, consistent and practical to use across every touchpoint.",
    whoFor: [
      "New businesses launching in Assam and the North East",
      "Established brands that have outgrown their original logo",
      "Businesses whose visuals look different on every platform",
    ],
    problems: [
      { title: "Forgettable identity", body: "A logo that could belong to anyone in your category." },
      { title: "Inconsistency", body: "Different colours, fonts and tone on every channel." },
      { title: "No positioning", body: "Visuals without a clear idea of who you’re for and why you’re different." },
    ],
    deliverables: [
      "Brand discovery workshop",
      "Positioning and messaging framework",
      "Logo and identity system",
      "Colour, typography and graphic language",
      "Brand guidelines document",
      "Stationery, signage and social templates",
    ],
    process: [
      { title: "Discover", body: "Workshop with founders, customers and competitors." },
      { title: "Position", body: "Define the promise, personality and message." },
      { title: "Design", body: "Identity routes, refined into one system." },
      { title: "Apply", body: "Roll out across digital and print touchpoints." },
      { title: "Guide", body: "Guidelines so your team can use it correctly." },
    ],
    faqs: [
      { q: "How long does a brand identity take?", a: "It depends on scope. We’ll share a timeline with milestones after the discovery call." },
      { q: "Do I get the source files?", a: "Yes. You receive all final artwork files and guidelines once the project is complete." },
    ],
    related: ["website-design-development", "social-media-marketing", "video-production"],
    seo: {
      title: "Branding Agency in Guwahati — Logo & Identity Design",
      description:
        "Brand strategy, logo design and visual identity systems for businesses in Guwahati and Assam. Guidelines, templates and rollout by InsideEdge.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Branding service and would like to discuss a brand identity project.",
  },
  {
    slug: "website-design-development",
    index: "05",
    name: "Websites & Digital Experiences",
    short: "Websites",
    featured: true,
    headline: "Websites that sell while you sleep.",
    summary: "Fast, search-ready websites and landing pages designed to convert visitors into leads.",
    intro:
      "Your website is where every ad, post and referral eventually lands. We design and build sites that load fast, rank, and make the next step obvious.",
    whoFor: [
      "Businesses with an outdated or slow website",
      "Brands running ads to a homepage instead of a landing page",
      "Companies that need a site they can update themselves",
    ],
    problems: [
      { title: "Slow and dated", body: "Visitors leave before the page even loads on mobile data." },
      { title: "No clear next step", body: "Beautiful pages with no obvious call to action." },
      { title: "Invisible on Google", body: "Missing basics: titles, structured data, sitemaps, speed." },
    ],
    deliverables: [
      "UX strategy and sitemap",
      "UI design for desktop and mobile",
      "Development (Next.js, WordPress or Shopify depending on need)",
      "Technical SEO foundations",
      "Analytics and conversion tracking",
      "Landing pages for campaigns",
    ],
    process: [
      { title: "Plan", body: "Goals, audience, sitemap and content needs." },
      { title: "Design", body: "Wireframes, then full visual design for approval." },
      { title: "Build", body: "Responsive development with performance budgets." },
      { title: "Launch", body: "QA, tracking, redirects and search setup." },
      { title: "Improve", body: "Iterate using real visitor data." },
    ],
    faqs: [
      { q: "Which platform will you build on?", a: "We choose based on your needs: Next.js for performance-critical sites, WordPress for content-heavy sites, Shopify for e-commerce." },
      { q: "Can I edit the website myself?", a: "Yes, where needed we set up a CMS and show your team how to use it." },
      { q: "Do you provide hosting and maintenance?", a: "We can set up hosting and offer ongoing maintenance and updates." },
    ],
    related: ["seo", "branding", "performance-marketing"],
    seo: {
      title: "Website Design & Development in Guwahati",
      description:
        "Fast, conversion-focused website design and development in Guwahati. Landing pages, business websites and e-commerce with technical SEO built in.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Website Design service and would like to discuss a website project.",
  },
  {
    slug: "video-production",
    index: "06",
    name: "Video & Production",
    short: "Video",
    featured: true,
    headline: "Video that earns the watch.",
    summary: "Reels, ad films, brand videos and editing designed to hook fast and hold attention.",
    intro:
      "Video is now the default format on every platform. We plan, shoot and edit content that grabs attention in the first second and carries a clear message to the last.",
    whoFor: [
      "Brands that need a steady stream of short-form content",
      "Businesses launching a product, property or campaign",
      "Teams with raw footage that needs professional editing",
    ],
    problems: [
      { title: "Weak hooks", body: "Videos that lose viewers in the first two seconds." },
      { title: "Inconsistent quality", body: "Phone footage with no plan, sound or edit." },
      { title: "One-off shoots", body: "A single video instead of a library of cut-downs for every channel." },
    ],
    deliverables: [
      "Concept and scripting",
      "Shoot planning and production",
      "Short-form reels and ad edits",
      "Brand and corporate films",
      "Motion graphics and subtitles",
      "Cut-downs for every platform",
    ],
    process: [
      { title: "Brief", body: "Objective, audience, platforms and key message." },
      { title: "Script", body: "Hooks, storyboard and shot list." },
      { title: "Shoot", body: "Planned production days to maximise output." },
      { title: "Edit", body: "Pacing, sound, captions and motion." },
      { title: "Deliver", body: "Formats and versions ready for each platform." },
    ],
    faqs: [
      { q: "Do you shoot outside Guwahati?", a: "Yes. We travel for shoots across Assam and the North East; travel costs are quoted separately." },
      { q: "Can you edit footage we already have?", a: "Yes. We regularly edit client-supplied footage into reels, ads and long-form videos." },
    ],
    related: ["social-media-marketing", "performance-marketing", "influencer-marketing"],
    seo: {
      title: "Video Production Agency in Guwahati",
      description:
        "Reels, ad films and brand videos produced in Guwahati. Scripting, shooting, editing and motion graphics for brands across Assam and North East India.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Video Production service and would like to discuss a video project.",
  },
  {
    slug: "seo",
    index: "07",
    name: "SEO & Search",
    short: "SEO",
    featured: true,
    headline: "Get found by people already looking.",
    summary: "Technical SEO, local search and content that compounds over time.",
    intro:
      "Paid ads stop the moment you stop paying. Search visibility compounds. We fix the technical foundations, strengthen your local presence and build content that answers what your customers search for.",
    whoFor: [
      "Local businesses that don’t appear in Google Maps results",
      "Websites with traffic that has plateaued or dropped",
      "Brands that want to reduce dependence on paid ads",
    ],
    problems: [
      { title: "Technical issues", body: "Slow pages, broken links, missing metadata and indexing problems." },
      { title: "Weak local presence", body: "Incomplete or inconsistent Google Business Profile and directory listings." },
      { title: "Thin content", body: "No pages that genuinely answer customer questions." },
    ],
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword and competitor research",
      "Google Business Profile optimisation",
      "On-page optimisation",
      "Content planning and writing",
      "Monthly ranking and traffic reporting",
    ],
    process: [
      { title: "Audit", body: "Technical, content and local search review." },
      { title: "Fix", body: "Resolve the issues holding rankings back." },
      { title: "Build", body: "Create and optimise pages for real search demand." },
      { title: "Local", body: "Strengthen Google Business Profile and citations." },
      { title: "Measure", body: "Track rankings, traffic and enquiries monthly." },
    ],
    faqs: [
      { q: "How long does SEO take?", a: "SEO is a long-term channel. Technical fixes can help quickly, but meaningful ranking growth usually takes several months." },
      { q: "Do you guarantee first-page rankings?", a: "No. Nobody can honestly guarantee rankings. We guarantee the work, transparency and reporting." },
    ],
    related: ["website-design-development", "google-ads", "social-media-marketing"],
    seo: {
      title: "SEO Agency in Guwahati — Local & Technical SEO",
      description:
        "Technical SEO, Google Business Profile optimisation and content for businesses in Guwahati and Assam. Honest, measurable search growth.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your SEO service and would like to discuss improving my search visibility.",
  },
  {
    slug: "influencer-marketing",
    index: "08",
    name: "Influencer & Campaigns",
    short: "Influencer",
    featured: true,
    headline: "Borrow trust. Build reach.",
    summary: "Creator partnerships and integrated campaigns that put your brand in the right feeds.",
    intro:
      "The right creator can introduce your brand to an audience that already trusts them. We find creators who fit, brief them properly and connect their content to measurable campaign goals.",
    whoFor: [
      "Consumer brands launching products or locations",
      "Hospitality, food and lifestyle businesses",
      "Brands that want regional reach across the North East",
    ],
    problems: [
      { title: "Wrong creators", body: "Big follower counts with the wrong audience." },
      { title: "Weak briefs", body: "Content that doesn’t communicate the offer." },
      { title: "No measurement", body: "No codes, links or tracking to see what worked." },
    ],
    deliverables: [
      "Campaign strategy",
      "Creator research and shortlisting",
      "Outreach, negotiation and contracts",
      "Creative briefs and content approvals",
      "Whitelisting and paid amplification",
      "Campaign reporting",
    ],
    process: [
      { title: "Plan", body: "Goals, audience and budget." },
      { title: "Match", body: "Shortlist creators by audience fit, not just size." },
      { title: "Brief", body: "Clear messaging with creative freedom." },
      { title: "Launch", body: "Coordinated posting and amplification." },
      { title: "Report", body: "Reach, engagement and attributed results." },
    ],
    faqs: [
      { q: "Do you work with regional creators?", a: "Yes. We work with creators across Assam and the North East as well as national creators." },
      { q: "How do you measure influencer campaigns?", a: "With tracked links, discount codes, UTM parameters and platform insights shared by creators." },
    ],
    related: ["social-media-marketing", "video-production", "performance-marketing"],
    seo: {
      title: "Influencer Marketing Agency in Guwahati & North East India",
      description:
        "Influencer and creator campaigns across Assam and North East India. Creator matching, briefs, contracts, amplification and reporting.",
    },
    whatsapp: "Hi InsideEdge, I was looking at your Influencer Marketing service and would like to discuss a campaign.",
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServices(slugs: string[]) {
  return slugs.map(getService).filter((s): s is Service => Boolean(s));
}
