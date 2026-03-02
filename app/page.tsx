import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import { homeConfig } from "@/lib/pages";

export const metadata: Metadata = {
  title: homeConfig.metaTitle,
  description: homeConfig.metaDescription,
};

export default function HomePage() {
  return (
    <div className="page-layout">
      <section className="hero">
        <h1 className="hero-title">Percentage Calculator</h1>
        <p className="hero-subtitle">
          Add or subtract any percentage from any number — instantly.
        </p>
      </section>

      <Calculator initialPercent={10} initialMode="subtract" />

      <AdSlot id="after-calculator" label="Advertisement" />

      <section className="seo-content">
        <h2>How to use the percentage calculator</h2>
        <p>
          Enter any amount using the keypad, choose a percentage using the quick
          buttons or type a custom value, then toggle whether you want to{" "}
          <strong>add</strong> or <strong>take off</strong> that percentage.
          Results update instantly — no equals button needed.
        </p>
        <h3>Common uses</h3>
        <ul>
          <li>
            <strong>Shopping discounts</strong> — enter the original price and
            subtract the sale percentage to see what you pay.
          </li>
          <li>
            <strong>VAT</strong> — add 20% to a net price to get the
            VAT-inclusive total, or remove 20% from a gross price to find the
            net.
          </li>
          <li>
            <strong>Pay rises</strong> — enter your salary and add your raise
            percentage to see your new salary and how much extra you earn.
          </li>
          <li>
            <strong>Tips &amp; service charges</strong> — add 10–15% to a bill
            to calculate a tip.
          </li>
          <li>
            <strong>Markups</strong> — add a percentage to a cost price to set
            a retail price.
          </li>
        </ul>
        <h3>The formula</h3>
        <p>
          Percentage calculators use one simple formula:{" "}
          <em>Result = Base × (1 ± Percent ÷ 100)</em>. For example, 20% off
          £80 is £80 × 0.80 = £64. This calculator handles all the maths for
          you.
        </p>
      </section>

      <AdSlot id="after-content" label="Advertisement" />
    </div>
  );
}
