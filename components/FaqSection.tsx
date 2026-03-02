"use client";

import { useState } from "react";
import { PageConfig } from "@/lib/pages";

interface Props {
    config: PageConfig;
}

export default function FaqSection({ config }: Props) {
    const [open, setOpen] = useState<number | null>(null);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: config.faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    return (
        <section className="faq-section" aria-labelledby="faq-heading">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h2 id="faq-heading" className="faq-heading">Frequently Asked Questions</h2>
            <div className="faq-list">
                {config.faqItems.map((item, i) => (
                    <div key={i} className="faq-item">
                        <button
                            className="faq-question"
                            onClick={() => setOpen(open === i ? null : i)}
                            aria-expanded={open === i}
                        >
                            <span>{item.q}</span>
                            <span className={`faq-chevron${open === i ? " faq-chevron--open" : ""}`}>
                                ▾
                            </span>
                        </button>
                        {open === i && (
                            <div className="faq-answer">
                                <p>{item.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
