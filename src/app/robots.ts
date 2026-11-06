import type { MetadataRoute } from "next";
import { isProduction } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

/** Production: index marketing pages. Preview/staging: block everything. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
