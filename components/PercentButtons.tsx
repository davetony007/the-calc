"use client";

import { useState } from "react";

const QUICK = [5, 10, 15, 20, 25];

interface Props {
    selected: number;
    onSelect: (percent: number) => void;
}

export default function PercentButtons({ selected, onSelect }: Props) {
    const [custom, setCustom] = useState("");
    const [showCustom, setShowCustom] = useState(false);

    function handleCustomSubmit() {
        const v = parseFloat(custom);
        if (!isNaN(v) && v > 0 && v <= 100) {
            onSelect(v);
            setShowCustom(false);
            setCustom("");
        }
    }

    return (
        <div className="percent-buttons">
            {QUICK.map((p) => (
                <button
                    key={p}
                    onClick={() => onSelect(p)}
                    className={`percent-btn${selected === p ? " percent-btn--active" : ""}`}
                    aria-pressed={selected === p}
                >
                    {p}%
                </button>
            ))}

            {showCustom ? (
                <div className="percent-custom-row">
                    <input
                        type="number"
                        min={0.01}
                        max={100}
                        step={0.01}
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
                        placeholder="%"
                        className="percent-custom-input"
                        autoFocus
                    />
                    <button onClick={handleCustomSubmit} className="percent-btn percent-btn--active">
                        OK
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowCustom(true)}
                    className={`percent-btn${!QUICK.includes(selected) ? " percent-btn--active" : ""}`}
                >
                    {!QUICK.includes(selected) ? `${selected}%` : "Other"}
                </button>
            )}
        </div>
    );
}
