import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const isProductionSite =
  (process.env.NEXT_PUBLIC_SITE_ENV ?? (process.env.VERCEL_ENV ? process.env.VERCEL_ENV : "production")) === "production";

/**
 * Content Security Policy. Inline scripts are required for Google Tag Manager,
 * Consent Mode and the Meta Pixel snippet, so 'unsafe-inline' is allowed for
 * scripts; everything else is restricted to known hosts. If GTM is used to add
 * other vendors, add their hosts here.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.clarity.ms https://*.clarity.ms https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net https://*.clarity.ms https://c.bing.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com https://www.googletagmanager.com https://cal.com https://calendly.com https://www.google.com",
  "media-src 'self' blob: https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(isProductionSite ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/(clients|brand)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host: apex → www (only takes effect when the apex points at this deployment).
      {
        source: "/:path*",
        has: [{ type: "host", value: "insideedge.in.net" }],
        destination: "https://www.insideedge.in.net/:path*",
        permanent: true,
      },
      // Legacy domain → primary domain, path-preserving (see docs/DOMAIN_MIGRATION.md).
      {
        source: "/blog/:slug",
        has: [{ type: "host", value: "(www\\.)?insideedge\\.info" }],
        destination: "https://www.insideedge.in.net/insights/:slug",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?insideedge\\.info" }],
        destination: "https://www.insideedge.in.net/:path*",
        permanent: true,
      },
      // Legacy paths on this domain.
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:slug", destination: "/work/:slug", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/audit", destination: "/free-audit", permanent: true },
      { source: "/pricing", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
