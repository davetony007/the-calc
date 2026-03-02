import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { homeConfig } from "@/lib/pages";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: homeConfig.metaTitle,
    template: "%s | PercentCalc",
  },
  description: homeConfig.metaDescription,
  metadataBase: new URL("https://percentcalc.co.uk"),
  openGraph: {
    siteName: "PercentCalc",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <header className="site-header">
          <a href="/" className="site-logo">
            <span className="logo-symbol">%</span>
            <span className="logo-name">PercentCalc</span>
          </a>
          <nav className="header-nav">
            <a href="/vat-calculator">VAT</a>
            <a href="/pay-rise-calculator">Pay Rise</a>
            <a href="/30-percent-off">30% Off</a>
          </nav>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} PercentCalc · Free percentage calculator</p>
          <nav className="footer-nav">
            <a href="/vat-calculator">VAT Calculator</a>
            <a href="/pay-rise-calculator">Pay Rise</a>
            <a href="/sales-discount-calculator">Discount</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
