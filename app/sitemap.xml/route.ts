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

function getPriority(path: string): number {
    if (HIGH_PRIORITY.has(path)) return 1.0;
    if (MED_PRIORITY.has(path)) return 0.8;
    return 0.7;
}

function buildUrl(loc: string, changefreq: string, priority: number): string {
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export async function GET() {
    const urls: string[] = [];

    // Homepage
    urls.push(buildUrl(SITE_URL, "daily", 1.0));

    // All slug pages
    for (const page of allPages) {
        const path = `/${page.slug}`;
        urls.push(buildUrl(`${SITE_URL}${path}`, "weekly", getPriority(path)));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        },
    });
}
