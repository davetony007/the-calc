import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { homeConfig } from "@/lib/pages";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://the-calc-gamma.vercel.app";
const SITE_NAME = "PercentCalc";

export const metadata: Metadata = {
  title: {
    default: homeConfig.metaTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: homeConfig.metaDescription,
  metadataBase: new URL("https://the-calc-gamma.vercel.app"),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    site: "@percentcalc",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "e22Me2xmW74B2UEGaXRO-y9IzQy0t3NA8Dcd2Ub7DTw",
  },
};

// Sitewide structured data
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: homeConfig.metaDescription,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <header className="site-header">
          <a href="/" className="site-logo">
            <span className="logo-symbol">%</span>
            <span className="logo-name">PercentCalc</span>
          </a>
          <nav className="header-nav" aria-label="Main navigation">
            <a href="/vat-calculator">VAT</a>
            <a href="/pay-rise-calculator">Pay Rise</a>
            <a href="/sales-discount-calculator">Discount</a>
            <a href="/30-percent-off">30% Off</a>
            <a href="/50-percent-off">50% Off</a>
          </nav>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} PercentCalc · Free percentage calculator</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/vat-calculator">VAT Calculator</a>
            <a href="/pay-rise-calculator">Pay Rise Calculator</a>
            <a href="/sales-discount-calculator">Discount Calculator</a>
            <a href="/20-percent-off">20% Off</a>
            <a href="/25-percent-off">25% Off</a>
            <a href="/50-percent-off">50% Off</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
