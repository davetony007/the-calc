/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://the-calc-gamma.vercel.app",
    generateRobotsTxt: true,
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" },
        ],
        additionalSitemaps: [],
    },
    transform: async (config, path) => {
        // Boost priority for key pages
        const highPriority = ["/", "/vat-calculator", "/pay-rise-calculator", "/30-percent-off", "/50-percent-off", "/20-percent-off", "/25-percent-off", "/10-percent-off"];
        const medPriority = ["/sales-discount-calculator", "/add-20-percent", "/add-10-percent"];

        let priority = 0.6;
        if (highPriority.includes(path)) priority = 1.0;
        else if (medPriority.includes(path)) priority = 0.8;
        else if (path.includes("percent-off")) priority = 0.7;

        return {
            loc: path,
            changefreq: path === "/" ? "daily" : "weekly",
            priority,
            lastmod: new Date().toISOString(),
        };
    },
};
