"use client";

interface Props {
    onKey: (key: string) => void;
}

const ROWS = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [".", "0", "backspace"],
];

export default function Keypad({ onKey }: Props) {
    return (
        <div className="keypad">
            {ROWS.map((row, ri) => (
                <div key={ri} className="keypad-row">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => onKey(key)}
                            className={`keypad-btn${key === "backspace" ? " keypad-btn--back" : ""}`}
                            aria-label={key === "backspace" ? "Delete" : key}
                        >
                            {key === "backspace" ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="w-6 h-6 mx-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6H8L3 12l5 6h9a2 2 0 002-2V8a2 2 0 00-2-2z"
                                    />
                                    <line x1="15" y1="9" x2="19" y2="15" />
                                    <line x1="19" y1="9" x2="15" y2="15" />
                                </svg>
                            ) : (
                                key
                            )}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}
