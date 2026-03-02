import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import FaqSection from "@/components/FaqSection";
import { allPages, getPageBySlug } from "@/lib/pages";

const SITE_URL = "https://the-calc-gamma.vercel.app";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return allPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const config = getPageBySlug(slug);
    if (!config) return {};
    return {
        title: config.metaTitle,
        description: config.metaDescription,
        alternates: { canonical: `/${slug}` },
        openGraph: {
            title: config.metaTitle,
            description: config.metaDescription,
            url: `${SITE_URL}/${slug}`,
            type: "website",
        },
    };
}

// Common price points to show in the example table
const EXAMPLE_PRICES = [10, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 500];

export default async function SlugPage({ params }: Props) {
    const { slug } = await params;
    const config = getPageBySlug(slug);
    if (!config) notFound();

    const related = (config.relatedSlugs ?? [])
        .map((s) => allPages.find((p) => p.slug === s))
        .filter(Boolean) as typeof allPages;

    // BreadcrumbList schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: config.title,
                item: `${SITE_URL}/${slug}`,
            },
        ],
    };

    // HowTo schema for instructional pages
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: config.h1,
        description: config.intro,
        step: [
            {
                "@type": "HowToStep",
                name: "Enter the original amount",
                text: "Tap in the original price or number using the keypad.",
            },
            {
                "@type": "HowToStep",
                name: "Select the percentage",
                text: `Choose ${config.percent}% using the quick buttons, or type a custom percentage.`,
            },
            {
                "@type": "HowToStep",
                name: "Read the result",
                text: `The calculator instantly shows the ${config.mode === "subtract" ? "discounted price and saving" : "new total and the amount added"}.`,
            },
        ],
    };

    return (
        <div className="page-layout">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            {/* Breadcrumb */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span aria-hidden="true"> › </span>
                <span>{config.title}</span>
            </nav>

            <section className="hero">
                <h1 className="hero-title">{config.h1}</h1>
                <p className="hero-subtitle">{config.intro}</p>
            </section>

            <Calculator initialPercent={config.percent} initialMode={config.mode} />

            <AdSlot id="after-calculator" label="Advertisement" />

            {/* SEO content block */}
            <section className="seo-content">
                <h2>
                    {config.mode === "subtract"
                        ? `${config.percent}% Off — Example Prices`
                        : `Add ${config.percent}% — Example Results`}
                </h2>
                <p>
                    Use the table below as a quick reference. Enter any amount into the
                    calculator above for an exact result.
                </p>

                {/* Example table — inline keyword-rich data */}
                <div className="example-table-wrap">
                    <table className="example-table">
                        <thead>
                            <tr>
                                <th>Original price</th>
                                <th>{config.mode === "subtract" ? "You save" : "Amount added"}</th>
                                <th>{config.mode === "subtract" ? "Sale price" : "New total"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EXAMPLE_PRICES.map((price) => {
                                const change = Math.round(price * (config.percent / 100) * 100) / 100;
                                const result =
                                    config.mode === "subtract"
                                        ? Math.round((price - change) * 100) / 100
                                        : Math.round((price + change) * 100) / 100;
                                return (
                                    <tr key={price}>
                                        <td>£{price.toFixed(2)}</td>
                                        <td>£{change.toFixed(2)}</td>
                                        <td><strong>£{result.toFixed(2)}</strong></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <h3>How to calculate {config.percent}%{config.mode === "subtract" ? " off" : " increase"}</h3>
                <p>
                    {config.mode === "subtract" ? (
                        <>
                            To calculate {config.percent}% off a price, multiply the original
                            amount by <strong>{(config.percent / 100).toFixed(2)}</strong> — that
                            gives you the discount. Subtract it from the original to get the
                            final price. Or equivalently, multiply the original price by{" "}
                            <strong>{(1 - config.percent / 100).toFixed(2)}</strong> directly.
                        </>
                    ) : (
                        <>
                            To add {config.percent}% to a number, multiply it by{" "}
                            <strong>{(config.percent / 100).toFixed(2)}</strong> — that gives
                            you the amount to add. Then add it to the original. Or multiply
                            directly by <strong>{(1 + config.percent / 100).toFixed(2)}</strong>.
                        </>
                    )}
                </p>

                <h3>Formula</h3>
                <p>
                    {config.mode === "subtract"
                        ? `Final price = Original × (1 − ${config.percent} ÷ 100) = Original × ${(1 - config.percent / 100).toFixed(2)}`
                        : `New total = Original × (1 + ${config.percent} ÷ 100) = Original × ${(1 + config.percent / 100).toFixed(2)}`}
                </p>
            </section>

            <AdSlot id="after-content" label="Advertisement" />

            <FaqSection config={config} />

            {/* Related calculators — internal linking cluster */}
            {related.length > 0 && (
                <section className="related-section">
                    <h2 className="related-heading">Related Calculators</h2>
                    <div className="related-grid">
                        {related.map((r) => (
                            <a key={r.slug} href={`/${r.slug}`} className="related-card">
                                <span className="related-percent">
                                    {r.mode === "subtract" ? "−" : "+"}
                                    {r.percent}%
                                </span>
                                <span className="related-title">{r.title}</span>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
