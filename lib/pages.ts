export type PageMode = "add" | "subtract";

export interface PageConfig {
    slug: string;
    percent: number;
    mode: PageMode;
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    faqItems: { q: string; a: string }[];
}

// ─── Named presets ─────────────────────────────────────────────────────────

const namedPresets: PageConfig[] = [
    {
        slug: "vat-calculator",
        percent: 20,
        mode: "add",
        title: "VAT Calculator",
        metaTitle: "VAT Calculator – Add or Remove 20% UK VAT Instantly",
        metaDescription:
            "Quickly calculate 20% UK VAT on any price. Add VAT to find the gross price or remove VAT to find the net price.",
        h1: "UK VAT Calculator — Add or Remove 20%",
        intro:
            "Use this calculator to add 20% VAT to a net price, or to remove 20% VAT from a gross price. Enter any amount and see the VAT amount and final total instantly.",
        faqItems: [
            {
                q: "What is the current UK VAT rate?",
                a: "The standard UK VAT rate is 20%. Some goods have a reduced rate of 5% or are zero-rated.",
            },
            {
                q: "How do I add 20% VAT to a price?",
                a: "Multiply the net price by 1.20. For example, £100 + 20% VAT = £120.",
            },
            {
                q: "How do I remove 20% VAT from a gross price?",
                a: "Divide the gross price by 1.20. For example, £120 ÷ 1.20 = £100 net.",
            },
            {
                q: "Can I use this for invoicing?",
                a: "Yes — enter your net price, switch to Add mode, and the displayed total is your VAT-inclusive invoice amount.",
            },
        ],
    },
    {
        slug: "pay-rise-calculator",
        percent: 5,
        mode: "add",
        title: "Pay Rise Calculator",
        metaTitle: "Pay Rise Calculator – Calculate Your New Salary After a Raise",
        metaDescription:
            "Enter your current salary and percentage pay rise to see your new salary and the exact increase amount.",
        h1: "Pay Rise Calculator — See Your New Salary",
        intro:
            "Enter your current salary and the pay rise percentage to instantly see how much extra you'll earn and what your new salary will be.",
        faqItems: [
            {
                q: "How do I calculate a 5% pay rise?",
                a: "Multiply your salary by 0.05 to get the rise amount, then add it to your salary. For example: £30,000 × 0.05 = £1,500 rise → new salary £31,500.",
            },
            {
                q: "Is a 3% pay rise good?",
                a: "3% is often used as a cost-of-living adjustment. Whether it's 'good' depends on the inflation rate at the time.",
            },
            {
                q: "Can I use this for hourly rates?",
                a: "Yes — enter your hourly rate, set the rise percentage, and the calculator shows your new hourly rate.",
            },
        ],
    },
    {
        slug: "sales-discount-calculator",
        percent: 10,
        mode: "subtract",
        title: "Sales Discount Calculator",
        metaTitle: "Sales Discount Calculator – Find the Discounted Price Instantly",
        metaDescription:
            "Enter any price and discount percentage to instantly see the sale price and how much you save.",
        h1: "Sales Discount Calculator — Find the Sale Price",
        intro:
            "Working out a sale price is simple. Enter the original price, choose your discount percentage, and instantly see how much you save and the final price.",
        faqItems: [
            {
                q: "How do I calculate a discount?",
                a: "Multiply the original price by the discount percentage, then subtract. For example: £80 × 10% = £8 off → sale price £72.",
            },
            {
                q: "What is a good discount percentage for a sale?",
                a: "Retail sales commonly use 10–30%. Flash sales often go to 50%. Anything over 70% is typically a clearance.",
            },
            {
                q: "How do I find the original price from a sale price?",
                a: "Divide the sale price by (1 − discount%). For example, if something costs £72 after a 10% discount: £72 ÷ 0.90 = £80.",
            },
        ],
    },
];

// ─── Programmatic percent-off pages (1–99) ─────────────────────────────────

function makePercentOffPage(n: number): PageConfig {
    const examples = generateExamples(n, "subtract");
    return {
        slug: `${n}-percent-off`,
        percent: n,
        mode: "subtract",
        title: `${n}% Off Calculator`,
        metaTitle: `${n}% Off Calculator – What is ${n}% Off a Price?`,
        metaDescription: `Quickly work out ${n}% off any price. Enter the original price to see the discount amount and the final sale price.`,
        h1: `${n}% Off Calculator`,
        intro: `Use this calculator to find out how much ${n}% off saves you on any price. Enter the original price and instantly see the amount you save and the final price you pay.`,
        faqItems: [
            {
                q: `How do I calculate ${n}% off?`,
                a: `Multiply the price by ${n / 100}. That's your discount. Subtract it from the original price to get the sale price. ${examples[0] ?? ""}`,
            },
            {
                q: `What is ${n}% off £100?`,
                a: `${n}% off £100 is £${100 - n}. You save £${n}.`,
            },
            {
                q: `What is ${n}% off £50?`,
                a: `${n}% off £50 is £${(50 * (1 - n / 100)).toFixed(2)}. You save £${(50 * (n / 100)).toFixed(2)}.`,
            },
        ],
    };
}

function makePercentIncreaseP(n: number): PageConfig {
    const examples = generateExamples(n, "add");
    return {
        slug: `add-${n}-percent`,
        percent: n,
        mode: "add",
        title: `Add ${n}% Calculator`,
        metaTitle: `Add ${n}% Calculator – Increase Any Number by ${n}%`,
        metaDescription: `Instantly add ${n}% to any price or number. Useful for VAT, markups, pay rises, and more.`,
        h1: `Add ${n}% Calculator`,
        intro: `Need to increase something by ${n}%? Enter the original value and this calculator will show you how much is added and the new total.`,
        faqItems: [
            {
                q: `How do I add ${n}% to a number?`,
                a: `Multiply the number by ${n / 100} to find the increase, then add it. ${examples[0] ?? ""}`,
            },
            {
                q: `What is ${n}% of £100?`,
                a: `${n}% of £100 is £${n}.`,
            },
            {
                q: `What is £100 plus ${n}%?`,
                a: `£100 + ${n}% = £${100 + n}.`,
            },
        ],
    };
}

function generateExamples(n: number, _mode: PageMode): string[] {
    const prices = [50, 100, 200];
    return prices.map((p) => {
        const amount = Math.round(p * (n / 100) * 100) / 100;
        return `For example, on £${p}: ${_mode === "subtract" ? `£${p} - £${amount} = £${p - amount}` : `£${p} + £${amount} = £${p + amount}`}.`;
    });
}

// ─── All pages ──────────────────────────────────────────────────────────────

const percentOffPages: PageConfig[] = Array.from({ length: 99 }, (_, i) =>
    makePercentOffPage(i + 1)
);

// A subset of add-X-percent pages for common values
const addPercentPages: PageConfig[] = [5, 10, 15, 20, 25, 30, 50].map(
    makePercentIncreaseP
);

export const allPages: PageConfig[] = [
    ...namedPresets,
    ...percentOffPages,
    ...addPercentPages,
];

export function getPageBySlug(slug: string): PageConfig | undefined {
    return allPages.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return allPages.map((p) => p.slug);
}

// Home page config (not a slug page)
export const homeConfig = {
    metaTitle: "Percentage Calculator — Fast, Free & Mobile-Friendly",
    metaDescription:
        "Instantly add or subtract any percentage from any number. Useful for discounts, VAT, pay rises, tips and more. Free percentage calculator.",
};
