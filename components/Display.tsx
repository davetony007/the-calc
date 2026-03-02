"use client";

import { CalcResult } from "@/lib/calc";

interface Props {
    input: string;
    result: CalcResult;
    percent: number;
    mode: "add" | "subtract";
    onClear: () => void;
}

function fmt(n: number): string {
    return n.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export default function Display({ input, result, percent, mode, onClear }: Props) {
    const sign = mode === "add" ? "+" : "−";
    const label = mode === "add" ? "Total" : "Sale price";

    return (
        <div className="display-card">
            {/* Input row */}
            <div className="display-input-row">
                <span className="display-currency">£</span>
                <span className="display-input">{input}</span>
                <button onClick={onClear} className="display-clear" aria-label="Clear">
                    C
                </button>
            </div>

            {/* Results */}
            <div className="display-results">
                <div className="display-result-row">
                    <span className="display-label">{sign} {percent}%</span>
                    <span className="display-amount">
                        {sign === "+" ? "" : "−"}£{fmt(result.percentAmount)}
                    </span>
                </div>
                <div className="display-result-row display-final">
                    <span className="display-label">{label}</span>
                    <span className="display-final-value">£{fmt(result.final)}</span>
                </div>
            </div>
        </div>
    );
}
