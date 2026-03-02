"use client";

type Mode = "add" | "subtract";

interface Preset {
    label: string;
    percent: number;
    mode: Mode;
    emoji: string;
}

const PRESETS: Preset[] = [
    { label: "Sale", percent: 10, mode: "subtract", emoji: "🏷️" },
    { label: "VAT", percent: 20, mode: "add", emoji: "🧾" },
    { label: "Pay Rise", percent: 5, mode: "add", emoji: "📈" },
    { label: "Tip", percent: 15, mode: "add", emoji: "💰" },
];

interface Props {
    onSelect: (percent: number, mode: Mode) => void;
}

export default function QuickPresets({ onSelect }: Props) {
    return (
        <div className="presets">
            <p className="presets-label">Quick presets</p>
            <div className="presets-row">
                {PRESETS.map((p) => (
                    <button
                        key={p.label}
                        onClick={() => onSelect(p.percent, p.mode)}
                        className="preset-btn"
                    >
                        <span className="preset-emoji">{p.emoji}</span>
                        <span>{p.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
