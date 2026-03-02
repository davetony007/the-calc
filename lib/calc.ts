/** Round to 2 decimal places (avoids floating-point drift in money values) */
export function round(value: number): number {
    return Math.round(value * 100) / 100;
}

/** The raw percentage amount of a base value */
export function percentValue(base: number, percent: number): number {
    return round(base * (percent / 100));
}

/** Add or subtract a percentage from a base */
export function applyPercent(
    base: number,
    percent: number,
    mode: "add" | "subtract"
): number {
    const change = percentValue(base, percent);
    return mode === "add" ? round(base + change) : round(base - change);
}

/**
 * Extract the original base from a value that already has a percentage applied.
 * e.g. extractPercent(120, 20, "add") → 100 (reverse VAT)
 */
export function extractPercent(
    final: number,
    percent: number,
    mode: "add" | "subtract"
): number {
    if (mode === "add") {
        return round(final / (1 + percent / 100));
    }
    return round(final / (1 - percent / 100));
}

export interface CalcResult {
    base: number;
    percentAmount: number;
    final: number;
}

export function calculate(
    base: number,
    percent: number,
    mode: "add" | "subtract"
): CalcResult {
    const percentAmount = percentValue(base, percent);
    const final = applyPercent(base, percent, mode);
    return { base, percentAmount, final };
}
