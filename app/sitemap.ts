import { MetadataRoute } from "next";
import { allPages } from "@/lib/pages";

const SITE_URL = "https://the-calc-gamma.vercel.app";

const HIGH_PRIORITY = new Set([
    "/",
    "/vat-calculator",
    "/pay-rise-calculator",
    "/30-percent-off",
    "/50-percent-off",
    "/20-percent-off",
    "/25-percent-off",
    "/10-percent-off",
]);

const MED_PRIORITY = new Set([
    "/sales-discount-calculator",
    "/add-20-percent",
    "/add-10-percent",
]);

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const home: MetadataRoute.Sitemap[number] = {
        url: SITE_URL,
        lastModified: now,
        changeFrequency: "daily",
        priority: 1.0,
    };

    const slugPages: MetadataRoute.Sitemap = allPages.map((page) => {
        const path = `/${page.slug}`;
        const priority = HIGH_PRIORITY.has(path)
            ? 1.0
            : MED_PRIORITY.has(path)
                ? 0.8
                : 0.7;

        return {
            url: `${SITE_URL}${path}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority,
        };
    });

    return [home, ...slugPages];
}
