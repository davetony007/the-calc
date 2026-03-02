import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import FaqSection from "@/components/FaqSection";
import { allPages, getPageBySlug } from "@/lib/pages";

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
    };
}

export default async function SlugPage({ params }: Props) {
    const { slug } = await params;
    const config = getPageBySlug(slug);
    if (!config) notFound();

    return (
        <div className="page-layout">
            <section className="hero">
                <h1 className="hero-title">{config.h1}</h1>
                <p className="hero-subtitle">{config.intro}</p>
            </section>

            <Calculator
                initialPercent={config.percent}
                initialMode={config.mode}
            />

            <AdSlot id="after-calculator" label="Advertisement" />

            <section className="seo-content">
                <h2>About this calculator</h2>
                <p>{config.intro}</p>
                <h3>Example calculations</h3>
                <ul>
                    {[50, 100, 200, 500].map((price) => {
                        const change = Math.round(price * (config.percent / 100) * 100) / 100;
                        const result =
                            config.mode === "subtract"
                                ? Math.round((price - change) * 100) / 100
                                : Math.round((price + change) * 100) / 100;
                        const verb = config.mode === "subtract" ? "off" : "on top";
                        return (
                            <li key={price}>
                                {config.percent}% {verb} £{price.toFixed(2)} = <strong>£{result.toFixed(2)}</strong>{" "}
                                (saving / adding £{change.toFixed(2)})
                            </li>
                        );
                    })}
                </ul>
            </section>

            <AdSlot id="after-content" label="Advertisement" />

            <FaqSection config={config} />
        </div>
    );
}
