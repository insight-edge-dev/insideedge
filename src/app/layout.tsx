import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { isProduction, siteConfig } from "@/config/site";
import { Analytics } from "@/components/analytics/Analytics";
import { CONSENT_HIDE_SCRIPT } from "@/config/analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollEdge } from "@/components/motion/ScrollEdge";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "InsideEdge — Creative & Performance Marketing Agency in Guwahati",
    template: "%s | InsideEdge",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image" },
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_HIDE_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-(--z-skip) -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <ScrollEdge />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <StickyWhatsApp />
        </MotionProvider>
        <Analytics />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
