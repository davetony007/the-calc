"use client";

type Mode = "add" | "subtract";

interface Props {
    mode: Mode;
    onToggle: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onToggle }: Props) {
    return (
        <div className="mode-toggle" role="group" aria-label="Calculation mode">
            <button
                onClick={() => onToggle("subtract")}
                className={`mode-btn${mode === "subtract" ? " mode-btn--active" : ""}`}
                aria-pressed={mode === "subtract"}
            >
                − Take off
            </button>
            <button
                onClick={() => onToggle("add")}
                className={`mode-btn${mode === "add" ? " mode-btn--active" : ""}`}
                aria-pressed={mode === "add"}
            >
                + Add on
            </button>
        </div>
    );
}
